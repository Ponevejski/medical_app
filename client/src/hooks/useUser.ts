import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const useUser = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [usernameValue, tokenValue] = await Promise.all([
          AsyncStorage.getItem('token'),
          AsyncStorage.getItem('refreshToken'),
          AsyncStorage.getItem('username'),
        ]);

        setUsername(usernameValue);
        setRefreshToken(tokenValue);
        setToken(tokenValue);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return {username, token, refreshToken, loading};
};

export default useUser;
