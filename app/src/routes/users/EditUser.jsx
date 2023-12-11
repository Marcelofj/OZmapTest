import { Form, useLoaderData, useActionData } from 'react-router-dom'

const EditUser = () => {
  const user = useLoaderData()
  const errors = useActionData()

  return (
    <div className="container text-center">
      <h1 className="h1">Edit User</h1>

      <Form method="post" action={`/users/edit/${user._id}`}>
        <div className="form">
          <label htmlFor="name">
            <div>Name</div>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              required
            />

            {errors?.name && (
              <div>
                <small className="error">{errors.name}</small>
              </div>
            )}
          </label>

          <label htmlFor="email">
            <div>Email</div>
            <input
              type="text"
              name="email"
              id="email"
              defaultValue={user.email}
              required
            />

            {errors?.email && (
              <div>
                <small className="error">{errors.email}</small>
              </div>
            )}
          </label>

          <label htmlFor="address">
            <div>Address</div>
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={user.address}
            />

            {errors?.address && (
              <div>
                <small className="error">{errors.address}</small>
              </div>
            )}
          </label>
          <div className="form-group">
            <div className="form-item">
              <label htmlFor="latitude">
                <div>Latitude</div>
                <input
                  type="text"
                  name="latitude"
                  id="latitude"
                  defaultValue={user.location.coordinates[1]}
                />

                {errors?.latitude && (
                  <div>
                    <small className="error">{errors.latitude}</small>
                  </div>
                )}
              </label>
            </div>

            <div className="form-item">
              <label htmlFor="longitude">
                <div>Latitude</div>
                <input
                  type="text"
                  name="longitude"
                  id="longitude"
                  defaultValue={user.location.coordinates[0]}
                />

                {errors?.longitude && (
                  <div>
                    <small className="error">{errors.longitude}</small>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <button type="submit" className="button">
              Salvar
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default EditUser
