import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import userQueries from 'src/sql/userQueries';
import getQueryAndObjectValues from 'src/utils/QueryUtil';
import { Connection } from 'typeorm';
import { UpdateUser, User, UserId } from '../modules/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getUserById(userId: UserId) {
    const [currentUserQuery, parameters] = getQueryAndObjectValues(
      userQueries.userByMobile,
      userId,
    );
    const [currentUser] = await this.connection.query(
      currentUserQuery as string,
      parameters as any[],
    );
    return currentUser as User;
  }

  async register(user: User) {
    const hashPassword = await argon2.hash(user.password);
    user.password = hashPassword;
    const [createUserQuery, parameters] = getQueryAndObjectValues(
      userQueries.createUser,
      user,
    );
    return await this.connection.query(
      createUserQuery as string,
      parameters as any[],
    );
  }

  async edit(user: UpdateUser) {
    const [editUserQuery, parameters] = getQueryAndObjectValues(
      userQueries.editUser,
      user,
    );
    return await this.connection.query(
      editUserQuery as string,
      parameters as any[],
    );
  }

  async delete(userId: UserId) {
    const [deleteUserQuery, parameters] = getQueryAndObjectValues(
      userQueries.deleteUser,
      userId,
    );
    return await this.connection.query(
      deleteUserQuery as string,
      parameters as any[],
    );
  }
}
