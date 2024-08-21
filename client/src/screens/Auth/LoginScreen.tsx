import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
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
import {useLoginMutation} from '../../services/mutations';

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const mutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    getValues,
    formState: {errors},
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };

  const isAdmin = watch('email')?.toLowerCase() === 'admin@gmail.com';

  useEffect(() => {
    if (isAdmin) {
      clearErrors('password');
    }
  }, [getValues, clearErrors, isAdmin]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Log In</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.form}>
        <View>
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
            rules={{
              required: 'Password is required',
              pattern: !isAdmin
                ? /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                : undefined,
            }}
          />
          {errors.password && (
            <View>
              {errors.password.type === 'pattern' ? (
                <Text style={styles.error}>Invalid password format.</Text>
              ) : (
                <Text style={styles.error}>This field is required.</Text>
              )}
            </View>
          )}

          <Button
            onPress={handleSubmit(onSubmit)}
            title="Sign In"
            isLoading={mutation.isPending}
          />

          <View style={styles.bottomText}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={navigateToSignUpScreen}>
              <Text style={styles.link}> Sign Up</Text>
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

export default LoginScreen;
