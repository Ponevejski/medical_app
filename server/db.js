import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
	user: 'pony',
	password: 'postgres',
	host: 'db',
	port: 5432,
	database: 'medical_api',
});

export default pool;
