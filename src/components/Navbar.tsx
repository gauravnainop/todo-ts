import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='w-full px-3 h-16 bg-gray-600 flex items-center justify-between text-white font-bold text-xl'>
        <div>
        <h1>To Do App</h1>  </div>
        <div>
            <a href="#" className="text-white hover:text-gray-300">Home</a>
            <a href="#" className="ml-4 text-white hover:text-gray-300">History</a>
        </div>

    </nav>
    </>
  )
}

export default Navbar
