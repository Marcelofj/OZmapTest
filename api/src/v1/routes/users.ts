import { Router } from 'express'
import { createUser, findUsers, findUser, updateUser, deleteUser } from '../controllers/usersController'
import { userCreateValidation } from '../../middlewares/userCreateValidation'
import { userUpdateValidation } from '../../middlewares/userUpdateValidation'
import { validate } from '../../middlewares/handleValidation'

const router: Router = Router()

export default router
    .post('/users', userCreateValidation(), validate, createUser)
    .get('/users', findUsers)
    .get('/users/:id', findUser)
    .patch('/users/:id', userUpdateValidation(), validate, updateUser)
    .delete('/users/:id', deleteUser)