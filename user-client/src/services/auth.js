import Axios from "../utils/Axios"
import jwt_decode from "jwt-decode"

export const login = async function(email, password){
    const data = {
        email: email,
        password: password
    }
    try{
        const ret = await Axios.post('/users/auth', data);
        const decoded = jwt_decode(ret.data);
        console.log(decoded)
        window.localStorage.setItem('role', decoded.role.authority);
        window.localStorage.setItem('jwt', ret.data);
    }catch(error){
        console.log(error);
    }
    
    window.location.assign("/");
    
    
}

export const logout = function(){
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('role');
    window.location.assign("/");
}
