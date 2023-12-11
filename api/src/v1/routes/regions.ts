import { Router } from 'express'
import {
    createRegion,
    findRegions,
    findRegion,
    updateRegion,
    deleteRegion,
    findRegionsContainingPoint,
    findRegionsNearPoint
} from '../controllers/regionsController'

const router: Router = Router()

export default router
    .post('/regions', createRegion)
    .get('/regions', findRegions)
    .get('/regions/:id', findRegion)
    .patch('/regions/:id', updateRegion)
    .delete('/regions/:id', deleteRegion)
    .post('/regions/point', findRegionsContainingPoint)
    .post('/regions/near-point', findRegionsNearPoint)