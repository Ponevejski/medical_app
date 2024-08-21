import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import ModalComponent from '../../../components/Modal';
import {useUpdateMedication} from '../../../services/mutations';

const EditItemModal = ({item, isModalOpen, setIsModalOpen}: any) => {
  const [count, setCount] = useState(item.count);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [destinationCount, setDestinationCount] = useState(
    item.destination_count,
  );

  const mutation = useUpdateMedication();

  const handleUpdate = async () => {
    await mutation.mutateAsync({
      id: item.id,
      name,
      description,
      count,
      destination_count: destinationCount,
    });

    setIsModalOpen(false); // Close the modal after updating
  };

  return (
    <ModalComponent isVisible={isModalOpen} setIsVisible={setIsModalOpen}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Edit Item</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Count"
          keyboardType="numbers-and-punctuation"
          value={String(count)}
          onChangeText={text => setCount(Number(text))}
        />

        <TextInput
          style={styles.input}
          placeholder="Destination Count"
          keyboardType="numbers-and-punctuation"
          value={String(destinationCount)}
          onChangeText={text => setDestinationCount(Number(text))}
        />

        <Button title="Update" onPress={handleUpdate} />
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default EditItemModal;
