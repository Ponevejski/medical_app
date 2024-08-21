import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';

type ModalProps = {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalComponent: FC<ModalProps> = ({
  isVisible = false,
  setIsVisible,
  children,
}) => {
  return (
    <Modal onBackdropPress={() => setIsVisible(false)} isVisible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalView: {
    height: '85%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    zIndex: 10,
  },
});

export default ModalComponent;
