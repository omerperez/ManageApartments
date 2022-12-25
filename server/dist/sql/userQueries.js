"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login = `SELECT * FROM USERS WHERE MOBILE=:id AND PASSWORD=:password`;
const userByMobile = 'SELECT * FROM USERS WHERE MOBILE=:id';
const createUser = `INSERT INTO USERS ( 
        mobile, "firstName", "lastName", email, password 
    ) VALUES ( 
        :mobile, :firstName, :lastName, :email, :password 
        )`;
const editUser = `UPDATE USERS
    SET mobile=:newMobile, "firstName"=:firstName, "lastName"=:lastName, password=:password, email=$5 
    WHERE mobile = :mobile`;
const deleteUser = `DELETE FROM USERS WHERE mobile=:id`;
exports.default = { createUser, userByMobile, editUser, deleteUser, login };
//# sourceMappingURL=userQueries.js.map