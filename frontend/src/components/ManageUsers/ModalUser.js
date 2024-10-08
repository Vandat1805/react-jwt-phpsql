import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createNewUser, fetchGroup, updateCurrentUser } from "../../service/userService";
import _ from "lodash";
// import { IoClose } from "react-icons/io5";



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

function ModalUser({ handleUpdateTable, action, dataModalUpdate, buttonText }) {



const defaultUserData = {
  email: '',
  phone: '',
  username: '',
  password: '',
  address: '',
  sex: '',
  group: ''
}
const validInputsDefault = {
  email: true,
  phone: true,
  username: true,
  password: true,
  address: true,
  sex: true,
  group: true
}


const [userData, setUserData] = useState(defaultUserData);
const [validInputs, setValidInputs] = useState(validInputsDefault);

const [userGroups, setUserGroups] = useState([]);

useEffect(()=>{
  getGroups();
}, [])


useEffect(()=>{
  if (action === 'UPDATE' && dataModalUpdate) {
    setUserData({...dataModalUpdate, group: dataModalUpdate.Group ? dataModalUpdate.Group.id: ''});
  }
}, [action, dataModalUpdate])

const getGroups = async() => {
  let res = await fetchGroup();
  if (res && res.data && res.data.EC === 0) {
    setUserGroups(res.data.DT);
    if (res.data.DT && res.data.DT.length > 0) {
      let groups = res.data.DT
      setUserData({...userData, group: groups[0].id})
    }
  }else{
      toast.error(res.data.EM);
  }
}


  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "";
  }

  function closeModal() {
    setIsOpen(false);
  }

  
  const handleOnchangeInput = (value, name) =>{
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  }
  const checkValidataInputs = () =>{
    //* create user
    if (action === 'UPDATE') {
      return true;
    }
    setValidInputs(validInputsDefault);

    let arr = ['email', 'phone', 'password', 'group'];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  }
  const handleConfirmUser = async() =>{
    //* create user
    let check =  checkValidataInputs();
    if (check === true) {
      let res = action === 'CREATE' ? await createNewUser({...userData, groupId: userData['group'] })
      : await updateCurrentUser({...userData, groupId: userData['group'] });


      if (res.data && res.data.EC === 0) {
        closeModal();
        setUserData({...defaultUserData, group: userGroups && userGroups.length > 0 ? userGroups[0].id: ''})
        handleUpdateTable();
      }
      if (res.data && res.data.EC !== 0) {
        toast.error(res.data.EM);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.data.DT] = false;
        setValidInputs(_validInputs);
      }
    }
  }
  return (
    <>
    <div>
      <button onClick={openModal} style={{color:'whitesmoke'}}>
        {/* {action === 'CREATE' ? 'ADD NEW USER' : 'EDIT A USER'} */}
        {buttonText}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={500}
      >
        <div 
        // className="wrap-title add"
        className={`wrap-title ${action === 'CREATE' ? 'add' : 'edit'}`}
        >
          <h2
            className="title-modal"
            ref={(_subtitle) => (subtitle = _subtitle)}
          >
            {action === 'CREATE' ? 'Add New User' : 'Edit A User'}
          </h2>
          <button onClick={closeModal}>
            {/* <IoClose size={32} /> */}
          </button>
        </div>
        <div className='wrap-content-modal'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut quae
          necessitatibus, dolore corporis at porro libero iure. Error
        </div>
        <div className="mx-2"></div>
        <div className="wrap-col-2">
        {/* <div className="mx-2"></div> */}
        <div className="wrap-input">
          <label className="" htmlFor="">
            Email (*)
          </label>
          <br />
          <input
            disabled={action === 'CREATE' ? false : true}
            className={validInputs.email ? 'form-control' : 'form-control is-valid'}
            type="email"
            autoComplete={false}
            value={userData.email}
            onChange={(event) => handleOnchangeInput(event.target.value, "email")}
          />
        </div>
        {/* <div className="mx-2"></div> */}
        <div className="wrap-input">
          <label className="" htmlFor="">
            Username
          </label>
          <input
            className={validInputs.username ? 'form-control' : 'form-control is-valid'}
            type="text"
            autoComplete={false}
            value={userData.username}
           onChange={(event) => handleOnchangeInput(event.target.value, "username")}
          />
        </div>
        {/* <div className="mx-2"></div> */}
        <div className="wrap-input">
          <label className="" htmlFor="">
            Phonenum (*)
          </label>
          <input
            disabled={action === 'CREATE' ? false : true}
            className={validInputs.phone ? 'form-control' : 'form-control is-valid'}
            type="text"
            autoComplete={false}
            value={userData.phone}
            onChange={(event) => handleOnchangeInput(event.target.value, "phone")}
          />
        </div>
        {/* <div className="mx-2"></div> */}
        {action === 'CREATE' &&
        <div className="wrap-input">
          <label className="" htmlFor="">
            Password (*)
          </label>
          <input
            className={validInputs.password ? 'form-control' : 'form-control is-valid'}
            type="password"
            autoComplete={false}
            value={userData.password}
            onChange={(event) => handleOnchangeInput(event.target.value, "password")}
          />
        </div>
        }
        </div>
        <div className="mx-2"></div>
          <div className="wrap-input-special">
          <label className="" htmlFor="">
            Address
          </label>
          <input
            className=""
            type="text"
            autoComplete={false}
            value={userData.address}
            onChange={(event) => handleOnchangeInput(event.target.value, "address")}
          />
        </div>
        <div className="mx-2"></div>
         <div className="wrap-col-2">
          <div className="wrap-input">
          <label className="" htmlFor="">
            Gender
          </label>
          <br />
         <select name="" id="" onChange={(event) => handleOnchangeInput(event.target.value, "sex")} value={userData.sex}>
            <option selected value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          </div>
          <div className="wrap-input">
          <label className="" htmlFor="">
            Group (*)
          </label>
          <br />
          <select className={validInputs.group ? 'form-control' : 'form-control is-valid'} name="" id="" onChange={(event) => handleOnchangeInput(event.target.value, "group")} value={userData.group}>
          {userGroups.length > 0 &&
          userGroups.map((item, index)=>{
            return(
              <option key={`group-${index}`} value={item.id}>{item.name}</option>
            )
          })
          }
          </select>
          </div>
        </div>
        <div className="wrap-button">
          <button
            className="btn-modal-close"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className={`btn-modal ${action === 'CREATE' ? 'add' : 'edit'}`}
            onClick={() => handleConfirmUser()}
          >
                    {action === 'CREATE' ? 'SUBMIT' : 'UPDATE'}
          </button>
        </div>
      </Modal>
    </div>
    </>
  );
}

export default ModalUser;
