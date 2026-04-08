import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

export const config = { api: { bodyParser: false } };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const form = formidable({ multiples: false });
  
  return new Promise((resolve) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return resolve();
      }
      
      const pwd = fields.password?.[0] || fields.password;
      if (pwd !== process.env.ADMIN_PASSWORD) {
        res.status(401).json({ error: 'No autorizado' });
        return resolve();
      }
      
      const file = files.image?.[0] || files.image;
      if (!file) {
        res.status(400).json({ error: 'Sin imagen' });
        return resolve();
      }
      
      try {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: 'encapaco',
          transformation: [{ width: 800, crop: 'limit', quality: 'auto' }]
        });
        res.status(200).json({ url: result.secure_url });
        resolve();
      } catch (error) {
        res.status(500).json({ error: error.message });
        resolve();
      }
    });
  });
}
