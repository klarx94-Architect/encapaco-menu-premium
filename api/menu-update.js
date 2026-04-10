// api/menu-update.js
// Guarda el menú actualizado directamente en Firestore (menu/carta) via REST API.
// Requiere FIREBASE_SERVICE_ACCOUNT_JSON como variable de entorno en Vercel.
// Mantiene compatibilidad: si no hay Service Account, devuelve error claro.

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'encapaco-menu';

function jsValueToFirestore(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') {
    return Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }
  if (typeof value === 'string') return { stringValue: value };
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(jsValueToFirestore) } };
  }
  if (typeof value === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(value)) {
      fields[k] = jsValueToFirestore(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(value) };
}

function jsToFirestoreDoc(data) {
  const fields = {};
  for (const [k, v] of Object.entries(data)) {
    fields[k] = jsValueToFirestore(v);
  }
  return { fields };
}

async function getAccessToken(serviceAccount) {
  // Construye un JWT firmado para autenticarse con Firestore
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    sub: serviceAccount.client_email,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/datastore',
  };

  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const signingInput = `${b64(header)}.${b64(payload)}`;

  // Importar clave privada con Web Crypto API (disponible en Node 18+ / Vercel)
  const pemKey = serviceAccount.private_key
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');

  const keyBuffer = Buffer.from(pemKey, 'base64');
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyBuffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    Buffer.from(signingInput)
  );

  const jwt = `${signingInput}.${Buffer.from(signature).toString('base64url')}`;

  // Intercambiar JWT por access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Error obteniendo access token: ${err}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password, data } = req.body;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  if (!data) return res.status(400).json({ error: 'Sin datos' });

  const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountRaw) {
    return res.status(500).json({
      error: 'FIREBASE_SERVICE_ACCOUNT_JSON no configurada en Vercel. Añádela en el dashboard de Vercel → Settings → Environment Variables.'
    });
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(serviceAccountRaw);
  } catch {
    return res.status(500).json({ error: 'FIREBASE_SERVICE_ACCOUNT_JSON tiene formato inválido. Debe ser JSON válido.' });
  }

  try {
    const accessToken = await getAccessToken(serviceAccount);

    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/menu/carta`;
    const firestoreDoc = jsToFirestoreDoc(data);

    const patchRes = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(firestoreDoc),
    });

    if (!patchRes.ok) {
      const err = await patchRes.text();
      throw new Error(`Firestore PATCH error: ${err}`);
    }

    return res.status(200).json({ ok: true, saved: 'firestore' });

  } catch (err) {
    console.error('Error guardando en Firestore:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
