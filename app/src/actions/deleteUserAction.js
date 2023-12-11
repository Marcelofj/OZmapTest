import { redirect } from 'react-router-dom'

const deleteUserAction = async ({ params }) => {
  const { id } = params
  await fetch(`http://localhost:3000/api/v1/users/${id}`, { method: 'DELETE' })
  return redirect('/users')
}

export default deleteUserAction
