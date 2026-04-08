// api/menu-update.js
// Guarda el menu.json actualizado directamente en GitHub via API.
// El archivo data/menu.json en el repo se convierte en la fuente de verdad persistente.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password, data } = req.body;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  if (!data) return res.status(400).json({ error: 'Sin datos' });

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'klarx94-Architect';
  const REPO_NAME = process.env.GITHUB_REPO_NAME || 'encapaco-menu-premium';
  const BRANCH = 'main';
  const FILE_PATH = 'data/menu.json';

  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

  try {
    // 1. Obtener SHA actual del archivo (necesario para actualizarlo)
    const checkRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!checkRes.ok) {
      return res.status(500).json({ error: 'No se pudo leer menu.json del repositorio' });
    }

    const existing = await checkRes.json();
    const existingSha = existing.sha;

    // 2. Convertir el JSON a base64 para la API de GitHub
    const jsonString = JSON.stringify(data, null, 2);
    const base64Content = Buffer.from(jsonString, 'utf-8').toString('base64');

    // 3. Hacer el commit con los datos actualizados
    const updateRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'feat(admin): actualización de carta desde panel Paco',
        content: base64Content,
        sha: existingSha,
        branch: BRANCH,
      }),
    });

    if (!updateRes.ok) {
      const err = await updateRes.json();
      return res.status(500).json({ error: err.message || 'Error al guardar en GitHub' });
    }

    return res.status(200).json({ ok: true, committed: true });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
