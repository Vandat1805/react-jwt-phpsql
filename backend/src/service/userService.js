import mysql from "mysql2/promise";
import bcrypt, { genSalt } from "bcrypt";
import bluebird from 'bluebird'
import db from '../models/index'
import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
try {
  await db.User.create({
    username: username,
    email:email,
    password:hashPass
  })
} catch (error) {
  console.log(">>>check error:", error);
}
}
const getUserList = async () => {

  // test relationship
  let newUser = await db.User.findOne({
    where: {id:1},
    attributes:["id","username","email"],
    include: { model: db.Group,attributes:["name","description"], },
    raw:true,
    nest:true
  })

  // let roles = await db.Group.findAll({
  //   where:{id:1},
  //   include:{ model: db.Role },
  //   raw:true,
  //   nest:true
  // })
  let r = await db.Role.findAll({
    include:{model:db.Group,where:{id:1}},
    raw:true,
    nest:true
  })

  console.log(">>> check new users",newUser);
  console.log(">>> check new users",r);

  let users = [];
  users = await db.User.findAll();
  return users;
  // const connection = await mysql.createConnection({host:'localhost', user:'root', database:'jwt', Promise: bluebird});

//   try {
//   const [rows, fields] = await connection.execute('SELECT * FROM user')
//   return rows;
//   } catch (error) {
//     console.log(">>>check error:", error);
//   }
}
const deleteUser = async (userId) => {
  // DELETE FROM table_name WHERE condition;
  await db.User.destroy({
    where: {
      id: userId
    }
  })

  // const connection = await mysql.createConnection({host:'localhost', user:'root', database:'jwt', Promise: bluebird});

  // try {
  // const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
  // return rows;
  // } catch (error) {
  //   console.log(">>>check error:", error);
  // }
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
const updateUserInfo = async (email, username, id) => {
  await db.User.update(
      {email: email, username: username},
      {where: {id: id}}
  );
//  const connection = await mysql.createConnection({host:'localhost', user:'root', database:'jwt', Promise: bluebird});

//   try {
//   const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id=?', [email,username,id]);
//   return rows;
//   } catch (error) {
//     console.log(">>>check error:", error);
//   }
}
module.exports = {
    createNewUser, getUserList,deleteUser,getUserById,updateUserInfo
}