import db from "../models/index"
import bcrypt, { genSalt } from "bcrypt";
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async(userEmail)=>{
    let user = await db.User.findOne({
        where: {email: userEmail}
    })
     if (user) {
        return true;
    }
    return false;
}
const checkPhoneExist = async(userPhone)=>{
    let user = await db.User.findOne({
        where: {phone: userPhone}
    })
    if (user) {
        return true;
    }
    return false;
}

const registerNewUser = async(rawUserData) => {
    try {
        //* check email/phonenumber exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
        return {
            EM: 'The email is already exist',
            EC: 1
        }
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
     if (isPhoneExist === true) {
        return {
            EM: 'The phone number is already exist',
            EC: 1
        }
    }
    //* has user password
    let hashPassword = hashUserPassword(rawUserData.password);

    //* create  new user 
    await db.User.create({
        email: rawUserData.email,
        username: rawUserData.username,
        password: hashPassword,
        phone: rawUserData.phone
    })

    return {
        EM: 'A user is created successfully',
        EC: 0
    }
     } catch (e) {
        console.log(e);
        return {
            EM: 'Something Wrong in servece...',
            EC: -2
        }
    }
}
const checkPassword = (inputPassword, hashPassword) => {
   return bcrypt.compareSync(inputPassword,hashPassword); // true
}

const handleUserLogin = async (rawData) => {
    try {
    let user = await db.User.findOne({
        where: {
            [Op.or]:[
                {email: rawData.valueLogin},
                {phone: rawData.valueLogin}
            ]
        }
    })
    if (user) {
        console.log(">>> found user with email/phone");
        let isCorrectPassword = checkPassword(rawData.password, user.password);
        if (isCorrectPassword === true) {
            return {
            EM: 'Ok!',
            EC: 0,
            DT: ''
            }
        }
    }
        console.log(">>> input user with email/phone", rawData.valueLogin, "password: ", rawData.password);
        return {
          EM: 'Your email/phone number or password is inccorect!',
          EC: 1,
          DT: ''
      }

    } catch (error) {
        console.log(error);
        return {
            EM: 'Something Wrong in servece...',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, hashUserPassword,checkEmailExist, checkPhoneExist
} 