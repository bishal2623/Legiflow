
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'legiflow-p4ure',
  appId: '1:846977878595:web:e4f57e8065910d072e62f6',
  storageBucket: 'legiflow-p4ure.firebasestorage.app',
  apiKey: 'AIzaSyAFK8XYbmIYiKyB5ylW4Tu4usDyxTxm08Y',
  authDomain: 'legiflow-p4ure.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '846977878595',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
