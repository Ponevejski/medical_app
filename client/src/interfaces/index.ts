import {NavigationProp, ParamListBase} from '@react-navigation/native';

export type Navigation = NavigationProp<ParamListBase>;

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  Dashboard: undefined;
  AddMedication: undefined;
};

export type User = {
  name: string;
  email: string;
  password: string;
  sessionToken?: string;
  refreshToken?: string;
};
