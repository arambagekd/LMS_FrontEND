// apiService.js

import axios from 'axios';
import Cookies from 'js-cookie';

 // Replace with your backend API URL

const apiService = axios.create({
  baseURL: 'https://lms20240616161754.azurewebsites.net/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const firebaseauth = {

  setFirebasetoken: async (token, userName) => {
    try {
      const response = await apiService.post(`Notification/SetFireBaseToken`, {token,userName});
    } catch (error) {
      throw error;
    }
  },
  removeFirebasetoken: async (token,userName) => {
    try {
      const response = await apiService.post(`Notification/RemoveFireBaseToken`,
        {token:token,
        userName:userName}
      );
    } catch (error) {
      throw error;
    }
  }
};

export default apiService;
