import { Form, useActionData } from 'react-router-dom'

const NewUser = () => {
  const errors = useActionData()
  return (
    <div className="container text-center">
      <h1 className="h1">New User</h1>
      <Form method="post" action="/users/new">
        <div className="form">
          <label htmlFor="name">
            <div>Name</div>
            <input type="text" name="name" id="name" required />

            {errors?.name && (
              <div>
                <small className="error">{errors.name}</small>
              </div>
            )}
          </label>

          <label htmlFor="email">
            <div>Email</div>
            <input type="email" name="email" id="email" required />

            {errors?.email && (
              <div>
                <small className="error">{errors.email}</small>
              </div>
            )}
          </label>

          <label htmlFor="address">
            <div>Address</div>
            <input type="text" name="address" id="address" />

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
                <input type="text" name="latitude" id="latitude" />

                {errors?.latitude && (
                  <div>
                    <small className="error">{errors.latitude}</small>
                  </div>
                )}
              </label>
            </div>

            <div className="form-item">
              <label htmlFor="longitude">
                <div>Longitude</div>
                <input type="text" name="longitude" id="longitude" />

                {errors?.longitude && (
                  <div>
                    <small className="error">{errors.longitude}</small>
                  </div>
                )}
              </label>
            </div>
          </div>

          <input type="hidden" name="type" id="type" />
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

export default NewUser
