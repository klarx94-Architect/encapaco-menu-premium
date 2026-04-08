import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { password, data } = req.body;
  
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'menu.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
