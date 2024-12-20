export const firebaseConfig = { 
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};
// Email configuration
export const actionCodeSettings = {
  url: 'https://b-ai.ru/program',
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.bai.app'
  },
  android: {
    packageName: 'com.bai.app',
    installApp: true,
    minimumVersion: '12'
  }
};