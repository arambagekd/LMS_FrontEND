import axios from "axios"; 


const axioinstance = axios.create(
  {
  baseURL : 'https://easylibrowebapi.azurewebsites.net/api/',
  headers: {
    'Content-Type': "application/json",
  }, 
  
});

axioinstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axioinstance;    