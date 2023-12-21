import { Link, useNavigate } from 'react-router-dom';
import signup from '../assets/signup.jpg';
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { useContext } from 'react';
import { authContext } from '../authProvider/AuthProvider';
import toast from 'react-hot-toast';
const Signup = () => {
    const { createUserByEmail, updateName, signInWihtGoogle, signinwithGithub } = useContext(authContext);
    const navigate = useNavigate();
    const handleCreateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);
        createUserByEmail(email, password)
        .then(res => {
            console.log(res);
            updateName({ displayName: name, photoURL: '' })
            .then(upRes => {
                console.log('update resp is', upRes);
                navigate('/dashboard/my-todos');
                toast.success('Registration Successfully!')
            })
            .catch(upErr => {
                console.log('UpError is', upErr);
                toast.error(upErr.message)

            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    const handleSignInWithGoogle = () => {
        signInWihtGoogle()
        .then(response => {
            console.log('google sign in response', response);
            if(response.user.email) {
                navigate('/dashboard/my-todos');
                toast.success('Registration Successfully!')
            }
        })
        .catch(error => {
            console.log('google sign in error', error);
            toast.error(error.message)
        })
    }
    const handleSignInWithGithub = () => {
        signinwithGithub()
        .then(response => {
            console.log('github sign in response', response);
            if(response.user.email) {
                navigate('/dashboard/my-todos');
                toast.success('Registration Successfully!')
            }
        })
        .catch(error => {
            console.log('github sign in error', error);
            toast.error(error.message)
        })
    }
    return (
        <div className='pt-12 w-11/12 mx-auto'>
            <div className='flex items-center justify-center py-16'>
                <div className='w-[700px] h-[550px]'>
                    <img className='w-full h-full' src={signup} alt="" />
                </div>
                <div className='border w-[550px] p-6 rounded-xl'>
                    <p className='text-center mb-2'>Welcome</p>
                    <h4 className='text-start text-2xl font-bold mb-4'>Sign Up</h4>
                    <form onSubmit={handleCreateUser}>
                    <div>
                    <label className='block font-medium' htmlFor="">Name:</label>
                    <input className='border w-full mt-1 px-3 py-2.5' type="text" name="name" id="" placeholder='Enter your name' />
                    </div>
                    <div className='mt-5'>
                    <label className='block font-medium' htmlFor="">Email</label>
                    <input className='border w-full mt-1 px-3 py-2.5' type="email" name="email" placeholder="Enter your email" />
                    </div>
                    <div className='mt-5'>
                    <label className='block font-medium' htmlFor="">Password:</label>
                    <input className='border w-full mt-1 px-3 py-2.5' type="password" name="password" placeholder='Enter your password' />
                    </div>
                    <div>
                        <button type='submit' className='w-full bg-[#006D77] mt-7 py-2.5 text-lg font-semibold text-white rounded-md'>Sign Up</button>
                    </div>
                    </form>
                    <p className='text-center mt-3'>Dont Have an account?<Link className='underline ml-1.5' to={'/signin'}>Sign up now_</Link></p>
                    <div className='flex items-center gap-2 mt-3'>
                        <span className='border-t-2 flex-1'></span>
                        <span>Or</span>
                        <span className='border-t-2 flex-1'></span>
                    </div>
                    <div className='flex items-center gap-10'>
                        <div onClick={handleSignInWithGoogle} className='border flex-1 gap-2 text-center p-2.5'>
                            <FcGoogle className='text-4xl mx-auto' />
                            <p className='text-xl font-semibold mt-2'>Google</p>
                        </div>
                        <div onClick={handleSignInWithGithub} className='border flex-1 text-xl gap-2 text-center p-2.5'>
                            <RxGithubLogo className='text-4xl mx-auto' />
                            <p className='text-xl font-semibold mt-1'>Github</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;