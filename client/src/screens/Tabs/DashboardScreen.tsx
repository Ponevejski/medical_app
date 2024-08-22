import {faAdd} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import medicationList from '../../helpers/medicationsList';
import {RootStackParamList} from '../../interfaces';
import {useMedicationsQuery} from '../../services/queries';
import MedicationItem from './components/MedicationItem';

const DashboardScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {data: medications, isLoading} = useMedicationsQuery();

  const navigateToAddMedication = () => {
    navigation.navigate('AddMedication');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
        <TouchableOpacity onPress={navigateToAddMedication}>
          <FontAwesomeIcon size={24} icon={faAdd} color="black" />
        </TouchableOpacity>
      </View>

      {isLoading && <ActivityIndicator size="large" color={COLORS.blue} />}

      {medications?.length ? (
        <FlatList
          data={medicationList(medications)}
          renderItem={({item}) => <MedicationItem item={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.errorText}>No data found</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default DashboardScreen;
