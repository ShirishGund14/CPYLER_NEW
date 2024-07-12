import React, { useEffect, useState } from 'react';
import './allcodes.css';
import { MdCodeOff } from 'react-icons/md';
import Navbar from '../Components/Navbar';
import { MdDelete, MdEdit } from 'react-icons/md';
import axios from 'axios';
import { useModal } from '../ContextAPI/ModalContext';
import CodeModal from '../Components/CodeModal';
import toast from "react-hot-toast";


const AllCodes = () => {
  const [savedCodes, setSavedCodes] = useState([]);
  const { openModal, setOpenModal } = useModal();
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedCode, setEditedCode] = useState({
    _id: '',
    title: '',
    language: '',
    description: '',
  });

  
  useEffect(() => {
    const fetchSavedCodes = async () => {
      try {

        const userId = localStorage.getItem('userId');
        const { data } = await axios.get(`/api/v1/code/user-code/${userId}`);

        if (data.success) {
          setSavedCodes(data.userCode.codes);
          toast.success(`${data.message}`);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedCodes();
  }, []);

  const handleDeleteCode = async (codeId) => {
    try {
      const{data}= await axios.delete(`/api/v1/code/delete-code/${codeId}`);
      toast.success(`${data.message}`);
      setSavedCodes((prevCodes) => prevCodes.filter((code) => code._id !== codeId));

    } catch (error) {
      console.error(error);
    }
  };

  const openViewModal = (codeId) => {
    const codeToDisplay = savedCodes.find((code) => code._id === codeId);
    setEditedCode({
      _id: codeToDisplay._id,
      title: codeToDisplay.title,
      language: codeToDisplay.language,
      description: codeToDisplay.description,
    });
    setOpenModal(true);
    setViewMode(true);
    setEditMode(false);
  };

  const openEditModal = (codeId) => {
    const codeToEdit = savedCodes.find((code) => code._id === codeId);
    setSavedCodes((prevCodes) =>
    prevCodes.map((code) =>
      code._id === editedCode._id ? editedCode : code
    )
  );
    setEditedCode({
      _id: codeToEdit._id,
      title: codeToEdit.title,
      language: codeToEdit.language,
      description: codeToEdit.description,
    });
    setOpenModal(true);
    setViewMode(false);
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCode((prevCode) => ({
      ...prevCode,
      [name]: value,
    }));
  };

  const formatDate = (inputDateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(inputDateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
    <>
      <Navbar />
      <div className='Allcodes-page'>
        {savedCodes.map((code) => (
          <div className='codecard-container' key={code._id}>
            <div className='codecard-top'>
              <div className='codecard-top-right'>
                <div>
                  <MdCodeOff style={{ fontSize: '2rem' }} />
                </div>
                <div className='rightcorner'>
                  <button onClick={() => openEditModal(code._id)}>
                    <MdEdit />
                  </button>
                  <button onClick={() => handleDeleteCode(code._id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
            <div className='card-content'>
              <h4 className='title'style={{color:'#eb5e28'}}>{code.title}</h4>
              <h5>{code.language}</h5>
              <p >{formatDate(code.updatedAt)}</p>
            </div>
            <button onClick={() => openViewModal(code._id)}>View</button>
          </div>
        ))}
      </div>
      {openModal && viewMode && <CodeModal title={editedCode.title} initialcode={editedCode.description} language={editedCode.language} mode={'view'} />}
      {openModal && editMode && <CodeModal title={editedCode.title} initialcode={editedCode.description} language={editedCode.language} mode={'edit'} codeid={editedCode._id} />}
    </>
  );
};

export default AllCodes;
