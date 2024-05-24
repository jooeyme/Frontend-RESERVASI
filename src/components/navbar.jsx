import React from "react"
import Sidebar from "./sidebar"

const Navbar = () => {
    return (
        <div class="flex h-screen bg-gray-100">
            <div class="hidden md:flex flex-col w-64 bg-gray-800">
        <Sidebar />
        </div>
        <div class="flex flex-col flex-1 overflow-y-auto">
        <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
            <div class="flex items-center px-4">
                <button class="text-gray-500 focus:outline-none focus:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            <div class="flex items-center pr-4">

            <div class="flex items-center text-gray-500">
          <span class="material-icons-outlined p-2" >search</span>
          <span class="material-icons-outlined p-2" >notifications</span>
          <div class="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2" ></div>
          <a href="#" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
                </div>
            </div>
        </div>
    </div>
    </div>
    
    )
}

export default Navbar