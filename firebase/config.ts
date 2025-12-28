
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  getFirestore 
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyCtoKGpDmxMOZp8txTnJdLpntwAGpN52RM",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "chocuatui-db139.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "chocuatui-db139",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "chocuatui-db139.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "683193248404",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:683193248404:web:028803dbd96967635ae281",
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-P7YD6LSMCC"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
