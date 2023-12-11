const pointRegionNearAction = async ({ request }) => {
  try {
    const data = await request.formData()

    const region = {
      lat: Number(data.get('latitude')),
      lng: Number(data.get('longitude')),
      distance: Number(data.get('distance')),
    }

    let errors = {}

    if (isNaN(data.get('latitude')) || isNaN(data.get('longitude'))) {
      errors.latitude = 'Invalid latitude'
      errors.longitude = 'Invalid longitude'
    }

    if (data.get('latitude') === '') {
      errors.latitude = 'Latitude is required'
    }

    if (data.get('longitude') === '') {
      errors.longitude = 'Longitude is required'
    }

    if (data.get('distance') === '') {
      errors.distance = 'Distance is required'
    }

    if (data.get('distance') <= 0) {
      errors.distance = 'Distance must be grater than zero'
    }

    if (Object.keys(errors).length) {
      return errors
    }

    const response = await fetch(
      'http://localhost:3000/api/v1/regions/near-point',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(region),
      }
    )

    if (!response.ok) {
      throw new Error('Internal Server error')
    }

    const regionResponse = await response.json()

    if (Object.keys(regionResponse).length) {
      return regionResponse
    }

    return []
  } catch (error) {
    console.error('Internal server error:', error)
    throw new Error('Internal Server error')
  }
}

export default pointRegionNearAction
