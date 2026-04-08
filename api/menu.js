import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const filePath = path.join(process.cwd(), 'data', 'menu.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
