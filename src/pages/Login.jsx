import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
require('dotenv').config();
const backend = process.env.BACKEND;

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function checkLogin(e) {
        e.preventDefault();
        try {
            setError(false);
            setLoading(true);
            const response = await axios.get(`${backend}/api/users`);
            const myUser = response.data.filter(usr => usr.email === email && usr.password === passwd);
            // console.log(myUser);
            if (myUser.length === 0) {
                setLoading(false);
                alert("No such user found!! Please check if email and password are correct");
            } else {
                setLoading(false);
                alert("Logged In Successfully");
                // storing data of the user
                localStorage.setItem("userID", myUser[0]._id);
                localStorage.setItem("username", myUser[0].username);

                navigate('/');
                return;
            }
            setEmail('');
            setPasswd('');
        } catch (error) {
            setLoading(false);
            setError(true);
            console.error("error", error);
        }
    }

    const data = useLocation();
    useEffect(()=>{
        if (data.state) {
            if (data.state.action === 'logout') {
                alert("Logout successfull");
            } else if (data.state.action === 'notloggedin') {
                alert("User Not LoggedIn");
            } else {}
        }
    }, []);

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
                    <span className="font-bold text-4xl">Hello Again!!</span>
                    <form onSubmit={checkLogin} className="flex flex-col">
                        <span className='font-bold mt-6'>Email Address</span>
                        <input value={email} required onChange={(e)=>setEmail(e.target.value)} type="email" className='mt-2 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2' placeholder='Enter your email address'/>

                        <span className='font-bold mt-4'>Password</span>
                        <input value={passwd} required onChange={(e)=>setPasswd(e.target.value)} type="password" className='mt-2 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2 z-10' placeholder='Enter your password'/>
                        <button type="submit" className='w-full rounded-lg border bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] font-bold text-xl text-white h-12 mt-5'>Login</button>
                    </form>
                    <span className="text-xs font-bold self-center mt-2">Don't have account? <a href="/register" className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent">Sign up Here</a></span>
                </div>
            </div>
        </div>
    )
}