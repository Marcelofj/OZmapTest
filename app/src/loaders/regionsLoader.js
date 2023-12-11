const regionsLoader = async () => {
  const response = await fetch('http://localhost:3000/api/v1/regions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    console.error('Server error:', error)
    throw new Response('Bad Request', error)
  }

  return response.json()
}

export default regionsLoader
