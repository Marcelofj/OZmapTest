import opencage from 'opencage-api-client'
import Logger from '../config/logger'

class OpenCageService {

    private async getOpenCagePlace(query: string, lang?: string): Promise<any> {

        try {
            const data = await opencage.geocode({ q: query, language: lang })
            if (data.status.code === 200 && data.results.length > 0) {
                const place = data.results[0]
                return place
            }
        } catch (error: any) {
            Logger.error('error', error.message)
            if (error.status.code === 402) {
                Logger.error('hit free trial daily limit')
            }
        }
    }

    public async getAddressFromCoordinates(coordinates: [number, number]): Promise<string> {
        const place = await this.getOpenCagePlace(`${coordinates[1]}, ${coordinates[0]}`, 'native')
        return place.formatted
    }

    public async getCoordinatesFromAddress(address: string): Promise<{ lat: number; lng: number }> {
        const place = await this.getOpenCagePlace(address)
        return place.geometry
    }
}

export default new OpenCageService()

