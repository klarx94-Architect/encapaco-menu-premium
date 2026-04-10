// api/menu.js
// LEE datos del menu: primero intenta GitHub API en tiempo real,
// si falla (token ausente/expirado), usa el archivo local data/menu.json como fallback.
import { readFileSync } from 'fs';
import { join } from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  // --- Intento 1: GitHub API en tiempo real ---
  if (GITHUB_TOKEN) {
    try {
      const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'klarx94-Architect';
      const REPO_NAME = process.env.GITHUB_REPO_NAME || 'encapaco-menu-premium';
      const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/menu.json?t=${Date.now()}`;

      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3.raw',
          'Cache-Control': 'no-cache'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
      }
    } catch (err) {
      console.warn('GitHub API falló, usando fallback local:', err.message);
    }
  }

  // --- Intento 2: Fallback al archivo local del bundle ---
  try {
    const filePath = join(process.cwd(), 'data', 'menu.json');
    const raw = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    console.log('api/menu: sirviendo desde fallback local (data/menu.json)');
    return res.status(200).json(data);
  } catch (fallbackErr) {
    console.error('Fallback local también falló:', fallbackErr.message);
    return res.status(500).json({ error: 'No se pudieron cargar los datos del menú.' });
  }
}
