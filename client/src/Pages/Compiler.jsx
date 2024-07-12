import React, { useEffect, useRef, useState } from 'react'
import './compiler.css'
import Navbar from '../Components/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CodeModal from '../Components/CodeModal';
import { useModal } from '../ContextAPI/ModalContext';
import { FaCirclePlay } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import { FaFileDownload, FaSave } from "react-icons/fa";
import { CircularProgress, LinearProgress } from '@mui/material';


import toast from "react-hot-toast";
import Loader from '../Components/Loader';

const Compiler = () => {


    const [codeinput, SetcodeInput] = useState('');
    const [language, Setlanguage] = useState('cpp');
    const [output, setOutput] = useState('');
    const [userInput, setUserInput] = useState('');
    const textareaRef = useRef(null);
    const [user, Setuser] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { openModal, setOpenModal } = useModal();




    const handleRunCode = async () => {

        setLoading(true);

        const payload = {
            language,
            code: codeinput,
            userInput,
        };

        try {

            const { data } = await axios.post("/run", payload);
            setOutput(data.output);
        } catch (error) {
            if (error.response) {
                const errMsg = error.response.data.err.stderr;
                setOutput(errMsg);
            } else {
                setOutput("Error in connecting to the server");
            }
        } finally {
            setLoading(false); // Set loading to false after receiving the response
        }
    };





    //Local storage code 
    
    useEffect(() => {
        const savedCode = localStorage.getItem('savedCode');
        
        if (savedCode) {
            SetcodeInput(savedCode);
            textareaRef.current.value = savedCode;
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('savedCode', codeinput);
    }, [codeinput]);

    const handleOnChange = (e) => {
        SetcodeInput(e.target.value);
    }
    const handleCopyToClipboard = () => {
        const codeTextArea = document.querySelector('.code');
        codeTextArea.select();
        toast.success('Code Copied Successfully')
        document.execCommand('copy');

    };
    const handleDownload = () => {
        let fileExtension = '';
        let mimeType = '';

        if (language === 'cpp') {
            fileExtension = 'cpp';
            mimeType = 'text/x-c++src';
        } else if (language === 'py') {
            fileExtension = 'py';
            mimeType = 'text/x-python';
        } else if (language === 'c') {
            fileExtension = 'c';
            mimeType = 'text/x-csrc';
        }

        const blob = new Blob([codeinput], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `your_code_file.${fileExtension}`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Downloading Code File');
    };

    const handleAllcodes = () => {
        navigate('/allcodes')
    }
    const handleOnChangeInput = (e) => {
        setUserInput(e.target.value);
    };

    const fetchData = async () => {
        try {

            const userId = localStorage.getItem('userId');
            const response = await axios.get(`/api/v1/user/${userId}`);

            if (response.data.success) {
                Setuser(response.data.user);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('savedCode');
        navigate('/');
    }

    const handlesave=()=>{

        if(localStorage.getItem('userId')){
            setOpenModal(true)
        }
        else{
            toast.error('Login first to save code');
            navigate('/login');
        }
       
    }


    return (
        <>
            <Navbar />
            <div className='compiler-page' >
                <div className='compiler-container'>

                    <div className="compiler-nav">

                        <div className='btns'>
                            <select value={language}
                                onChange={(e) => Setlanguage(e.target.value)}>
                                <option value={'cpp'} className='dropdown' >C++</option>
                                <option value={'py'}>Python</option>
                                <option value={'c'}>C</option>
                            </select>
                            <button onClick={handleRunCode} ><FaCirclePlay className='icon-btn' /> </button>
                            <button onClick={handleCopyToClipboard}  ><IoCopy className='icon-btn' /></button>
                            <button onClick={handleDownload} ><FaFileDownload className='icon-btn' /></button>
                            <button onClick={() => handlesave()}><FaSave className='icon-btn' /></button>
                        </div>
                        <div className='user-name' style={{ color: '#eb5e28' }}>
                            {user?.username.toUpperCase()}
                        </div>

                    </div>

                    <textarea className='code' ref={textareaRef} onChange={handleOnChange}>

                    </textarea>

                </div>
                <div className="right-section">
                    <textarea className="user-input" placeholder='Enter the input...' onChange={handleOnChangeInput} ></textarea>
                    <div className="code-output"> {output}</div>
                </div>
            </div>


            {
                 openModal && <CodeModal title="Modal Title" initialcode={codeinput} language={language} />

            }
            {loading && (
                
                <Loader/>
            )}
        </>
    )
}

export default Compiler
