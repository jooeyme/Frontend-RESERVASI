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
    const [error, setError] = useState('');
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
            await Register({username, email, password, confirmPassword, NIM, dept});
            
            navigate('/login');
        } catch (error) {
            console.error('Registration Error:');
            setError('Registration failed. Please try again.');
        }
    };
      
  return (
    <>
        
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                                NIM
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
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required="" />
                        </div>
                        <div>
                            <label 
                                htmlFor="confirmPassword" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Confirm Password
                            </label>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                id="confirmPassword" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required="" />
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