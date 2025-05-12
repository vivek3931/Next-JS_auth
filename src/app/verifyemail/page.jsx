'use client'
import axios from "axios"
import Link from "next/link"
import React, {useState , useEffect} from "react"

export default function VerifyEmailPage(){
    const [token , setToken]  = useState('');
    const [verified , setVerified] = useState(false);
    const [verifyerror , setVerifyError] = useState(false);

    useEffect(()=>{
      const urlToken = window.location.search.split('=')[1];
      setToken(urlToken);
    },[])

    useEffect(()=>{
      if(token.length > 0){
        verifyUserEmail()
      }
    },[token])


    const verifyUserEmail = async() =>{
        try {
            await axios.post('/api/users/verifyEmail', {token})
            setVerified(true);
        } catch (error) {
            setVerifyError(true);
            // console.log(error.message);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? token : 'no token'}</h2>
            <div className="p-8 bg-white rounded-lg shadow-md mt-4">
                {verified && (
                    <div className="text-center">
                        <h2 className="text-2xl text-green-500 mb-4">Email Verified Successfully!</h2>
                        <Link href="/login" 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Login Now
                        </Link>
                    </div>
                )}
                {verifyerror && (
                    <div className="text-center">
                        <h2 className="text-2xl text-red-500 mb-4">Error Verifying Email</h2>
                        <p className="text-gray-600">Please try again later or contact support.</p>
                    </div>
                )}
                {!verified && !verifyerror && (
                    <div className="text-center">
                        <h2 className="text-2xl text-gray-600 mb-4">Verifying your email...</h2>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    </div>
                )}
            </div>
        </div>
    )
}