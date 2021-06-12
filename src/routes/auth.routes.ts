import {AuthController} from "../controller/AuthController";


export const AuthRouter = [{
    method: "post",
    route: "/login",
    controller : AuthController,
    action: "login"
},{
    method: "post",
    route: "/register",
    controller : AuthController,
    action: "register"
},{
    method: "post",
    route: "/reset-pass",
    controller : AuthController,
    action: "resetPassword"
},{
    method: "get",
    route: "/verify/:confirmationCode",
    controller : AuthController,
    action: "verifyUser"
}]