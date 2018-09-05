import { connectionPool } from "../util/connection-util";
import { User } from "../model/user";
import { userConverter } from "../util/user-converter";


/**
 * Add a new user to the DB
 * @param user
 */
export async function create(user: User): Promise<number> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `INSERT INTO ers_app.users 
        (username, pass, first_name, last_name, email, user_role_id)
        VALUES ($1, $2, $3, $4, $5, 1) 
        RETURNING user_id`, [user.username, user.password, user.firstName, user.lastName, user.email]);
        return resp.rows[0].user_id;
    } finally {
        client.release();
    }
}

/**
 * Retreive a single user by username and password, will also retreive all of that users movies
 * @param id
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM ers_app.users u
        WHERE u.username = $1
        AND u.pass = $2`, [username, password]);
        if(resp.rows.length !== 0) {
            return userConverter(resp.rows[0]); // get the user data from first row
        }
        return null;
    } finally {
        client.release();
    }
}