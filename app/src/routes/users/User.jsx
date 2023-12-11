import { useLoaderData, Form } from 'react-router-dom'
const User = () => {
  const user = useLoaderData()

  return (
    <div className="container text-center">
      <h1 className="h1">User</h1>
      <ul className="no-bullets">
        <li key={user._id}>
          <h2 className="h2">{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.address}</p>
        </li>
      </ul>

      <div className="buttons-container">
        <Form action={`/users/edit/${user._id}`}>
          <button type="submit" className="button">
            Edit
          </button>
        </Form>
        <Form
          method="post"
          action={`/users/delete/${user._id}`}
          onSubmit={event => {
            if (!confirm(`Confirma a remoção de ${user.name} ?`)) {
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

export default User
