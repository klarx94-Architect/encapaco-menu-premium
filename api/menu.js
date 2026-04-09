// api/menu.js
// FETCH DE DATOS EN TIEMPO REAL DESDE GITHUB
// Esto asegura que si el administrador actualiza la carta, 
// el cambio sea visible INSTANTANEAMENTE al refrescar,
// sin esperar a que Vercel termine de reconstruir el despliegue.

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'klarx94-Architect';
  const REPO_NAME = process.env.GITHUB_REPO_NAME || 'encapaco-menu-premium';
  const FILE_PATH = 'data/menu.json';
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  // Usamos el API de contenidos de GitHub para obtener el archivo más reciente de la rama main
  // Añadimos un timestamp aleatorio para evitar cualquier cache intermedio del servidor
  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?t=${Date.now()}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3.raw', // Obtenemos el contenido RAW directamente
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Error en GitHub API: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Forzamos al navegador a no cachear esta respuesta de API
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.status(200).json(data);
  } catch (error) {
    console.error('Persistence Failure (api/menu):', error);
    res.status(500).json({ error: 'Error al sincronizar con la fuente de verdad en tiempo real.' });
  }
}
