import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface ContactMessage {
  name: string
  email: string
  message: string
}

export async function addContactMessage(data: ContactMessage): Promise<string> {
  try {
    const col = collection(db, 'contactMessages')
    const docRef = await addDoc(col, { ...data, createdAt: serverTimestamp() })
    return docRef.id
  } catch (err) {
    console.error('addContactMessage error:', err)
    throw err
  }
}
