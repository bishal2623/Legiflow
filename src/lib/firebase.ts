
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import type { FirebaseApp } from 'firebase/app'
import type { Analytics } from 'firebase/analytics'
import type { Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
}

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

let auth: Auth | undefined
let analytics: Analytics | undefined

if (typeof window !== 'undefined') {
  void import('firebase/auth').then(({ getAuth }) => {
    auth = getAuth(app)
  })

  void import('firebase/analytics')
    .then(({ getAnalytics }) => {
      analytics = getAnalytics(app)
    })
    .catch(() => {
      analytics = undefined
    })
}

export { app, db, auth, analytics }
