import { Request, Response } from 'express'
import { UserModel } from '../models/User'
import { RegionModel } from '../models/Region'
import Logger from '../../config/logger'
import STATUS_CODE from '../../enums/httpStatusCodes'

const createRegion = async (req: Request, res: Response) => {
    try {
        const { location: {
            coordinates,
            type
        },
            name,
            user
        } = req.body

        const region = {
            location: {
                coordinates,
                type,
            },
            name,
            user
        }

        const newRegion = new RegionModel(region)

        const userObject = await UserModel.findById(user)

        if (!userObject) {
            return res.status(STATUS_CODE.notFound).json({ error: 'User not found.' })
        }

        userObject.regions.push(newRegion._id)

        await Promise.all([userObject.save(), newRegion.save()])

        Logger.info(newRegion)
        return res.status(STATUS_CODE.created).json(newRegion)
    } catch (error) {
        console.error(error)
        res.status(STATUS_CODE.internalServerError).json({ error: 'Internal Server Error' })
    }
}

const findRegions = async (req: Request, res: Response) => {
    try {
        const regions = await RegionModel.find()
        Logger.info(regions)

        return res.status(STATUS_CODE.ok).json(regions)
    } catch (error: any) {
        Logger.error(error.message)
        res.status(STATUS_CODE.internalServerError).json({ error: 'Internal Server Error' })
    }
}

const findRegion = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const region = await RegionModel.findOne({ _id: id })

        if (!region) {
            res.status(STATUS_CODE.notFound).json({ message: 'Region not found' })
        }

        Logger.info(region)
        return res.status(STATUS_CODE.ok).json(region)
    } catch (error: any) {
        Logger.error(error.message)
        res.status(STATUS_CODE.internalServerError).json({ error: 'Internal Server Error' })
    }
}

const updateRegion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { location:
            {
                coordinates,
                type
            },
            name,
            user
        } = req.body

        const region = {
            location: {
                coordinates,
                type,
            },
            name,
            user
        }

        const regionToUpdate = await RegionModel.findByIdAndUpdate(id, region, { new: true })

        if (!regionToUpdate) {
            return res.status(STATUS_CODE.notFound).json({ error: 'Region not found' })
        }

        const oldUserObject = await UserModel.findOne({ regions: id })

        if (!oldUserObject) {
            return res.status(STATUS_CODE.notFound).json({ error: 'Previous user not found.' })
        }

        const oldUserRegionIndex = oldUserObject.regions.indexOf(id)
        if (oldUserRegionIndex !== -1) {
            oldUserObject.regions.splice(oldUserRegionIndex, 1)
            await oldUserObject.save()
        }

        const newUserObject = await UserModel.findById(user)

        if (!newUserObject) {
            return res.status(STATUS_CODE.notFound).json({ error: 'New user not found.' })
        }

        newUserObject.regions.push(regionToUpdate._id)

        await newUserObject.save()

        Logger.info(regionToUpdate)
        return res.status(STATUS_CODE.updated).json(regionToUpdate)
    } catch (error: any) {
        Logger.error(error.message)
        res.status(STATUS_CODE.internalServerError).json({ error: 'Internal Server Error' })

    }
}

const deleteRegion = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const region = await RegionModel.findByIdAndDelete({ _id: id })
        if (!region) {
            res.status(STATUS_CODE.notFound).json({ message: 'Region not found' })
        }

        Logger.info(region)
        return res.status(STATUS_CODE.ok).json(region)
    } catch (error: any) {
        Logger.error(error.message)
        res.status(STATUS_CODE.internalServerError).json({ error: 'Internal Server Error' })
    }
}

const findRegionsContainingPoint = async (req: Request, res: Response) => {

    try {

        const { lat, lng } = req.body

        if (!lat || !lng) {
            return res.status(400).json({ error: 'Latitude and longitude are required.' })
        }

        const region = await RegionModel.findOne({
            'location': {
                '$geoIntersects': {
                    '$geometry': {
                        'coordinates': [lng, lat],
                        'type': 'Point'
                    }
                }
            }
        })

        return res.status(STATUS_CODE.created).json(region)

    } catch (error: any) {
        console.error(error)
        res.status(STATUS_CODE.internalServerError).json({ error: 'Distance calc error' })
    }

}

const findRegionsNearPoint = async (req: Request, res: Response) => {
    try {
        const { lat, lng, distance, userIdToExclude } = req.body

        if (!lat || !lng || !distance) {
            return res.status(STATUS_CODE.badRequest).json({ error: 'Latitude, longitude, distance are required.' })
        }

        const distanceInRadians = distance / 637100

        const regions = await RegionModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [lng, lat],
                        distanceInRadians
                    ]
                }
            },
            user: userIdToExclude ? { $ne: userIdToExclude } : { $ne: null },
        })

        return res.status(STATUS_CODE.created).json(regions)

    } catch (error: any) {
        console.error(error)
        res.status(STATUS_CODE.internalServerError).json({ error: 'Error listing regions near point.' })
    }
}

export {
    createRegion,
    findRegions,
    findRegion,
    updateRegion,
    deleteRegion,
    findRegionsContainingPoint,
    findRegionsNearPoint
}
