import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    isActive: true,
  },
  {
    name: 'Test Account',
    email: 'test@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isActive: true,
  },
  {
    name: 'Mohit Patel',
    email: 'mohit@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
];

export default users;
