if (__DEV__) {
  require('./ReactotronConfig');
}

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {RootSiblingParent} from 'react-native-root-siblings';

import Loading from './src/components/Loading';
import useUser from './src/hooks/useUser';
import LoginScreen from './src/screens/Auth/LoginScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';

import AddMedicationScreen from './src/screens/Tabs/AddMedicationScreen';
import Tabs from './src/screens/Tabs/Tabs';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RootSiblingParent>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </RootSiblingParent>
  </QueryClientProvider>
);

const Navigator = (): React.JSX.Element => {
  const {token, refreshToken, loading} = useUser();

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack.Navigator
      initialRouteName={token && refreshToken ? 'Tabs' : 'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="AddMedication" component={AddMedicationScreen} />
    </Stack.Navigator>
  );
};

export default App;
