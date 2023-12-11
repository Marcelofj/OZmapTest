const regionLoader = async ({ params }) => {
  const { id } = params
  const response = await fetch(`http://localhost:3000/api/v1/regions/${id}`)
  return response.json()
}

export default regionLoader
