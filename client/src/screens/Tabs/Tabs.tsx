import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faPerson} from '@fortawesome/free-solid-svg-icons/faPerson';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import COLORS from '../../constants/colors';
import DashboardScreen from './DashboardScreen';
import ProfileScreen from './ProfileScreen';

// Create a Tab Navigator
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          height: 84,
          borderColor: COLORS.lightGray,
          borderTopWidth: 1,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon size={28} icon={faList} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon size={28} icon={faPerson} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
