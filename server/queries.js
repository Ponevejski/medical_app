// medications queries

export const createMedicationQuery = `
INSERT INTO "medications" (name, description, count, destination_count, user_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
`;

export const getUserMedicationsQuery = `
SELECT * FROM "medications"
WHERE user_id = $1
`;

export const updateMedicationQuery = `
UPDATE "medications"
SET name = $1, description = $2, count = $3, destination_count = $4
WHERE id = $5 AND user_id = $6
RETURNING *;
`;

export const updateMedicationCountQuery = `
UPDATE "medications"
SET count = COALESCE($1, count), destination_count = COALESCE($2, destination_count)
WHERE id = $3 AND user_id = $4
RETURNING *;
`;

export const currentMedicationQuery = `SELECT * FROM "medications" WHERE id = $1 AND user_id = $2`;

export const getMedicationQuery = `
SELECT * FROM "medications"
WHERE id = $1
`;

export const deleteMedicationQuery = `
DELETE FROM "medications"
WHERE id = $1
`;

// user queries

export const createUserQuery = `
INSERT INTO "users" (name, email, password)
VALUES ($1, $2, $3)
RETURNING *;
`;

export const loginUserQuery = `
SELECT * FROM "users" WHERE email = $1;
`;

export const getUserQuery = `SELECT * FROM "users" WHERE id = $1`;
