// apiService.js

import axios from 'axios';
import Cookies from 'js-cookie';

 // Replace with your backend API URL

const apiService = axios.create({
  baseURL: 'https://easylibrowebapi.azurewebsites.net/api/Notification/',
  headers: {
    'Content-Type': 'application/json'
  }
});



export const firebaseauth = {

  setFirebasetoken: async (token, userName) => {
    try {
      const response = await apiService.post(`SetFireBaseToken`, 
        {
          token:token,
          userName:userName
        }
      );
    } catch (error) {
      throw error;
    }
  },
  removeFirebasetoken: async (token,userName) => {
    try {
      const response = await apiService.post(`RemoveFireBaseToken`,
        {token:token,
        userName:userName}
      );
    } catch (error) {
      throw error;
    }
  }
};

export default apiService;
