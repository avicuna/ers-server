import { connectionPool } from "../util/connection-util";
import { Reimb } from "../model/reimb";
import {reimbConverter} from "../util/reimb-converter";

/**
 * Retreive all movies from the database
 */
export async function findAll(): Promise<any> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            'SELECT * FROM ers_app.reimbursements INNER JOIN ers_app.users ON reimbursements.reimb_author = users.user_id WHERE reimbursements.reimb_status_id = 1');
        return resp.rows;
    } finally {
        client.release();
    }
}

export async function findById(id: number): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM ers_app.reimbursements WHERE reimb_author = ${id}`
        )
        return resp.rows.map(reimbConverter);
    } finally {
        client.release();
    }
}

/**
 * Add a new movie to the DB
 * @param movie
 */
export async function createReimb(reimb): Promise<number> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `INSERT INTO ers_app.reimbursements 
        (reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING reimb_id`, [reimb.reimbAmount, reimb.reimbSubmitted, reimb.reimbDescription, reimb.reimbAuthor, 1, reimb.reimbTypeId]);
        return resp.rows[0].reimb_id;
    } finally {
        client.release();
    }
}

export async function acceptReimb(resolved, id, managerId) {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(`
        UPDATE ers_app.reimbursements SET reimb_resolved = $1, reimb_resolver = $2, reimb_status_id = 2 
        WHERE reimb_id = $3`, [resolved, managerId, id]
        )
        return resp.rows;
    } finally {
        client.release();
    }
}

export async function denyReimb(resolved, id, managerId) {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(`
        UPDATE ers_app.reimbursements SET reimb_resolved = $1, reimb_resolver = $2, reimb_status_id = 3 
        WHERE reimb_id = $3`, [resolved, managerId, id]
        )
        return resp.rows;
    } finally {
        client.release();
    }
}
