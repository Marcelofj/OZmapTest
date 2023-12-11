import { redirect } from 'react-router-dom'

const createRegionAction = async ({ request }) => {
  try {
    const data = await request.formData()

    const coordinates = []
    let i = 1

    while (data.get(`latitude${i}`) && data.get(`longitude${i}`)) {
      coordinates.push([
        parseFloat(data.get(`latitude${i}`)),
        parseFloat(data.get(`longitude${i}`)),
      ])
      i++
    }

    const user = {
      name: data.get('name').trim(),
      location: {
        coordinates: [coordinates],
        type: 'Polygon',
      },
      user: data.get('user'),
    }

    let errors = {}

    if (user.name === '') {
      errors.name = 'Region name is required'
    }

    if (user.user === '') {
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
      user.coordinates === ''
    }

    if (Object.keys(errors).length) {
      return errors
    }

    const response = await fetch('http://localhost:3000/api/v1/regions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      console.error('Server error:', error)
      const error = await response.json()
      throw new Error('Internal Server error:', error)
    }

    await response.json()

    return redirect('/regions')
  } catch (error) {
    console.error('Internal server error:', error)
    throw new Error('Internal Server error:', error)
  }
}

export default createRegionAction
