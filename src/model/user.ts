export class User {
    id = 0;
    username = '';
    password = '';
    firstName = '';
    lastName = '';
    email = '';
    userRoleId = 0;

    constructor(id?: number, username?: string, password?: string, firstName?: string,
                lastName?: string, email?: string, userRoleId?: number) {
        id && (this.id = id);
        username && (this.username = username);
        password && (this.password = password);
        firstName && (this.firstName = firstName);
        lastName && (this.lastName = lastName);
        email && (this.email = email);
        userRoleId && (this.userRoleId = userRoleId);
    }
}