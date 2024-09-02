import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, FirebaseStorage, connectStorageEmulator } from 'firebase/storage'
import { getFunctions, Functions, connectFunctionsEmulator } from 'firebase/functions'

const firebaseConfig = {
  apiKey: "AIzaSyA5a_r85qhyK965ym36n6FYywde9itZKwI",
  authDomain: "gabaithon202409team1-8b6f5.firebaseapp.com",
  projectId: "gabaithon202409team1-8b6f5",
  storageBucket: "gabaithon202409team1-8b6f5.appspot.com",
  messagingSenderId: "935171870608",
  appId: "1:935171870608:web:49586c61539f27fea4ad15",
  measurementId: "G-6CPMP9S2X9"
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
