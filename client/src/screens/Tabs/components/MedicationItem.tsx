import {faPen, faRemove} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Loading from '../../../components/Loading';
import {useDeleteMedication} from '../../../services/mutations';
import EditItemCount from './EditItemCount';
import EditItemModal from './EditItemModal';

const MedicationItem = ({item}: {item: any}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mutation = useDeleteMedication();

  const handleDelete = async () => {
    await mutation.mutateAsync(item.id);
  };

  const handleEdit = () => setIsModalOpen(!isModalOpen);

  const isFulfilled = item.count === item.destination_count;

  if (mutation.isPending) {
    return <Loading />;
  }

  return (
    <View style={[styles.container, isFulfilled && styles.fulfilledContainer]}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>

        <EditItemModal
          item={item}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        <View style={styles.itemActions}>
          <TouchableOpacity onPress={handleEdit}>
            <FontAwesomeIcon size={20} icon={faPen} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete}>
            <FontAwesomeIcon size={24} icon={faRemove} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <EditItemCount item={item} hideIncrement={isFulfilled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
  fulfilledContainer: {
    backgroundColor: '#d1ffd1', // Light green background for fulfilled medications
  },
  itemContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
});

export default MedicationItem;
