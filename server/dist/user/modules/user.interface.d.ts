interface User {
    mobile: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}
interface UserId {
    id: string;
}
interface UpdateUser {
    mobile: string;
    newMobile: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}
interface ILogin {
    mobile: string;
    password: string;
}
export { User, UserId, UpdateUser, ILogin };
