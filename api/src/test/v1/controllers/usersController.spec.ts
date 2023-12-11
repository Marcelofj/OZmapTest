import { Request, Response } from 'express'
import { UserModel } from '../../../v1/models/User'
import STATUS_CODE from '../../../enums/httpStatusCodes'
import { createUser, findUsers, findUser, updateUser, deleteUser } from '../../../v1/controllers/usersController'
import {
    userWithAddress,
    userWithCoordinates,
    addressToGenerateCoordinates,
    coordinatesToGenerateAddress,
    users,
    user
} from '../../mocks/usersControllerMock'

jest.mock('../../../v1/models/User')

const mockedUserModel = UserModel as jest.Mocked<typeof UserModel>

describe('usersController controller', () => {
    let req: Request
    let res: Response

    beforeEach(() => {
        req = {
            params: {
                id: '123456789'
            },
            body: {}

        } as unknown as Request

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response

    })

    describe('createUser controller', () => {

        it('should create a user with an address', async () => {

            mockedUserModel.create.mockResolvedValueOnce(addressToGenerateCoordinates)

            req.body = userWithAddress

            await createUser(req, res)

            expect(UserModel.create).toHaveBeenCalledWith(addressToGenerateCoordinates)
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.created)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(addressToGenerateCoordinates))
        })

        it('should create a user with coordinates', async () => {

            mockedUserModel.create.mockResolvedValueOnce(coordinatesToGenerateAddress)

            req.body = userWithCoordinates

            await createUser(req, res)

            expect(UserModel.create).toHaveBeenCalledWith(coordinatesToGenerateAddress)
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.created)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(coordinatesToGenerateAddress))
        })

        it('should return a 500 error', async () => {

            mockedUserModel.create.mockRejectedValueOnce(new Error('Internal Server Error'))

            req.body = userWithAddress

            await createUser(req, res)

            expect(UserModel.create).toHaveBeenCalledWith(addressToGenerateCoordinates)
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.internalServerError)
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
        })
    })

    describe('findUsers controller', () => {

        it('should return all users', async () => {

            mockedUserModel.find.mockResolvedValue(users)

            await findUsers(req, res)

            expect(UserModel.find).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.ok)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(users))
        })

        it('should return a 500 error', async () => {

            mockedUserModel.find.mockRejectedValue(new Error('Internal Server Error'))

            await findUsers(req, res)

            expect(UserModel.find).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.internalServerError)
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })

        })

    })

    describe('findUser controller', () => {

        it('should return one user', async () => {

            mockedUserModel.findOne.mockResolvedValue(user)

            await findUser(req, res)

            expect(UserModel.findOne).toHaveBeenCalledWith({ _id: '123456789' })
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.ok)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(user))
        })

        it('should return a 500 error', async () => {

            mockedUserModel.findOne.mockRejectedValue(new Error('Internal Server Error'))

            await findUser(req, res)

            expect(UserModel.findOne).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.internalServerError)
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })

        })

        it('should return a 400 error', async () => {

            mockedUserModel.findOne.mockResolvedValue(null)

            await findUser(req, res)

            expect(UserModel.findOne).toHaveBeenCalledWith({ _id: '123456789' })
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.badRequest)
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' })

        })

    })

    describe('updateUser controller', () => {

        it('should update a user with an address', async () => {

            mockedUserModel.findByIdAndUpdate.mockResolvedValueOnce(addressToGenerateCoordinates)

            req.body = userWithAddress

            await updateUser(req, res)

            expect(mockedUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
                '123456789',
                addressToGenerateCoordinates,
                { new: true }
            )
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.created)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(addressToGenerateCoordinates))
        })

        it('should update a user with coordinates', async () => {

            mockedUserModel.findByIdAndUpdate.mockResolvedValueOnce(coordinatesToGenerateAddress)

            req.body = userWithCoordinates

            await updateUser(req, res)

            expect(mockedUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
                '123456789',
                coordinatesToGenerateAddress,
                { new: true }
            )
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.created)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(coordinatesToGenerateAddress))
        })

        it('should return a 500 error', async () => {

            mockedUserModel.findByIdAndUpdate.mockRejectedValueOnce(new Error('Internal Server Error'))

            req.body = userWithAddress

            await updateUser(req, res)

            expect(mockedUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
                '123456789',
                addressToGenerateCoordinates,
                { new: true }
            )
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.internalServerError)
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
        })


    })

    describe('deleteUser controller', () => {

        it('should delete one user', async () => {

            mockedUserModel.findByIdAndDelete.mockResolvedValue(user)

            await deleteUser(req, res)

            expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith({ _id: '123456789' })
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.ok)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(user))
        })

        it('should return a 500 error', async () => {

            mockedUserModel.findByIdAndDelete.mockRejectedValue(new Error('Internal Server Error'))

            await deleteUser(req, res)

            expect(UserModel.findByIdAndDelete).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.internalServerError)
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })

        })

        it('should return a 400 error', async () => {

            mockedUserModel.findByIdAndDelete.mockResolvedValue(null)

            await deleteUser(req, res)

            expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith({ _id: '123456789' })
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.badRequest)
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' })

        })

    })
})