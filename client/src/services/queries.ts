import {useQuery} from '@tanstack/react-query';
import api from './api';

export const useMedicationsQuery = () => {
  return useQuery({
    queryKey: ['medications'],
    queryFn: async () => {
      return (await api.get('/medications')).data;
    },
    refetchOnMount: 'always',
  });
};

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return (await api.get('/user')).data;
    },
  });
};
