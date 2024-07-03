// apiService.js

import axioinstance from '@/app/Instance/api_instance';
import axios from 'axios';

const apiService = axios.create(
  {
  baseURL : 'https://easylibrowebapi.azurewebsites.net/api/',
  headers: {
    'Content-Type': "application/json",
  }, 

  
});

export const authService = {

  login: async (username, password) => {
    try {
      const response = await apiService.post('Auth/login', { 
        username:username,
        password:password
      });
      localStorage.setItem('jwt', response.data.accessToken);
      localStorage.setItem('refresh', response.data.refreshToken);
      return "Log in successfully";
    } catch (error) {
      throw error;
      
    }
  },


  refreshToken: async () => {
    console.log("refreshing token");
    const accessToken=  localStorage.getItem('jwt');
    const refreshToken= localStorage.getItem('refresh');
    try {
      const response = await apiService.post('Auth/refresh', { 
        accessToken: accessToken,
        refreshToken: refreshToken });
      localStorage.setItem( 'jwt',response.data.accessToken);
      localStorage.setItem('refresh', response.data.refreshToken);
    } catch (error) {
      throw error;
      
    }
  },

  logout: async () => {
      try {
        localStorage.removeItem('jwt');
        localStorage.removeItem('refresh');
      }catch (error) {
        throw error;
      }
  },

  getuser: async () => {
    try {
      const response1 = await axioinstance.post("User/GetMyData");
      const response2 =await axioinstance.post("User/GetEmail");
      return {user:response1.data,
               email:response2.data};
    } catch (error) {
      throw error;

    }
  },
  selectPatron: async (usertype) => {
    try {
      const response = await axioinstance.post( `Auth/selectusertype`, {userType:usertype});
      localStorage.setItem('jwt', response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default apiService;
