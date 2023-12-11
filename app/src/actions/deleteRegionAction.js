import { redirect } from 'react-router-dom'

const deleteRegionAction = async ({ params }) => {
  const { id } = params
  await fetch(`http://localhost:3000/api/v1/regions/${id}`, {
    method: 'DELETE',
  })
  return redirect('/regions')
}

export default deleteRegionAction
