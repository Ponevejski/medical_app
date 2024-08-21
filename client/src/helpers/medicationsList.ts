const medicationList = (
  medications: {
    count: number;
    destination_count: number;
    id: number;
    name: string;
    user_id: number;
  }[],
) => {
  // Sort medications to place fulfilled ones at the bottom
  const sortedMedications = medications.sort((a, b) => {
    const aFulfilled = a.count === a.destination_count;
    const bFulfilled = b.count === b.destination_count;

    if (aFulfilled && !bFulfilled) {
      return 1; // a is fulfilled, b is not, so a goes to the bottom
    }
    if (!aFulfilled && bFulfilled) {
      return -1; // b is fulfilled, a is not, so b goes to the bottom
    }
    return 0; // Keep the original order if both are fulfilled or both are not
  });
  return sortedMedications;
};

export default medicationList;
