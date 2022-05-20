import axios from 'axios';

var Axios = axios.create({
  baseURL: 'http://localhost:8080/api',
  /* other custom settings */
});

Axios.interceptors.request.use(
  function presretac(config){
    const jwt = window.localStorage['jwt']
    if(jwt){
      config.headers['Authorization']="Bearer " + jwt
    }
    return config;
  }
);
export default Axios;
