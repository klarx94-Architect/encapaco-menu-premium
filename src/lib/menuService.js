import { db } from './firebase';
import {
  doc, getDoc, setDoc, onSnapshot
} from 'firebase/firestore';

const ADMIN_PASSWORD = 'PacoDirector-2026-Sierra';

// --- AUTH ---
export function checkPassword(pw) {
  return pw === ADMIN_PASSWORD;
}

// --- LEER MENU (una vez) ---
export async function fetchMenu() {
  const snap = await getDoc(doc(db, 'menu', 'carta'));
  if (snap.exists()) {
    return snap.data();
  }
  return null;
}

// --- ESCUCHAR MENU EN TIEMPO REAL ---
export function subscribeMenu(callback) {
  return onSnapshot(doc(db, 'menu', 'carta'), (snap) => {
    if (snap.exists()) {
      callback(snap.data());
    }
  });
}

// --- GUARDAR MENU ---
export async function saveMenu(menuData) {
  await setDoc(doc(db, 'menu', 'carta'), menuData);
}

// --- SUBIR IMAGEN via /api/upload (GitHub repo → Vercel CDN) ---
export async function uploadCoverImage(catId, file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result.split(',')[1];
        const ext = file.name.split('.').pop().toLowerCase() || 'jpg';
        const filename = `${catId}-${Date.now()}.${ext}`;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            password: ADMIN_PASSWORD,
            filename,
            base64
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error subiendo imagen');
        resolve(data.url);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Error leyendo el archivo'));
    reader.readAsDataURL(file);
  });
}
