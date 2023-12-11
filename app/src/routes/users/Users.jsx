import { Link, useLoaderData } from 'react-router-dom'

const Users = () => {
  const users = useLoaderData()
  return (
    <div className="container text-center">
      <h1 className="h1">Users</h1>
      <ul className="no-bullets">
        {users.map(user => (
          <li key={user._id}>
            <Link to={`/users/user/${user._id}`}>
              <h3 className="h3">
                {user.name} <span>click me</span>
              </h3>
            </Link>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '30px' }}>
        <Link to={'/users/new'} className="button big">
          Create a new user
        </Link>
      </div>
    </div>
  )
}

export default Users
