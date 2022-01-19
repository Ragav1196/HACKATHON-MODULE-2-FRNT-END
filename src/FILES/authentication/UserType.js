import jsonwebtoken from "jsonwebtoken";


export function GetUserType(){

    const token = localStorage.getItem("Token");

    var decoded = jsonwebtoken.decode(token)
    return decoded
}