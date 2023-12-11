import { redirect } from 'react-router-dom'

const updateRegionAction = async ({ request, params }) => {
  try {
    const { id } = params
    const data = await request.formData()

    const coordinates = []
    let i = 1

    while (data.get(`latitude${i}`) && data.get(`longitude${i}`)) {
      coordinates.push([
        Number(data.get(`latitude${i}`)),
        Number(data.get(`longitude${i}`)),
      ])
      i++
    }

    const region = {
      name: data.get('name').trim(),
      location: {
        coordinates: [coordinates],
        type: 'Polygon',
      },
      user: data.get('user'),
    }

    console.log(region)

    let errors = {}

    if (region.name === '') {
      errors.name = 'Region name is required'
    }

    if (region.user === '') {
      errors.user = 'User owner is required'
    }

    if (coordinates.length < 4) {
      errors.coordinates = 'At least 4 coordinate pairs are required'
    } else if (
      (coordinates.length >= 4 &&
        coordinates[0][0] !== coordinates[coordinates.length - 1][0]) ||
      coordinates[0][1] !== coordinates[coordinates.length - 1][1]
    ) {
      errors.coordinates = 'First and last coordinates must be the same'
    } else {
      region.coordinates === ''
    }

    if (Object.keys(errors).length) {
      return errors
    }

    const response = await fetch(`http://localhost:3000/api/v1/regions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(region),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Server error:', error)
      throw new Error('Internal Server error:', error)
    }

    await response.json()

    return redirect('/regions')
  } catch (error) {
    console.error('Internal server error:', error)
    return error
  }
}

export default updateRegionAction
