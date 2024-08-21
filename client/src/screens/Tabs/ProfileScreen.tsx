import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loading from '../../components/Loading';
import COLORS from '../../constants/colors';
import {RootStackParamList} from '../../interfaces';
import {useUserQuery} from '../../services/queries';

const ProfileScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {data, isLoading} = useUserQuery();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{data?.name} Dashboard</Text>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 5,
    margin: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  errorText: {
    color: COLORS.black,
    textAlign: 'center',
    margin: 16,
  },
});

export default ProfileScreen;
