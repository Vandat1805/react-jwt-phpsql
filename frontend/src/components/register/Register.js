import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerNewUser } from '../../service/userService';
const Register = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail:true,
        isValidPhone:true,
        isValidPassword:true,
        isValidConfirmPassword:true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)
    
    let navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    }
    useEffect(()=>{
        
    },[])
    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);
        if (!email) {
        toast.error("Email reqired");
        setObjCheckInput({...defaultValidInput, isValidEmail:false});
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
        toast.error("Please enter correct email");
        setObjCheckInput({...defaultValidInput, isValidEmail:false});
            return false;
        }
        if (!username) {
        toast.error("Username reqired");
            return false;
        }
        if (!password) {
        toast.error("Password reqired");
        setObjCheckInput({...defaultValidInput, isValidPassword:false});
            return false;
        }
        if (!phone) {
        toast.error("Phone reqired");
        setObjCheckInput({...defaultValidInput, isValidPhone:false});
            return false;
        }
        if (password != confirmPassword) {
        toast.error("Your password is not same !");
        setObjCheckInput({...defaultValidInput, isValidConfirmPassword:false});
            return false;
        }
        return true;
    }

    const handleRegister= async () => {
        let check = isValidInputs();
        if (check === true) {
            let response = await registerNewUser(email,phone,username,password);
            let  serverData = response.data;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                navigate("/login");
            }else{
                toast.error(serverData.EM);
            }
        }
    }
  return (
    <div className='wrap-grid'>
        <div className="login-left">
            <h2>Register page</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ab velit nihil totam cupiditate labore, architecto consequuntur doloremque eaque enim? Veritatis dicta eligendi praesentium beatae veniam vitae delectus perspiciatis atque.</p>
        </div>
        <div className="login-right">
            <div className="wrap-login-right">
                <label htmlFor="">Email</label>
                <input type="text" className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-valid'} placeholder='Email address' value={email} onChange={(event)=>setEmail(event.target.value)}/>
                <span className="margin"></span>
                <label htmlFor="">Username</label>
                <input type="text" placeholder='Username' value={username} onChange={(event)=>setUsername(event.target.value)}/>
                <span className="margin"></span>
                <label htmlFor="">Phone number</label>
                <input type="text" className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-valid'} placeholder='Phone number' value={phone} onChange={(event)=>setPhone(event.target.value)}/>
                <span className="margin"></span>
                <label htmlFor="">Password</label>
                <input type="password" className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-valid'} placeholder='Password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
                <span className="margin"></span>
                <label htmlFor="">Re-enter Password</label>
                <input type="password" className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-valid'} placeholder='Re-enter Password' value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)}/>
                <span className="margin"></span>
                <span className="margin"></span>
                <button className='btn-info login' onClick={()=>handleRegister()}>Register</button>
                <span className="margin"></span>
                <button className='btn-success' onClick={() => handleLogin()}>Already have an account | Login</button>
            </div>
        </div>
    </div>
  )
}

export default Register;