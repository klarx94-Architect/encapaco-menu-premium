// api/upload.js
// Sube una imagen al repositorio de GitHub en /public/assets/menu/
// El GITHUB_TOKEN vive en variables de entorno de Vercel. Nunca se expone al cliente.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password, filename, base64 } = req.body;

  // 1. Autenticación del panel admin
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  // 2. Validaciones básicas
  if (!filename || !base64) {
    return res.status(400).json({ error: 'Faltan datos: filename o base64' });
  }

  // Sanitizar nombre de archivo: solo alfanumérico, guiones y extensión
  const safeName = filename
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, '-')
    .replace(/-+/g, '-');

  const filePath = `public/assets/menu/${safeName}`;

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'klarx94-Architect';
  const REPO_NAME = process.env.GITHUB_REPO_NAME || 'encapaco-menu-premium';
  const BRANCH = 'main';

  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;

  try {
    // 3. Verificar si el archivo ya existe (para obtener su SHA y sobreescribir)
    let existingSha = null;
    const checkRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });
    if (checkRes.ok) {
      const existing = await checkRes.json();
      existingSha = existing.sha;
    }

    // 4. Subir o actualizar el archivo
    const body = {
      message: `feat: actualización de imagen de menú — ${safeName}`,
      content: base64, // ya viene en base64 desde el cliente
      branch: BRANCH,
      ...(existingSha && { sha: existingSha }), // necesario para sobreescribir
    };

    const uploadRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.json();
      return res.status(500).json({ error: err.message || 'Error en GitHub API' });
    }

    // 5. Devolver URL raw de GitHub — disponible al instante sin esperar redeploy de Vercel
    const publicUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${filePath}`;
    return res.status(200).json({ url: publicUrl, committed: true });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
