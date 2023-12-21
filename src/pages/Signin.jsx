import { Link } from 'react-router-dom';
import signin from '../assets/signin.jpg';
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
const Signin = () => {
    return (
        <div className='pt-12 w-11/12 mx-auto'>
            <div className='flex items-center justify-center flex-row-reverse py-16'>
                <div className='w-[500px] h-[500px]'>
                    <img className='w-full h-full' src={signin} alt="" />
                </div>
                <div className='border w-[500px] p-6 rounded-xl'>
                    <p className='text-center mb-2'>Welcome Back</p>
                    <h4 className='text-start text-2xl font-bold mb-4'>Sign In</h4>
                    <form>
                    <div className='mt-5'>
                    <label className='block font-medium' htmlFor="">Email</label>
                    <input className='border w-full mt-1 px-3 py-2.5' type="text" name="email" placeholder="Enter your email" />
                    </div>
                    <div className='mt-7'>
                    <label className='block font-medium' htmlFor="">Password:</label>
                    <input className='border w-full mt-1 px-3 py-2.5' type="text" name="password" placeholder='Enter your password' />
                    </div>
                    <div>
                        <button className='w-full bg-[#006D77] mt-8 py-2.5 text-lg font-semibold text-white rounded-md'>Sign In</button>
                    </div>
                    </form>
                    <p className='text-center mt-3'>Already Have an account?<Link className='underline ml-1.5' to={'/signup'}>Sign up now</Link></p>
                    <div className='flex items-center gap-2 mt-3'>
                        <span className='border-t-2 flex-1'></span>
                        <span>Or</span>
                        <span className='border-t-2 flex-1'></span>
                    </div>
                    <div className='flex items-center gap-10'>
                        <div className='border flex-1 gap-2 text-center p-2.5'>
                            <FcGoogle className='text-4xl mx-auto' />
                            <p className='text-xl font-semibold mt-2'>Google</p>
                        </div>
                        <div className='border flex-1 text-xl gap-2 text-center p-2.5'>
                            <RxGithubLogo className='text-4xl mx-auto' />
                            <p className='text-xl font-semibold mt-1'>Github</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;