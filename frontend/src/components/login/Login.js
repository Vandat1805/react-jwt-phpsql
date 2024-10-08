// ! Session storage vs Local storage => đều lưu trữ data
//! Local storage lưu data mãi mãi
//! Session sễ bị xóa khi đóng trình duyệt hoặc tab ==> chỉ hỗ trợ version mới
//! Cookie có thể đặt thời gian sử dụng và hết
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from "../../service/userService";
const Login = () => {
    let navigate = useNavigate();
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
    const handleCreateNewAccount = () => {
        navigate("/register");
    }
    // const handlePressEnter = (event) =>{
    //     if (event.charCode === 13 && event.code === "Enter") {
    //         handleLogin();
    //     }
    // }
    const handlePressEnter = (event) =>{
         if (event.key === "Enter") {
        handleLogin();
    }
    }
    const handleLogin = async() =>{
        setObjValidInput(defaultObjValidInput);
        if (!valueLogin) {
            setObjValidInput({...defaultObjValidInput, isValidValueLogin:false});
            toast.error("Please enter your email address or phone number");
            return;
        }
        if (!valueLogin) {
            setObjValidInput({...defaultObjValidInput, isValidPassword:false})
            toast.error("Please enter your  password");
            return;
        }
        let response = await loginUser(valueLogin, password);
        if (response && response.data && response.data.EC === 0) {
            // * SUCCESS
            let data = {
                isAuthenticated: true,
                token: 'fake token',
            }
            sessionStorage.setItem('account', JSON.stringify(data));
            navigate("/users");
            window.location.reload();
            // * REDUX
        }
        if (response && response.data && response.data.EC !== 0) {
            // * ERROR
            toast.error(response.data.EM);
        }
    }
    useEffect(()=>{
        let session = sessionStorage.getItem('account');
        if (session) {
            navigate("/");
            window.location.reload();
        }
    }, [])
  return (
    <div className='wrap-grid'>
        <div className="login-left">
            <h2>Login page</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ab velit nihil totam cupiditate labore, architecto consequuntur doloremque eaque enim? Veritatis dicta eligendi praesentium beatae veniam vitae delectus perspiciatis atque.</p>
        </div>
        <div className="login-right">
            <div className="wrap-login-right">
                <label htmlFor="">Email</label>
                <input className={objValidInput.isValidValueLogin ? 'form-control' : 'form-control is-valid'} type="text" placeholder='Email and address or phone number' value={valueLogin} onChange={(event)=>{setValueLogin(event.target.value) }}/>
                <span className="margin"></span>
                <label htmlFor="">Password</label>
                <input className={objValidInput.isValidPassword ? 'form-control' : 'form-control is-valid'} type="password" placeholder='Password' value={password} onChange={(event)=>{setPassword(event.target.value) }} onKeyDown={(event) => handlePressEnter(event)}/>
                <span className="margin"></span>
                <button className='btn-info login' onClick={() => handleLogin()}>Login</button>
                <span className="margin"></span>
                <span className='forgot-login'>Forgot you password?</span>
                <span className="margin"></span>
                <button className='btn-success' onClick={() => handleCreateNewAccount()}>Create new account</button>
            </div>
        </div>
    </div>
  )
}

export default Login