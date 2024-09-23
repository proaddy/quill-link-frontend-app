import { useState } from 'react';
import '../styles/MobLogin.scss';

export default function MobileLogin() {
    const [aside, setAside] = useState('0');
    const handleAside = function(btn) {btn==='log'?setAside('1'):setAside('2')};

    const [email, setEmail] = useState('');
    const [passwd, setPass] = useState('');
    const [userN, setUserN] = useState('');
    
    const handleLogin = function() {
        console.log(email, passwd);
        setEmail('');
        setPass('');
    }

    const handleSignup = function() {
        console.log(userN, email, passwd);
        setUserN('');
        setEmail('');
        setPass('');
    }

  return (
    <div className='relative h-screen'>
        <div login={aside} className='w-full h-screen relative text-white mobileLoginContainer'>
            <img
                src="/background.jpeg"
                alt="background"
                className="absolute -z-50 top-0 left-0 object-cover h-[900px] object-right-top"
            />
            <div className="flex items-center">
                <img src="/logo-website.png" alt="logo" className="h-11 m-2" />
                <span className="font-bold text-2xl">QuillLink</span>
            </div>
            <div className="w-[90%] ml-6 mt-32  font-bold text-4xl">
                <p className=''>Note-taking made simple with,</p>
                <span className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent">
                QuillLink
                </span>
            </div>
            <div className="flex flex-col w-full items-center font-bold space-y-6 mt-28">
                <span onClick={()=>handleAside('crt')} className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] px-14 py-3 rounded-md cursor-pointer">
                Create Account
                </span>
                <span onClick={()=>handleAside('log')} className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] px-24 py-3 rounded-md cursor-pointer">
                Login
                </span>
            </div>
        </div>
        {aside === '1' && 
            <div id="login" className='h-screen bg-[#F5F6FA]'>
                <div className="flex flex-col p-8">
                    <span className='font-bold mt-16'>Email Address</span>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className='mt-1 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2' placeholder='Enter your email address'/>

                    <span className='font-bold mt-6'>Password</span>
                    <input value={passwd} onChange={(e)=>console.log(e.target.value)} type="password" className='mt-1 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2 z-10' placeholder='Enter your password'/>

                    <button onClick={handleLogin} className='w-full rounded-lg border bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] font-bold text-xl text-white h-12 mt-10 z-10'>Login</button>

                    <span className='text-xs font-bold self-center z-10'>Don't have account? <a href="#" className='bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent'>Register Here</a></span>
                    <div className="flex items-center self-center text-[#8b8b8b] my-8">
                        <div className="h-[1px] bg-[#a1a1a1] w-28 mr-5"></div>
                        OR
                        <div className="h-[1px] bg-[#a1a1a1] w-28 ml-5"></div>
                    </div>
                    <button className='border border-black flex items-center justify-center rounded-lg font-bold h-10 mt-6 z-10'><img src="/logo-google.png" alt="google" className='h-5 mr-5'/>Login with Google</button>
                    <button className='border border-black flex items-center justify-center rounded-lg font-bold h-10 mt-6'><img src="/logo-github.png" alt="google" className='h-5 mr-5'/>Login with Github</button>
                </div>

                <img src="/logo-website.png" className='invert absolute h-80 top-[28%] left-[7%] opacity-15'/>
            </div>
        }
        {aside === '2' && 
            <div id="register" className='h-screen bg-[#F5F6FA]'>
                <div className="flex flex-col p-8">
                    <span className='font-bold mt-8'>Username</span>
                    <input value={userN} onChange={(e)=>setUserN(e.target.value)} type="text" className='mt-1 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2' placeholder='Enter your username'/>

                    <span className='font-bold mt-3'>Email address</span>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className='mt-1 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2 z-10' placeholder='Enter your email address'/>

                    <span className='font-bold mt-3'>Password</span>
                    <input value={passwd} onChange={(e)=>setPass(e.target.value)} type="password" className='mt-1 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2 z-10' placeholder='Enter your password'/>

                    <button onClick={handleSignup} className='w-full rounded-lg border bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] font-bold text-xl text-white h-12 mt-10 z-10'>Sign up</button>

                    <span className='text-xs font-bold self-center z-10'>Already have account? <a href="#" className='bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent'>Login Here</a></span>
                    <div className="flex items-center self-center text-[#8b8b8b] my-8">
                        <div className="h-[1px] bg-[#a1a1a1] w-28 mr-5"></div>
                        OR
                        <div className="h-[1px] bg-[#a1a1a1] w-28 ml-5"></div>
                    </div>
                    <button className='border border-black flex items-center justify-center rounded-lg font-bold h-10 mt-6 z-10'><img src="/logo-google.png" alt="google" className='h-5 mr-5'/>Signup with Google</button>
                    <button className='border border-black flex items-center justify-center rounded-lg font-bold h-10 mt-6'><img src="/logo-github.png" alt="google" className='h-5 mr-5'/>Signup with Github</button>
                </div>
                <img src="/logo-website.png" className='invert absolute h-80 top-[28%] left-[7%] opacity-15'/>
            </div>
        }
    </div>
  );
}
