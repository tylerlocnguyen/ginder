
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

export const Auth = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth,email,password);
        } catch(err){
            console.error(err);
        }
        
    };

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        } catch(err){
            console.error(err);
        }
        
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Email: " + email);
        console.log("Password: " + password);
    }
    

    const logOut = async () => {
        try{
            await signOut(auth);
        } catch(err){
            console.error(err);
        }
        
    };

    return (
        <div>
            <input 
            placeholder="Email..."
             onChange={(e) => setEmail(e.target.value)}
             />

            <input 
            placeholder="Password..."
            type="password"
             onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}> Sign In</button>

            <button onClick={signInWithGoogle}>Sign in With Gogole</button>

            <button onClick={logOut}>Log Out</button>
        </div>
    )
}
