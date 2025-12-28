import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isVerified: boolean;
  trustScore: number;
  badges: string[];
  createdAt: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, profile: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = doc(db, 'users', firebaseUser.uid);
          // Try to get from cache first or server
          const snap = await getDoc(userDoc);
          
          if (snap.exists()) {
            setProfile(snap.data() as UserProfile);
          } else {
            const newProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || 'Thành viên mới',
              photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
              isVerified: false,
              trustScore: 100,
              badges: [],
              createdAt: serverTimestamp(),
            };
            
            // Non-blocking setDoc
            setDoc(userDoc, newProfile).catch(e => console.warn("Offline: Failed to sync new profile", e));
            setProfile(newProfile as UserProfile);
          }
        } catch (err: any) {
          console.error("AuthContext Profile Fetch Error:", err);
          // Fallback to basic info if Firestore fails (likely offline and not in cache)
          setProfile({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || 'Người dùng',
            photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
            isVerified: false,
            trustScore: 100,
            badges: [],
            createdAt: null,
          });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};