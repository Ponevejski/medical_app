import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import COLORS from '../../constants/colors';
import {RootStackParamList} from '../../interfaces';
import {useSignUpMutation} from '../../services/mutations'; // Adjust the import to your service

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUpScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const mutation = useSignUpMutation(); // Use your sign-up mutation hook

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await mutation.mutateAsync(data);
      // Optionally navigate to the Login screen or Dashboard after successful sign-up
      navigation.navigate('Login'); // Adjust as necessary
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToLoginScreen = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
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
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
            rules={{required: 'Email is required'}}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
            rules={{required: 'Password is required'}}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          <Button
            onPress={handleSubmit(onSubmit)}
            title="Sign Up"
            isLoading={mutation.isPending}
          />

          <View style={styles.bottomText}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={navigateToLoginScreen}>
              <Text style={styles.link}> Log In</Text>
            </TouchableOpacity>
          </View>
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
  link: {
    color: COLORS.primary,
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SignUpScreen;
