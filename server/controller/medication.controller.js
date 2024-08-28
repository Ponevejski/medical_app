import db from '../db.js';
import {
	createMedicationQuery,
	currentMedicationQuery,
	deleteMedicationQuery,
	getMedicationQuery,
	getUserMedicationsQuery,
	updateMedicationCountQuery,
	updateMedicationQuery,
} from '../queries.js';

export const createMedication = async (req, res) => {
	const { name, description, count = 0, destination_count = 0 } = req.body;
	const { id } = req.user;

	if (!name || !description) {
		return res
			.status(400)
			.json({ message: 'Name and description are required.' });
	}

	if (typeof count !== 'number' || count < 0) {
		return res
			.status(400)
			.json({ message: 'Count must be a non-negative number.' });
	}

	if (typeof destination_count !== 'number' || destination_count < 0) {
		return res
			.status(400)
			.json({ message: 'Destination count must be a non-negative number.' });
	}

	try {
		const medication = await db.query(createMedicationQuery, [
			name,
			description,
			count,
			destination_count,
			id,
		]);
		res.status(201).json(medication.rows[0]);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'An error occurred while creating the medication.' });
	}
};

export const getUserMedications = async (req, res) => {
	try {
		const medications = await db.query(getUserMedicationsQuery, [req.user.id]);

		if (medications.rows.length === 0) {
			return res
				.status(404)
				.json({ message: 'No medications found for this user.' });
		}

		res.status(200).json(medications.rows);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'An error occurred while getting the medications.' });
	}
};

export const updateMedication = async (req, res) => {
	const { id } = req.params;
	const { id: userId } = req.user;
	const { name, description, count, destination_count } = req.body;

	if (
		!name &&
		!description &&
		count === undefined &&
		destination_count === undefined
	) {
		return res
			.status(400)
			.json({ message: 'At least one field must be updated.' });
	}

	if (count !== undefined && (typeof count !== 'number' || count < 0)) {
		return res
			.status(400)
			.json({ message: 'Count must be a non-negative number.' });
	}

	if (
		destination_count !== undefined &&
		(typeof destination_count !== 'number' || destination_count < 0)
	) {
		return res
			.status(400)
			.json({ message: 'Destination count must be a non-negative number.' });
	}

	try {
		const medication = await db.query(updateMedicationQuery, [
			name,
			description,
			count,
			destination_count,
			id,
			userId,
		]);

		if (medication.rows.length === 0) {
			return res
				.status(404)
				.json({ message: 'Medication not found for this user.' });
		}

		res.status(200).json(medication.rows[0]);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'An error occurred while updating the medication.' });
	}
};

export const updateMedicationCount = async (req, res) => {
	const { id } = req.params;
	const { id: userId } = req.user;
	const { count, destination_count } = req.body;

	try {
		// Fetch the current medication details
		const currentMedication = await db.query(currentMedicationQuery, [
			id,
			userId,
		]);

		if (currentMedication.rows.length === 0) {
			return res
				.status(404)
				.json({ message: 'Medication not found for this user.' });
		}

		// Validate count and destination_count
		if (count !== undefined && (typeof count !== 'number' || count < 0)) {
			return res
				.status(400)
				.json({ message: 'Count must be a non-negative number.' });
		}

		if (
			destination_count !== undefined &&
			(typeof destination_count !== 'number' || destination_count < 0)
		) {
			return res
				.status(400)
				.json({ message: 'Destination count must be a non-negative number.' });
		}

		// Update the count and/or destination_count
		const updatedMedication = await db.query(updateMedicationCountQuery, [
			count,
			destination_count,
			id,
			userId,
		]);

		res.status(200).json(updatedMedication.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'An error occurred while updating the medication count.',
		});
	}
};

export const deleteMedication = async (req, res) => {
	const { id } = req.params;

	// Check if the medication ID is provided
	if (!id) {
		return res.status(400).json({ message: 'Medication ID is required.' });
	}

	try {
		// First, check if the medication exists
		const medication = await db.query(getMedicationQuery, [id]);

		// If the medication does not exist, return a 404 response
		if (medication.rows.length === 0) {
			return res.status(404).json({ message: 'Medication not found.' });
		}

		// If it exists, proceed to delete it
		await db.query(deleteMedicationQuery, [id]);

		// Return a success response
		res.status(200).json({ message: 'Medication deleted successfully.' });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'An error occurred while deleting the medication.' });
	}
};

export const getMedication = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({ message: 'Medication ID is required.' });
	}

	try {
		const medication = await db.query(getMedicationQuery, [id]);

		if (medication.rows.length === 0) {
			return res.status(404).json({ message: 'Medication not found.' });
		}

		res.status(200).json(medication.rows[0]);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'An error occurred while getting the medication.' });
	}
};
