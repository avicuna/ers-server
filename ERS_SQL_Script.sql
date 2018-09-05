set schema 'ers_app';

DROP TABLE users CASCADE;
DROP TABLE reimbursement_status CASCADE;
DROP TABLE reimbursement_type CASCADE;
DROP TABLE user_roles CASCADE;
DROP TABLE reimbursements CASCADE;

CREATE TABLE user_roles(
	user_role_id SERIAL PRIMARY KEY,
	user_role VARCHAR(10) NOT NULL
);

CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	pass VARCHAR(50) NOT NULL,
	firstname VARCHAR(100) NOT NULL,
	lastname VARCHAR(100),
	email VARCHAR(150),
	user_role_id INTEGER REFERENCES user_roles(user_role_id)
);

CREATE TABLE reimbursement_status(
	reimb_status_id SERIAL PRIMARY KEY,
	reimb_status VARCHAR(10)
);

CREATE TABLE reimbursement_type(
	reimb_type_id SERIAL PRIMARY KEY,
	reimb_type VARCHAR(10)
);

CREATE TABLE reimbursements(
	reimb_id SERIAL PRIMARY KEY,
	reimb_amount INTEGER,
	reimb_submitted VARCHAR(50),
	reimb_resolved VARCHAR(50),
	reimb_description VARCHAR(250),
	reimb_author INTEGER REFERENCES users(user_id),
	reimb_resolver INTEGER REFERENCES users(user_id),
	reimb_status_id INTEGER REFERENCES reimbursement_status(reimb_status_id),
	reimb_type_id INTEGER REFERENCES reimbursement_type(reimb_type_id)
);


