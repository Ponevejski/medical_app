import {API_ANDROID, API_IOS} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Platform} from 'react-native';

const API = Platform.select({ios: API_IOS, android: API_ANDROID});

const api = axios.create({
  baseURL: API,
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await AsyncStorage.getItem('refreshToken');

      try {
        const response = await api.post('/refresh-token', {refreshToken});
        const {sessionToken} = response.data;

        await AsyncStorage.setItem('token', sessionToken);

        originalRequest.headers['Authorization'] = `Token ${sessionToken}`;

        return api.request(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
