import { useState } from 'react';
import { forgotPassword } from '../../modules/fetch/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("apa isi email:", email)
    try {
      const response = await forgotPassword(email);
      console.log("isi email disini:", email)
      Swal.fire(
        "Berhasil!",
        "email reset password berhasil dikirimkan.",
        "success"
      );
    } catch (error) {
      console.error(error.message);
      Swal.fire(
        "Error!",
        "Gagal mengirimkan email reset password",
        "error"
      );
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Lupa Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
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
          <button 
            type="submit" 
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Kirim Link Reset
          </button>
        </form>
      </div>
    </div>
    </>
  );
} 

export default ForgotPassword;