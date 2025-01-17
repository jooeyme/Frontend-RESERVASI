import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {LoginAdmin} from '../modules/fetch/auth';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email_admn, setEmail_admn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  


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
                            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
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