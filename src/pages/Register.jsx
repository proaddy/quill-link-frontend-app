import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
require('dotenv').config();
const backend = process.env.BACKEND;

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function registerUser(e) {
        e.preventDefault();
        try {
            setError(false);
            setLoading(true);
            
            const response = await axios.post(`${backend}/api/users/`, {"username":username, "name":fullname, "email":email, "password": passwd});
            if (response) {
                alert("User Created Successfully");
                navigate('/login');
            }
            setLoading(false);
            setUsername('');
            setFullname('');
            setEmail('');
            setPasswd('');
        } catch (error) {
            setLoading(false);
            setError(true);
            console.error("error", error);
        }
    }

    if (loading) {
        return (
            <div className="flex h-svh items-center m-auto">
                <h1 className="text-5xl">Loading...</h1>
            </div>
        )
    }

    return (
        <div className="overflow-hidden flex">
            <div className="relative w-2/5 h-screen overflow-hidden">
                <span className="text-white flex items-center font-bold text-3xl">
                    <img src="/logo-website.png" alt="logo" className="h-12 m-5 mr-3"/>
                    QuillLink
                </span>
                <p className="text-white font-bold text-6xl w-auto mx-10 mt-44">Note-taking made simple with, <br /><span className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent">QuillLink</span></p>
                <img src="/background.jpeg" alt="background" className="absolute top-0 left-0 w-full h-[900px] object-cover object-right -z-10"/>
            </div>
            <div className="w-3/5 h-screen bg-[#F5F6FA] flex items-center justify-center">
                <div className="w-[30rem] flex-col flex">
                    <span className="font-bold text-4xl">Welcome to QuillLink!!</span>
                    <form onSubmit={registerUser} className="flex flex-col">
                        <span className='font-bold mt-6'>Full Name</span>
                        <input value={fullname} required onChange={(e)=>setFullname(e.target.value)} type="text" className='mt-2 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2' placeholder='Enter your fullname'/>

                        <span className='font-bold mt-4'>Username</span>
                        <input value={username} required onChange={(e)=>setUsername(e.target.value)} type="text" className='mt-2 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2' placeholder='Enter username'/>

                        <span className='font-bold mt-4'>Email Address</span>
                        <input value={email} required onChange={(e)=>setEmail(e.target.value)} type="email" className='mt-2 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2' placeholder='Enter your email address'/>

                        <span className='font-bold mt-4'>Password</span>
                        <input value={passwd} required onChange={(e)=>setPasswd(e.target.value)} type="password" className='mt-2 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2 z-10' placeholder='Enter your password'/>
                        <button type="submit" className='w-full rounded-lg border bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] font-bold text-xl text-white h-12 mt-5'>Register</button>
                    </form>
                    <span className="text-xs font-bold self-center mt-2">Already have account? <a href="/login" className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent">LogIn Here</a></span>
                </div>
            </div>
        </div>
    )
}