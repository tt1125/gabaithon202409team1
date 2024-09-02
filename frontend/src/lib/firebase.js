import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, FirebaseStorage, connectStorageEmulator } from 'firebase/storage'
import { getFunctions, Functions, connectFunctionsEmulator } from 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
}

let firebaseApp
let auth
let firestore
let storage
let functions

// サーバーサイドでレンダリングするときにエラーが起きないようにするための記述
if (typeof window !== 'undefined' && !getApps().length) {
  firebaseApp = initializeApp(firebaseConfig)
  auth = getAuth(firebaseApp)
  firestore = getFirestore(firebaseApp)
  storage = getStorage(firebaseApp)
  functions = getFunctions(firebaseApp, 'asia-northeast1')

  if (process.env.NEXT_PUBLIC_ENV == 'local') {
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectStorageEmulator(storage, 'localhost', 9199)
    connectFunctionsEmulator(functions, 'localhost', 5001)
    connectFirestoreEmulator(firestore, 'localhost', 8080)
  }
}

export { firebaseApp, auth, firestore, storage, functions }
