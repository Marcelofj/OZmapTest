import openCageService from './openCageService'
// import STATUS_CODE from '../enums/httpStatusCodes'

const locationService = async (address?: string, coordinates?: [number, number]): Promise<{
    locationCoordinates: [number, number] | null;
    LocationAddress?: string | null;
}> => {

    if (address) {
        const getCoordinates = await openCageService.getCoordinatesFromAddress(address)
        console.log(getCoordinates)
        return {
            LocationAddress: address,
            locationCoordinates: [getCoordinates.lng, getCoordinates.lat]
        }
    }

    if (coordinates) {
        const getAddress = await openCageService.getAddressFromCoordinates(coordinates)
        return {
            LocationAddress: getAddress,
            locationCoordinates: coordinates
        }
    }

    return {
        locationCoordinates: null
    }

}

export default locationService