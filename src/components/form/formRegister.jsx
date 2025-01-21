import React,{ useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Register } from '../../modules/fetch/auth/index.js';

const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [NIM, setNIM] = useState('');
    const [dept, setDept] = useState('');
    const [alamat, setAlamat] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Check if passwords match
            if (password !== confirmPassword) {
                setError("Passwords don't match");
                return;
            }
            // Make an API call to register the user
            await Register({username, email, password, confirmPassword, NIM, dept, alamat});
            
            navigate('/login');
        } catch (error) {
            console.error('Registration Error:');
            setError('Registration failed. Please try again.');
        }
    };
      
  return (
    <>
        
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                
                <div className="p-3 space-y-4 md:space-y-5 sm:p-6">
                <div className="flex items-center justify-center">
                    <a className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register
                        </h1>
                    </a>
                </div>
                    <form 
                        onSubmit={handleRegister} 
                        className="space-y-2 md:space-y-4">
                        <div>
                            <label 
                                htmlFor="username" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nama Lengkap
                            </label>
                            <input 
                                type="text" 
                                name="username"  
                                id="username"  
                                value={username}  
                                onChange={(e) => setUsername(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="nama lengkap" 
                                required="" />
                        </div>
                        <div>
                            <label 
                                htmlFor="NIM" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                NIM/NIP/NIK
                            </label>
                            <input 
                                type="text" 
                                name="NIM"  
                                id="NIM"  
                                value={NIM}  
                                onChange={(e) => setNIM(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="NIM" 
                                required="" />
                        </div>
                        <div>
                            <label 
                                htmlFor="dept" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Departemen
                            </label>
                            <input 
                                type="text" 
                                name="dept"  
                                id="dept"  
                                value={dept}  
                                onChange={(e) => setDept(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Asal Departemen" 
                                required="" />
                        </div>
                        <div>
                            <label 
                                htmlFor="alamat" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Alamat Tempat Tinggal
                            </label>
                            <input 
                                type="text" 
                                name="alamat"  
                                id="alamat"  
                                value={alamat}  
                                onChange={(e) => setAlamat(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Alamat tempat tinggal" 
                                required="" />
                        </div>
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your email
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={email}  
                                onChange={(e) => setEmail(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="name@mail.com" 
                                required="" />
                        </div>
                        <div>
                            <label 
                                htmlFor="password" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>
                            <div className='relative'>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required="" />
                                 <button id='password' type="button" data-hs-toggle-password='{
                                    "target": "#hs-toggle-password"
                                }' 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500">
                                <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                    <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                    <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                    <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                                    <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                    <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                                </svg>
                                </button>
                                </div>
                        </div>
                        <div>
                            <label 
                                htmlFor="confirmPassword" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Confirm Password
                            </label>
                            <div className="relative">
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                name="confirmPassword" 
                                id="confirmPassword" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required="" />
                                <button id='password' type="button" data-hs-toggle-password='{
                                    "target": "#hs-toggle-password"
                                }' 
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500">
                                <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                    <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                    <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                    <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                                    <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                    <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                                </svg>
                                </button>
                                </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Register
                        </button>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?  
                            <Link 
                                to="/login" 
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            </div>
        
    </>
        
  );
};

export default RegisterUser;