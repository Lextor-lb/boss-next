"use client"

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";

export default function Home() {


  
  const handleLogin = async () => {
    try {

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(true);  // Await the promise to get the ID token
      console.log("ID Token:", idToken);

    } catch (error) {
        console.error(error);
    }

};


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Home Page
      </div>

      <div>
            <button onClick={handleLogin}>Login with Google</button>
      </div>
    </main>
  );
}
