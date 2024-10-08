import express from "express";
import apiController from "../controller/apiController";
import userContrller from "../controller/userController";
import groupController from "../controller/groupController";
const router = express.Router();
//* express app
const initApiRoutes = (app) => {
  // router.get("/test-api",apiController.testApi);
  router.post("/register",apiController.handleRegister);
  router.post("/login",apiController.handleLogin);
  
  router.get("/user/read",userContrller.readFunc);
  router.post("/user/create",userContrller.createFunc);
  router.put("/user/update",userContrller.updateFunc);
  router.delete("/user/delete",userContrller.deleteFunc);
  
  
  router.get("/group/read",groupController.readFunc);
  
  return app.use("/api/v1", router);
};
export default initApiRoutes;
