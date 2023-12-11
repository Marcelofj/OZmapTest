import { Request, Response } from 'express'
import { RegionModel } from '../../../v1/models/Region'
import { UserModel } from '../../../v1/models/User'
import STATUS_CODE from '../../../enums/httpStatusCodes'
import { createRegion, findRegions, findRegion, updateRegion, deleteRegion } from '../../../v1/controllers/regionsController'
import { regions, region } from '../../mocks/regionsControllerMock'

jest.mock('../../../v1/models/Region')
jest.mock('../../../v1/models/User')

const mockedRegionModel = RegionModel as jest.Mocked<typeof RegionModel>
const mockedUserModel = UserModel as jest.Mocked<typeof UserModel>

describe('regionsController controller', () => {
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

    describe('createRegion controller', () => {

        // it('should create a region and update user', async () => {
        //     const regionData = {
        //         location: {
        //             coordinates: [48.8582599, 2.2945006],
        //             type: 'Point',
        //         },
        //         name: 'Test Region',
        //         user: 'user123',
        //     };

        //     const mockedRegionModel = RegionModel as jest.Mocked<typeof RegionModel>;
        //     const mockedUserModel = UserModel as jest.Mocked<typeof UserModel>;

        //     // Configuração dos mocks
        //     mockedRegionModel.create.mockResolvedValueOnce(regionData as any);

        //     const userInstance = {
        //         _id: 'user123',
        //         regions: [],
        //         save: jest.fn().mockResolvedValueOnce({ _id: 'user123', regions: [] }),
        //     };
        //     mockedUserModel.findById.mockResolvedValueOnce(userInstance);

        //     // Execução da função
        //     req.body = regionData;
        //     await createRegion(req, res);

        //     // Verificações
        //     expect(mockedRegionModel.create).toHaveBeenCalledWith(regionData);
        //     expect(mockedUserModel.findById).toHaveBeenCalledWith('user123');
        //     expect(userInstance.save).toHaveBeenCalled();

        //     expect(res.status).toHaveBeenCalledWith(STATUS_CODE.created);
        //     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        //         _id: expect.any(String),
        //         location: {
        //             coordinates: [48.8582599, 2.2945006],
        //             type: 'Point',
        //         },
        //         name: 'Test Region',
        //         user: 'user123',
        //     }));
        // })

        // it('should return a 500 error', async () => {

        //     mockedUserModel.create.mockRejectedValueOnce(new Error('Internal Server Error'))

        //     req.body = userWithAddress

        //     await createUser(req, res)

        //     expect(UserModel.create).toHaveBeenCalledWith(addressToGenerateCoordinates)
        //     expect(res.status).toHaveBeenCalledWith(STATUS_CODE.internalServerError)
        //     expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
        // })
    })

    describe('findRegions controller', () => {

        it('should return all regions', async () => {

            mockedRegionModel.find.mockResolvedValue(regions)

            await findRegions(req, res)

            expect(RegionModel.find).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.ok)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(regions))
        })

        it('should return a 500 error', async () => {

            mockedRegionModel.find.mockRejectedValue(new Error('Internal Server Error'))

            await findRegions(req, res)

            expect(RegionModel.find).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.internalServerError)
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })

        })

    })

    describe('findRegion controller', () => {

        it('should return one region', async () => {

            mockedRegionModel.findOne.mockResolvedValue(region)

            await findRegion(req, res)

            expect(RegionModel.findOne).toHaveBeenCalledWith({ _id: '123456789' })
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.ok)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(region))
        })

        it('should return a 500 error', async () => {

            mockedRegionModel.findOne.mockRejectedValue(new Error('Internal Server Error'))

            await findRegion(req, res)

            expect(RegionModel.findOne).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.internalServerError)
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })

        })

        it('should return a 400 error', async () => {

            mockedRegionModel.findOne.mockResolvedValue(null)

            await findRegion(req, res)

            expect(RegionModel.findOne).toHaveBeenCalledWith({ _id: '123456789' })
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.badRequest)
            expect(res.json).toHaveBeenCalledWith({ message: 'Region not found' })

        })

    })

    describe('deleteRegion controller', () => {

        it('should delete one region', async () => {

            mockedRegionModel.findByIdAndDelete.mockResolvedValue(region)

            await deleteRegion(req, res)

            expect(RegionModel.findByIdAndDelete).toHaveBeenCalledWith({ _id: '123456789' })
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.ok)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(region))
        })

        it('should return a 500 error', async () => {

            mockedRegionModel.findByIdAndDelete.mockRejectedValue(new Error('Internal Server Error'))

            await deleteRegion(req, res)

            expect(RegionModel.findByIdAndDelete).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.internalServerError)
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })

        })

        it('should return a 400 error', async () => {

            mockedRegionModel.findByIdAndDelete.mockResolvedValue(null)

            await deleteRegion(req, res)

            expect(RegionModel.findByIdAndDelete).toHaveBeenCalledWith({ _id: '123456789' })
            expect(res.status).toHaveBeenCalledWith(STATUS_CODE.badRequest)
            expect(res.json).toHaveBeenCalledWith({ message: 'Region not found' })

        })

    })

})