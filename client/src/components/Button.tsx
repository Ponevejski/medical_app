import React, {FC} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../constants/colors';

type Props = {
  title: string;
  isLoading?: boolean;
  onPress: () => void;
};

const Button: FC<Props> = ({title, isLoading, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.primary} />
      ) : (
        <Text>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default Button;
