import { Form, useActionData } from 'react-router-dom'

const RegionsSearchPoint = () => {
  const data = useActionData()
  return (
    <div className="container text-center">
      <h1 className="h1">Find a Point</h1>
      <Form method="post" action="/regions/search/point">
        <div className="form">
          <div className="form-group">
            <div className="form-item">
              <label htmlFor="latitude">
                <div>Latitude</div>
                <input type="text" name="latitude" id="latitude" required />

                {data?.latitude && (
                  <div>
                    <small className="error">{data.latitude}</small>
                  </div>
                )}
              </label>
            </div>

            <div className="form-item">
              <label htmlFor="longitude">
                <div>Longitude</div>
                <input type="text" name="longitude" id="longitude" required />

                {data?.longitude && (
                  <div>
                    <small className="error">{data.longitude}</small>
                  </div>
                )}
              </label>
            </div>
          </div>
          {data?.coordinates && (
            <div>
              <small className="error">{data.longitude}</small>
            </div>
          )}
          <input type="hidden" name="type" id="type" />
          <div style={{ marginTop: '10px' }}>
            <button type="submit" className="button">
              Salvar
            </button>
          </div>
        </div>
      </Form>
      <div className="table-container">
        {data && (
          <table>
            <thead>
              <tr>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.location?.coordinates[0].map((coordinate, index) => (
                  <tr key={index}>
                    <td>{coordinate[1]}</td>
                    <td>{coordinate[0]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="text-item text-center">
        <h3>{data && data.name}</h3>
      </div>
    </div>
  )
}

export default RegionsSearchPoint
