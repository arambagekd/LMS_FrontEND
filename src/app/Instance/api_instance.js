import axios from "axios"; 
import Cookies from "js-cookie";


const token =Cookies.get('jwt');

const axioinstance = axios.create(
  
  {
  baseURL : 'https://4878-61-245-161-144.ngrok-free.app/api/',
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