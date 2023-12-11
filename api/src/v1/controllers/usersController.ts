import { Request, Response } from 'express'
import { UserModel } from '../models/User'
import Logger from '../../config/logger'
import STATUS_CODE from '../../enums/httpStatusCodes'
import locationService from '../../services/locationService'

const createUser = async (req: Request, res: Response) => {
    const data = req.body
    const { address, location: { coordinates } } = req.body

    try {
        const getLocation = await locationService(address, coordinates)

        const user = await UserModel.create({
            ...data,
            address: getLocation.LocationAddress,
            location: {
                coordinates: getLocation.locationCoordinates
            }
        })
        console.log(user.location?.coordinates)
        return res.status(STATUS_CODE.created).json(user)

    } catch (error: any) {
        Logger.error(error.message)
        res.status(STATUS_CODE.internalServerError).json({ error: error.message })
    }
}

const findUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find()

        return res.status(STATUS_CODE.ok).json(users)
    } catch (error: any) {
        Logger.error(error.message)
        res.status(STATUS_CODE.internalServerError).json({ error: 'Internal Server Error' })
    }
}

const findUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await UserModel.findOne({ _id: id })
        if (!user) {
            res.status(STATUS_CODE.badRequest).json({ message: 'User not found' })
        }
        return res.status(STATUS_CODE.ok).json(user)
    } catch (error: any) {
        Logger.error(error.message)
        res.status(STATUS_CODE.internalServerError).json({ error: 'Internal Server Error' })
    }
}

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body
    const { address, location: { coordinates } } = req.body

    try {
        const getLocation = await locationService(address, coordinates)

        const user = await UserModel.findByIdAndUpdate(
            id, {
            ...data,
            address: getLocation.LocationAddress,
            location: {
                coordinates: getLocation.locationCoordinates
            }
        },
            { new: true }
        )

        if (!user) {
            return res.status(STATUS_CODE.badRequest).json({ error: 'User not found' })
        }

        return res.status(STATUS_CODE.updated).json(user)

    } catch (error: any) {
        Logger.error(error.message)
        res.status(STATUS_CODE.internalServerError).json({ error: 'Internal Server Error' })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await UserModel.findByIdAndDelete({ _id: id })
        if (!user) {
            res.status(STATUS_CODE.badRequest).json({ message: 'User not found' })
        }
        return res.status(200).json(user)
    } catch (error: any) {
        Logger.error(error.message)
        res.status(STATUS_CODE.internalServerError).json({ error: 'Internal Server Error' })
    }
}

export {
    createUser,
    findUsers,
    findUser,
    updateUser,
    deleteUser
}