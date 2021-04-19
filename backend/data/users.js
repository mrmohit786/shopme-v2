import bcrypt from 'bcryptjs';

const users = [
  {
    _id: '607bef4245b52540a39ca483',
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('11223344', 10),
    isAdmin: true,
    isActive: true,
  },
  {
    _id: '607bef4245b52540a39ca485',
    name: 'Mohit Patel',
    email: 'mohit@gmail.com',
    password: bcrypt.hashSync('11223344', 10),
    isAdmin: true,
  },
];

export default users;
