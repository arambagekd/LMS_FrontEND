import axios from "axios"; 
import Cookies from "js-cookie";


const token =Cookies.get('jwt');

const axioinstance = axios.create(
  
  {
  baseURL : 'https://ac89-212-104-231-166.ngrok-free.app/api/',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': "application/json",
  }, 
  timeout: 2000,
});

// axioinstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('jwt');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

 export default axioinstance;    