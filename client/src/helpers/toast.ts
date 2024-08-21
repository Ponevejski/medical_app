import Toast from 'react-native-root-toast';
import COLORS from '../constants/colors';

const toast = (message: string, color: string) => {
  return Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    backgroundColor: color,
    textColor: COLORS.text,
    opacity: 0.8,
  });
};

export default toast;
