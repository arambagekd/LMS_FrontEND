import axios from "axios"; 



//const token =Cookies.get('jwt');
const axioinstance = axios.create(
  {
  baseURL : 'https://localhost:7174/api/',
  headers: {
    //'Authorization': `Bearer ${token}`,
    'Content-Type': "application/json",
   // 'timeout' : 1000,
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