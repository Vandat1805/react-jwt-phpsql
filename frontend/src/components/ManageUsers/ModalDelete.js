import React, { useState } from 'react'
import Modal from "react-modal";
import "../../App.css"
import { deleteUser } from '../../service/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // marginRight: "-50%",
    padding: "0px",
    transform: "translate(-50%, -50%)",
    borderRadius: "0.25rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

const ModalDelete = ({dataModal, handleUpdateTable}) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const confirmDelete = async() =>{
    let response = await deleteUser(dataModal);
    console.log(">>>chek modal", dataModal);
      if (response && response.data.EC === 0) {
        toast.success(response.data.EM);
        closeModal();
        handleUpdateTable();
      }else{
        toast.error(response.data.EM);
      }
  }
  return (
    <div>
      <button className='btn-modal del' onClick={openModal}>Delete A User</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={500}
      >
        <div className="wrap-title del">
          <h2 className="title-modal" ref={(_subtitle) => (subtitle = _subtitle)}>Delete User</h2>
          {/* <button onClick={closeModal}>
            <IoClose size={32} />
          </button> */}
        </div>
        <div className='wrap-content-modal'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut quae
          necessitatibus, dolore corporis at porro libero iure. Error
        </div>
        <h2>
          Are you sure want to delete user:<br />
          <b>{dataModal.email} ?</b>
        </h2>
        <div className="wrap-button">
          <button
            className="btn-modal-close"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="btn-modal del"
            onClick={() => confirmDelete()}

          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalDelete;