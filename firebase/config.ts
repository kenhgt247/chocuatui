import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  getFirestore 
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Trong Vite, chúng ta nên sử dụng import.meta.env cho phía client
// Tuy nhiên để đảm bảo tính tương thích, ta giữ fallback là các giá trị string
// @google/genai Fix: Cast import.meta to any to resolve property 'env' does not exist error in TypeScript
const firebaseConfig = {
  apiKey: ((import.meta as any).env?.VITE_FIREBASE_API_KEY as string) || "AIzaSyCtoKGpDmxMOZp8txTnJdLpntwAGpN52RM",
  authDomain: ((import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN as string) || "chocuatui-db139.firebaseapp.com",
  projectId: ((import.meta as any).env?.VITE_FIREBASE_PROJECT_ID as string) || "chocuatui-db139",
  storageBucket: ((import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET as string) || "chocuatui-db139.firebasestorage.app",
  messagingSenderId: ((import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID as string) || "683193248404",
  appId: ((import.meta as any).env?.VITE_FIREBASE_APP_ID as string) || "1:683193248404:web:028803dbd96967635ae281",
  measurementId: ((import.meta as any).env?.VITE_FIREBASE_MEASUREMENT_ID as string) || "G-P7YD6LSMCC"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;