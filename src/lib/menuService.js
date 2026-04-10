import { db, storage } from './firebase';
import {
  doc, getDoc, setDoc, onSnapshot
} from 'firebase/firestore';
import {
  ref, uploadBytes, getDownloadURL
} from 'firebase/storage';

const MENU_DOC = 'menu/carta';
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

// --- SUBIR IMAGEN A FIREBASE STORAGE ---
export async function uploadCoverImage(catId, file) {
  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `covers/${catId}-${Date.now()}.${ext}`;
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
