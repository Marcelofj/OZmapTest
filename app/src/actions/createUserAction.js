import { redirect } from 'react-router-dom'

const createUserAction = async ({ request }) => {
  try {
    const data = await request.formData()

    const hasAddress = data.get('address')
    const hasCoordinates = data.get('latitude') && data.get('longitude')

    const user = {
      name: data.get('name').trim(),
      email: data.get('email').trim(),
      address: hasAddress ? data.get('address').trim() : '',
      location: hasCoordinates
        ? {
            coordinates: [
              Number(data.get('longitude')),
              Number(data.get('latitude')),
            ],
            type: 'Point',
          }
        : {
            coordinates: [],
            type: 'Point',
          },
    }

    let errors = {}

    if (user.name === '') {
      errors.name = 'name is required'
    }

    if (user.email === '') {
      errors.email = 'email is required'
    }

    const lng = user.location.coordinates[0]
    const lat = user.location.coordinates[1]

    if (user.address !== '' && (lat !== undefined || lng !== undefined)) {
      errors.address = 'coordinates is set'
    } else {
      user.address === ''
    }

    if ((lat !== undefined || lng !== undefined) && user.address !== '') {
      errors.latitude = 'address is set'
      errors.longitude = 'address is set'
    } else {
      lat === null
      lng === null
    }

    if (user.address === '' && lat === undefined && lng === undefined) {
      errors.address = 'address is required'
      errors.latitude = 'latitude is required'
      errors.longitude = 'longitude is required'
    } else {
      user.address === ''
      lat === null
      lng === null
    }

    if (Object.keys(errors).length) {
      return errors
    }

    console.log(JSON.stringify(user))

    const response = await fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Server error:', error)
      return error
    }

    await response.json()
    return redirect('/users')
  } catch (error) {
    console.error('Internal server error:', error)
    return error
  }
}

export default createUserAction
