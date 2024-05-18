import React from 'react'

const Navbar = () => {
    return (
        <nav className=' bg-slate-800 text-white'>
            <div className="mycontainer flex justify-around items-center px-24 h-14 py-5">

                <div className="logo font-bold text-white text-2xl">

                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>


                </div>
                {/* <ul>
                    <li className='flex  gap-5'>
                        <a className='hover:font-bold' href="#">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li>
                </ul> */}
                <button className='text-white bg-green-500 my-5  rounded-full flex  justify-center items-center ring-white ring-1'>
                    <img className='w-12 invert  px-1 ' src="/github.svg" alt="" />
                    <span className='font-bold px-2'>Github</span>
                    
                </button>
            </div>
        </nav>
    )
}

export default Navbar