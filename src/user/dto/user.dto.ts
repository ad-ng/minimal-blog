export class UserDto{
    name: string
    email: string
    password: string
    phoneNumber: string
    role: Roles
}
enum Roles{
    admin,
    author
}