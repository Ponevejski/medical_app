import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {isAxiosError} from 'axios';
import COLORS from '../constants/colors';
import toast from '../helpers/toast';
import {User} from '../interfaces';
import api from './api';

type Navigation = NavigationProp<ParamListBase>;
type SignIn = Pick<User, 'email' | 'password'>;

export const useLoginMutation = () => {
  const navigation = useNavigation<Navigation>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignIn) => {
      return (await api.post('/login', data)).data;
    },
    onSuccess: async data => {
      await AsyncStorage.setItem('token', data.sessionToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      await AsyncStorage.setItem('username', data.user.name);

      toast('Login successful', COLORS.green);

      queryClient.invalidateQueries({
        queryKey: ['medications'],
      }); // Invalidate the medications query

      navigation.navigate('Tabs');
    },
    onError: error => {
      // Check if the error is an AxiosError
      if (isAxiosError(error) && error.response) {
        // Log the specific error message from the response
        toast(error.response.data.message, COLORS.red);
      } else {
        // Handle other types of errors
        toast(
          'An unexpected error occurred. Please try again later.',
          COLORS.red,
        );
      }
    },
  });
};

export const useSignUpMutation = () => {
  const navigation = useNavigation<Navigation>();
  return useMutation({
    mutationFn: async (data: User) => {
      return (await api.post('/signup', data)).data;
    },
    onSuccess: () => {
      toast('User successfully created', COLORS.green);

      navigation.navigate('Login');
    },
    onError: error => {
      // Check if the error is an AxiosError
      if (isAxiosError(error) && error.response) {
        // Log the specific error message from the response
        toast(error.response.data.message, COLORS.red);
      } else {
        // Handle other types of errors
        toast(
          'An unexpected error occurred. Please try again later.',
          COLORS.red,
        );
      }
    },
  });
};

export const useAddMedicationMutation = () => {
  const navigation = useNavigation<Navigation>();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      return (
        await api.post('/medications', {
          ...data,
          count: Number(data.count),
          destination_count: Number(data.destination_count),
        })
      ).data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['medications'],
      });

      toast('Medication successfully added', COLORS.green);

      navigation.navigate('Dashboard');
    },
    onError: error => {
      // Check if the error is an AxiosError
      if (isAxiosError(error) && error.response) {
        // Log the specific error message from the response
        toast(error.response.data.message, COLORS.red);
      } else {
        // Handle other types of errors
        toast(
          'An unexpected error occurred. Please try again later.',
          COLORS.red,
        );
      }
    },
  });
};

export const useDeleteMedication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return (await api.delete(`/medications/${id}`)).data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['medications'],
      });

      toast('Medication deleted', COLORS.green);
    },
    onError: error => {
      // Check if the error is an AxiosError
      if (isAxiosError(error) && error.response) {
        // Log the specific error message from the response
        toast(error.response.data.message, COLORS.red);
      } else {
        // Handle other types of errors
        toast(
          'An unexpected error occurred. Please try again later.',
          COLORS.red,
        );
      }
    },
  });
};

export const useUpdateMedication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      return (
        await api.put(`/medications/${data.id}`, {
          ...data,
          count: Number(data.count),
          destination_count: Number(data.destination_count),
        })
      ).data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['medications'],
      });

      toast('Medication updated', COLORS.green);
    },
    onError: error => {
      // Check if the error is an AxiosError
      if (isAxiosError(error) && error.response) {
        // Log the specific error message from the response
        toast(error.response.data.message, COLORS.red);
      } else {
        // Handle other types of errors
        toast(
          'An unexpected error occurred. Please try again later.',
          COLORS.red,
        );
      }
    },
  });
};

export const useUpdateMedicationCount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      return (
        await api.put(`/medications/${data.id}/count`, {
          ...data,
          count: Number(data.count),
          destination_count: Number(data.destination_count),
        })
      ).data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['medications'],
      });

      toast('Medication count updated', COLORS.green);
    },
    onError: error => {
      // Check if the error is an AxiosError
      if (isAxiosError(error) && error.response) {
        // Log the specific error message from the response
        toast(error.response.data.message, COLORS.red);
      } else {
        // Handle other types of errors
        toast(
          'An unexpected error occurred. Please try again later.',
          COLORS.red,
        );
      }
    },
  });
};
