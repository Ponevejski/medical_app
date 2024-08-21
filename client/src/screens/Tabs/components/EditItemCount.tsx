import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useUpdateMedicationCount} from '../../../services/mutations';

const EditItemCount = ({
  item,
  hideIncrement,
}: {
  item: any;
  hideIncrement: boolean;
}) => {
  const [count, setCount] = useState(item.count);
  const [destinationCount, setDestinationCount] = useState(
    item.destination_count,
  );
  const mutation = useUpdateMedicationCount();

  useEffect(() => {
    setCount(item.count);
    setDestinationCount(item.destination_count);
  }, [item]);

  const handleIncrementCount = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await updateCounts(newCount, destinationCount);
  };

  const handleDecrementCount = async () => {
    const newCount = count > 0 ? count - 1 : 0; // Prevent negative values
    setCount(newCount);
    await updateCounts(newCount, destinationCount);
  };

  const handleIncrementDestinationCount = async () => {
    const newDestinationCount = destinationCount + 1;
    setDestinationCount(newDestinationCount);
    await updateCounts(count, newDestinationCount);
  };

  const handleDecrementDestinationCount = async () => {
    const newDestinationCount = destinationCount > 0 ? destinationCount - 1 : 0; // Prevent negative values
    setDestinationCount(newDestinationCount);
    await updateCounts(count, newDestinationCount);
  };

  const updateCounts = async (
    newCount: number,
    newDestinationCount: number,
  ) => {
    try {
      await mutation.mutateAsync({
        id: item.id,
        count: newCount,
        destination_count: newDestinationCount,
      });
    } catch (error) {
      console.error('Error updating counts:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Item Counts</Text>

      <View style={styles.counterContainer}>
        <Text style={styles.label}>Count: {count}</Text>
        <View style={styles.buttonGroup}>
          {!hideIncrement && (
            <Button title="+" onPress={handleIncrementCount} />
          )}
          <Button title="-" onPress={handleDecrementCount} />
        </View>
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.label}>Destination Count: {destinationCount}</Text>
        <View style={styles.buttonGroup}>
          <Button title="+" onPress={handleIncrementDestinationCount} />
          <Button title="-" onPress={handleDecrementDestinationCount} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
});

export default EditItemCount;
