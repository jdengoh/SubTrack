import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  // Handle fetching user profile logic here
  res.send({ message: 'GET all users' });
});

userRouter.get('/:id', (req, res) => {
  // Handle fetching user profile logic here
  res.send({ message: `GET User with ID: ${req.params.id}` });
});

userRouter.post('/', (req, res) => {
  // Handle creating a new user profile logic here
  res.send({ message: 'CREATE new user' });
});

userRouter.put('/:id', (req, res) => {
  // Handle updating user profile logic here
  res.send({ message: `UPDATE User with ID: ${req.params.id}` });
});

userRouter.delete('/:id', (req, res) => {
  // Handle deleting user profile logic here
  res.send({ message: `DELETE User with ID: ${req.params.id}` });
});

export default userRouter;
