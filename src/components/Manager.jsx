import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))

        }

    }, [])

    const copytext = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)

    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/hide.svg")) {
            ref.current.src = "/show.svg"
            passwordRef.current.type = "password"

        }
        else {
            ref.current.src = "/hide.svg"
            passwordRef.current.type = "text"
        }
    }
    const savePassword = () => {
if(form.site.length >3 && form.username.length >3 && form.password.length >3){


        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        setform({ site: "", username: "", password: "" })
        toast('Password Saved successfully ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    else{
        toast('Error: Password cant be saved ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    }

    }
    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete your password")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id), { ...form, id: uuidv4() })
            localStorage.setItem("password", JSON.stringify(...passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted successfully ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
          
        }


    }
    const editPassword = (id) => {

        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
      

    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className=" bg-green-50 md:mycontainer min-h-[82vh]">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span></h1>
                <p className='text-green-600 text-lg text-center'> your password manager</p>

                <div className=" text-black flex flex-col p-4 gap-8 items-center ">
                    <input value={form.site} onChange={handlechange} placeholder='Enter Website URL' className='rounded-full border border-green-700 w-full px-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-10">
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className='rounded-full border border-green-700 w-full px-4 py-1' type="text" name='username' id='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-full border border-green-700 w-full px-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[1px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1 ' width={30} src="/show.svg" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 rounded-full gap-2 px-4 py-2 w-fit hover:bg-green-600'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && < table className="table-auto w-full overflow-hidden rounded-xl mb-10">
                        <thead className=' bg-green-700 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    < td className=' py-2  border border-white text-center flex items-center justify-center' >
                                        <div className='flex justify-center items-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-6 cursor-pointer' onClick={() => { copytext(item.site) }}>
                                                <box-icon
                                                    style={{ "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    type='solid' name='copy-alt'></box-icon>
                                            </div>
                                        </div></td>
                                    <td className='py-2 border border-white text-center '>
                                        <div className='flex justify-center items-center'>
                                            <span> {item.username}</span>
                                            <div className='lordiconcopy size-6 cursor-pointer' onClick={() => { copytext(item.username) }}>
                                                <box-icon
                                                    style={{ "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    type='solid' name='copy-alt'></box-icon>
                                            </div>
                                        </div></td>
                                    <td className='py-2 border border-white text-center  '>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.password}</span>
                                            <div className='lordiconcopy size-6 cursor-pointer' onClick={() => { copytext(item.password) }}>
                                                <box-icon
                                                    style={{ "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    type='solid' name='copy-alt'></box-icon>
                                            </div>
                                        </div></td>
                                    <td className='py-2 border border-white text-center  '>
                                        <span className='cursor-pointer mx-1'>
                                            <box-icon name='edit-alt' type='solid' onClick={() => { editPassword(item.id) }} ></box-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <box-icon type='solid' name='trash'></box-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div >
            </div >
        </>

    )
}

export default Manager