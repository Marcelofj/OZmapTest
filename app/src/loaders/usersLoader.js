const usersLoader = async () => {
  const response = await fetch('http://localhost:3000/api/v1/users')
  return response.json()
}

export default usersLoader
