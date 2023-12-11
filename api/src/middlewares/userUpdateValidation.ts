import { body } from 'express-validator'
import { UserModel } from '../v1/models/User'

const isUniqueEmail = async (value: string, { req }: { req: any }) => {
    const user = await UserModel.findOne({ email: value, _id: { $ne: req.params.id } })
    if (user) {
        return Promise.reject('The email already exists')
    }
}

const requiredIfCoordinatesIsEmpty = (value: string, { req }: { req: any }) => {
    const coordinates: number[] = req.body.location.coordinates
    if (!value && (!coordinates || coordinates.length === 0)) {
        throw new Error('Address is required if coordinates is empty')
    }

    return true
}

const requiredIfAddressIsEmpty = (value: string, { req }: { req: any }) => {
    const address: string = req.body.address
    if ((!value || value.length === 0) && !address) {
        throw new Error('Coordinates is required if address is empty')
    }

    return true
}

const isAddressOrCoordinates = (value: string, { req }: { req: any }) => {
    const address: string = req.body.address
    const coordinates: number[] = req.body.location.coordinates

    if ((address && coordinates && coordinates.length > 0) || (!address && (!coordinates || coordinates.length === 0))) {
        throw new Error('Either address or coordinates should exist, not both')
    }

    return true
}

export const userUpdateValidation = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('The name is mandatory')
            .isString()
            .withMessage('The name must be a string'),
        body('email')
            .notEmpty()
            .withMessage('The email is mandatory')
            .isEmail()
            .withMessage('The email must be valid')
            .custom(isUniqueEmail),
        body('address')
            .custom(requiredIfCoordinatesIsEmpty),
        body('location.coordinates')
            .custom(requiredIfAddressIsEmpty),
        body('location.type')
            .equals('Point')
            .withMessage('Type must be "Point"'),
        body()
            .custom(isAddressOrCoordinates)

    ]
}