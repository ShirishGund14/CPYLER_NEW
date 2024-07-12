import React, { useState, useEffect } from 'react';
import './modal.css';
import { useModal } from '../ContextAPI/ModalContext';
import axios from 'axios';
import toast from "react-hot-toast";

const CodeModal = ({ title, initialcode, language ,mode,codeid}) => {
   
    console.log(title,initialcode,language,mode);

    const [Language, setLanguage] = useState(language);
    const [newCode, setNewCode] = useState(initialcode);
    const [Title,SetTitle]=useState(title);
    const { openModal, setOpenModal } = useModal();
    const id = localStorage.getItem("userId");

   
   

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const handleSave = async (e) => {
        e.preventDefault();
        // setLoading(true);
        try {

            const { data } = await axios.post("/api/v1/code/create-code", {
                title: Title,
                language: Language,
                description: newCode,
                user: id,
            });
            if (data?.success) {
                toast.success(`${data.message}`);
                handleCloseModal(); // Close the modal after saving
            }
            else {
                toast.error(`${data.message}`);
            }
        } catch (error) {
            console.error(error);
        }finally{
            // setLoading(false);
        }
    };

    const saveEditedCode = async () => {
        try {
          // Send a PUT or PATCH request to update the code on the server
          const { data } = await axios.put(`/api/v1/code/update-code/${codeid}`, {
            title: Title,
            language:Language,
            description: newCode,
          });
          toast.success(`${data.message}`);
         setOpenModal(false);
        } catch (error) {
          console.error(error);
        }
      };
    

    return (
        <div className={openModal ? 'modal-container open' : 'modal-container'}>
            <div className="modal-content">
                

                 <input className='modal-title' name='title' value={Title} onChange={(e)=>SetTitle(e.target.value)} />
                   
                   
                
                
                <select value={Language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value={'cpp'}>C++</option>
                    <option value={'py'}>Python</option>
                    <option value={'c'}>C</option>
                </select>
                
                <textarea className='modal-code' name='code' value={newCode} onChange={(e) => setNewCode(e.target.value)}></textarea>
                
                <div className='modal-btns'>
                    {
                        mode==='edit'?  <button onClick={saveEditedCode}>Update</button>
                        : <button onClick={handleSave}>Save</button>
                    }
                   
                    <button onClick={handleCloseModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default CodeModal;
