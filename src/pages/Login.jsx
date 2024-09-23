export default function Login() {
    return (
        <div className="overflow-hidden flex">
            <div className="relative w-1/2 h-screen overflow-hidden">
                <span className="text-white flex items-center font-bold text-3xl">
                    <img src="/logo-website.png" alt="logo" className="h-12 m-5 mr-3"/>
                    QuillLink
                </span>
                <p className="text-white font-bold text-6xl w-3/4 mx-8 mt-44">Note-taking made simple with, <br /><span className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent">QuillLink</span></p>
                <img src="/background.jpeg" alt="background" className="absolute top-0 left-0 w-full h-[900px] object-cover object-right -z-10"/>
            </div>
            <div className="w-1/2 h-screen bg-[#F5F6FA] flex flex-col px-32 py-28">
                <span className="font-bold text-4xl">Hello Again!!</span>
                <button className='border border-black flex items-center justify-center rounded-lg font-bold h-10 mt-6 z-10'><img src="/logo-google.png" alt="google" className='h-5 mr-5'/>Login with Google</button>
                <button className='border border-black flex items-center justify-center rounded-lg font-bold h-10 mt-6 z-10'><img src="/logo-github.png" alt="google" className='h-5 mr-5'/>Login with Github</button>
                <div className="flex items-center self-center text-[#8b8b8b] mt-8">
                    <div className="h-[1px] bg-[#a1a1a1] w-40 mr-5"></div>
                    OR
                    <div className="h-[1px] bg-[#a1a1a1] w-40 ml-5"></div>
                </div>
                <span className='font-bold mt-6'>Email Address</span>
                <input type="email" className='mt-2 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2' placeholder='Enter your email address'/>

                <span className='font-bold mt-4'>Password</span>
                <input type="password" className='mt-2 border border-[#707070] font-bold rounded-lg bg-transparent px-3 py-2 z-10' placeholder='Enter your password'/>
                <button className='w-full rounded-lg border bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] font-bold text-xl text-white h-12 mt-5'>Login</button>
                <span className="text-xs font-bold self-center mt-2">Don't have account? <a href="#" className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent">Sign up Here</a></span>
            </div>
        </div>
    )
}