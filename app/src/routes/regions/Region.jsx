import { useLoaderData, Form } from 'react-router-dom'

const Region = () => {
  const region = useLoaderData()

  return (
    <div className="container text-center">
      <h1 className="h1">Region</h1>
      <ul className="no-bullets">
        <li key={region._id}>
          <h2 className="h2">{region.name}</h2>
        </li>
      </ul>

      <div className="buttons-container">
        <Form action={`/regions/edit/${region._id}`}>
          <button type="submit" className="button">
            Edit
          </button>
        </Form>
        <Form
          method="post"
          action={`/regions/delete/${region._id}`}
          onSubmit={event => {
            if (!confirm(`Confirma a remoção de ${region.name} ?`)) {
              event.preventDefault()
            }
          }}
        >
          <button type="submit" className="button">
            Delete
          </button>
        </Form>
      </div>
    </div>
  )
}

export default Region
