import mysql from "mysql2/promise";
// import bcrypt, { genSalt } from "bcrypt";
import bluebird from 'bluebird'
import db from '../models/index'
import { where } from "sequelize";
import { checkEmailExist, checkPhoneExist ,hashUserPassword } from "./loginRegisterService";

// const salt = bcrypt.genSaltSync(10);

const getUserWithPagination = async(page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const {count, rows} = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes:["id","username","email","phone","sex","address"],
      include: { model: db.Group,attributes:["name","description", "id"], },
      order: [['id', 'DESC']]
    }) 
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows
    }
     return {
              EM: 'fetch ok', //*error message
              EC: 0, //*error code
              DT: data //*data 
            }
  } catch (e) {
    console.log(e);
     return {
              EM: 'something wrongs with service', //*error message
              EC: 1, //*error code
              DT: [] //*data 
            }
  }
}
const getAllUser = async () => {
  try {
  let users = await db.User.findAll({
     attributes:["id","username","email","phone","sex"],
     include: { model: db.Group,attributes:["name","description"], },
  });
  if (users) {
    //! findOne có thể sử dụng users.get
    // let data = users.get({plain: true});
    return {
      EM: 'get data success',
      EC: 0,
      DT: users
    }
  }else{
    return {
        EM: 'get data success',
        EC: 0,
        DT: users
      }
  }
  } catch (e) {
    console.log(e);
      return{
        EM: 'Something wrong with services',
        EC: 1,
        DT: []
    }
  }
}
const createNewUser = async (data) => {
    // let hashPass = hashUserPassword(password);
    try {
      //* check email phone number
       let isEmailExist = await checkEmailExist(data.email);
      if (isEmailExist === true) {
          return {
              EM: 'The email is already exist',
              EC: 1,
              DT: 'email'
          }
      }
      let isPhoneExist = await checkPhoneExist(data.phone);
      if (isPhoneExist === true) {
          return {
              EM: 'The phone number is already exist',
              EC: 1,
              DT: 'phone'

          }
      }
      //* hash user password
      let hashPass = hashUserPassword(data.password);
    await db.User.create({...data, password:hashPass});
      return {
          EM: 'create ok ', //*error message
          EC: 0, //*error code
          DT: [] //*data 
        }
  } catch (e) {
    console.log(">>>check error:", e);
  }
}
const deleteUser = async (id) => {
  // DELETE FROM table_name WHERE condition;
  try {
    let user = await db.User.findOne({
      where: {id: id}
    })
    if (user) {
      await user.destroy();
        return {
          EM: 'delete user success', //*error message
          EC: 0, //*error code
          DT: [] //*data 
        }
    }else{
        return {
              EM: 'user not exist', //*error message
              EC: 2, //*error code
              DT: [] //*data 
            }
    }
  } catch (e) {
    console.log(e);
      return {
          EM: 'error from service', //*error message
          EC: 1, //*error code
          DT: [] //*data 
        }
  }

}
const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: {id: id}
  })
  return user = user.get({plain: true});
  // const connection = await mysql.createConnection({host:'localhost', user:'root', database:'jwt', Promise: bluebird});

  // try {
  // const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id=?', [id]);
  // return rows;
  // } catch (error) {
  //   console.log(">>>check error:", error);
  // }
}
const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: 'Error with empty groupid',
        EC: 1,
        DT: 'group'
      }
    }
    let user = await db.User.findOne({
      where: {id: data.id}
    })
    if (user) {
      //* update
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId
      })
        return {
            EM: 'Updata user success',
            EC: 0,
            DT: ''
        }
    }else{
      //* not found
        return {
          EM: 'User not found',
          EC: 2,
          DT: ''
        }
    }
  } catch (e) {
    console.log(e);
       return {
        EM: 'something wrongs with servies',
        EC: 1,
        DT: []
      }
  }
  // await db.User.update(
  //     {email: email, username: username},
  //     {where: {id: id}}
  // );
}
module.exports = {
    createNewUser, getAllUser, deleteUser, getUserById,updateUser, getUserWithPagination
}