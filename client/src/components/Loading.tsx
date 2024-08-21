import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import COLORS from '../constants/colors';

const Loading = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="small" color={COLORS.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 2,
  },
});
export default Loading;
