import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {LoginAdmin} from '../modules/fetch/auth';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email_admn, setEmail_admn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await LoginAdmin({ email_admn, password });
      const { token, role } = response;
      localStorage.setItem('token', token);
      navigate('/home-admin')
    } catch (error) {
      // Handle login error
      setError('Invalid email or password');
      console.error('Login error:', error.message
      );
    }
  };
      
  return (
    <>
        
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login Admin
              </h1>
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email_admn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Admin</label>
                            <input 
                              type="email" 
                              name="email_admn" 
                              id="email_admn" 
                              value={email_admn}  
                              onChange={(e) => setEmail_admn(e.target.value)} 
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                              placeholder="name@mail.com" 
                              required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <div className="relative">
                            <input 
                              type={showPassword? "text" : "password"} 
                              name="password" 
                              id="password" 
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)} 
                              placeholder="••••••••" 
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
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
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button 
                          type="submit" 
                          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                        
                    </form>
                </div>
            </div>
            </div>
        
    </>
        
  );
};

export default AdminLoginPage;