// api/menu.js
// Lee datos del menú desde el archivo local data/menu.json.
// Preparado para migración a Firebase — sin dependencia de GITHUB_TOKEN.
import { readFileSync } from 'fs';
import { join } from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');

  try {
    const filePath = join(process.cwd(), 'data', 'menu.json');
    const raw = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    return res.status(200).json(data);
  } catch (err) {
    console.error('Error leyendo data/menu.json:', err.message);
    return res.status(500).json({ error: 'No se pudieron cargar los datos del menú.' });
  }
}
