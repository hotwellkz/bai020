import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, runTransaction, setDoc, getDoc } from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';

// Initialize Firebase (prevent multiple initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Helper functions for tokens and lessons
export const deductTokens = async (userId: string, amount: number): Promise<boolean> => {
  const userRef = doc(db, 'profiles', userId);
  
  try {
    const result = await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) return false;
      
      const currentTokens = userDoc.data().tokens;
      if (currentTokens < amount) return false;
      
      transaction.update(userRef, { tokens: currentTokens - amount });
      return true;
    });
    
    return result;
  } catch (error) {
    console.error('Error deducting tokens:', error);
    return false;
  }
};

export const markLessonComplete = async (userId: string, lessonId: string): Promise<void> => {
  const lessonRef = doc(db, 'completed_lessons', `${userId}_${lessonId}`);
  
  await setDoc(lessonRef, {
    userId,
    lessonId,
    completedAt: new Date()
  });
};

export const getLessonStatus = async (userId: string, lessonId: string): Promise<boolean> => {
  const lessonRef = doc(db, 'completed_lessons', `${userId}_${lessonId}`);
  const docSnap = await getDoc(lessonRef);
  return docSnap.exists();
};