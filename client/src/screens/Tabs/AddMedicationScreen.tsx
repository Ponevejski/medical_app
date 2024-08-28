import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import COLORS from '../../constants/colors';
import {RootStackParamList} from '../../interfaces';
import {useAddMedicationMutation} from '../../services/mutations';

type FormData = {
  name: string;
  description: string;
  count: number;
  destination_count: number;
};

const AddMedicationScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const mutation = useAddMedicationMutation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await mutation.mutateAsync(data);

      navigation.navigate('Dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add Medication</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.form}>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
            rules={{required: 'Name is required'}}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
            rules={{required: 'Description is required'}}
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description.message}</Text>
          )}

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Count"
                keyboardType="numbers-and-punctuation"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value?.toString()} // Convert number to string for TextInput
              />
            )}
            name="count"
            rules={{required: 'Count is required'}}
          />
          {errors.count && (
            <Text style={styles.error}>{errors.count.message}</Text>
          )}

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Destination Count"
                keyboardType="numbers-and-punctuation"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value?.toString()} // Convert number to string for TextInput
              />
            )}
            name="destination_count"
            rules={{required: 'Destination count is required'}}
          />
          {errors.destination_count && (
            <Text style={styles.error}>{errors.destination_count.message}</Text>
          )}

          <Button
            onPress={handleSubmit(onSubmit)}
            title="Add Medication"
            isLoading={mutation.isPending}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    margin: 16,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  error: {
    color: COLORS.red,
    marginBottom: 10,
  },
});

export default AddMedicationScreen;
