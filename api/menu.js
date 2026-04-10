// api/menu.js
// Lee el menú desde Firestore (menu/carta) via REST API.
// Si Firestore falla o no está configurado, hace fallback a data/menu.json local.

import { readFileSync } from 'fs';
import { join } from 'path';

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'encapaco-menu';

function firestoreValueToJS(value) {
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.integerValue !== undefined) return Number(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.arrayValue !== undefined) {
    return (value.arrayValue.values || []).map(firestoreValueToJS);
  }
  if (value.mapValue !== undefined) {
    return firestoreDocToJS(value.mapValue.fields || {});
  }
  return null;
}

function firestoreDocToJS(fields) {
  const result = {};
  for (const [key, val] of Object.entries(fields)) {
    result[key] = firestoreValueToJS(val);
  }
  return result;
}

async function fetchFromFirestore() {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/menu/carta`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Firestore REST error: ${response.status}`);
  }
  const doc = await response.json();
  if (!doc.fields) throw new Error('Documento vacío en Firestore');
  return firestoreDocToJS(doc.fields);
}

function readLocalFallback() {
  const filePath = join(process.cwd(), 'data', 'menu.json');
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');

  try {
    const data = await fetchFromFirestore();
    return res.status(200).json(data);
  } catch (firestoreErr) {
    console.warn('Firestore no disponible, usando fallback local:', firestoreErr.message);
    try {
      const data = readLocalFallback();
      return res.status(200).json(data);
    } catch (localErr) {
      console.error('Error leyendo fallback local:', localErr.message);
      return res.status(500).json({ error: 'No se pudieron cargar los datos del menú.' });
    }
  }
}
