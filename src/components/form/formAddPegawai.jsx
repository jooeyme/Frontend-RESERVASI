import React,{ useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AddAdmin } from '../../modules/fetch/auth/index.js';

const role = { 
    SP:'super_admin', 
    AD: 'admin', 
    AS: 'admin_staff'
}

const AddAdmin = () => {
    const [username_admn, setUsername_admn] = useState('');
    const [email_admn, setEmail_admn] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
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
            const result = await AddAdmin({username, email, password, confirmPassword, role});
            
            
        } catch (error) {
            console.error('Registration Error:',error.response?.data || error.message);
            console.log("pw:", password, "=", confirmPassword)
            setError('Registration failed. Please try again.');
        }
    };
      
  return (
    <>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Tambah Admin
              </h1>
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form 
                        onSubmit={handleRegister} 
                        className="space-y-4 md:space-y-6">
                        <div>
                            <label 
                                htmlFor="username_admn" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nama Lengkap
                            </label>
                            <input 
                                type="text" 
                                name="username_admn"  
                                id="username_admn"  
                                value={username_admn}  
                                onChange={(e) => setUsername_admn(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="nama lengkap" 
                                required="" />
                        </div>
                        <div>
                            <label 
                                htmlFor="email_admn" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your email_admn
                            </label>
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
                        <div>
                            <label 
                                htmlFor="role" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Role Admin
                            </label>
                            <select  
                                name="role" 
                                id="role" 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required="" 
                                >
                                    <option value={role.SP}>Super Admin</option>
                                    <option value={role.AD}>Admin Room</option>
                                    <option value={role.AS}>Admin Tool</option>
                                </select>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Register
                        </button>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </form>
                </div>
            </div>
            </div>
        </section>
    </>
        
  );
};

export default AddAdmin;