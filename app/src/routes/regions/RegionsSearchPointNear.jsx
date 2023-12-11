import { Form, useActionData } from 'react-router-dom'
const RegionsSearchPointNear = () => {
  const data = useActionData()
  return (
    <div className="container text-center">
      <h1 className="h1">Find a Nearby Spot</h1>
      <Form method="post" action="/regions/search/point/near">
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

          <label htmlFor="distance">
            <div>Distance</div>
            <input type="text" name="distance" id="distance" required />

            {data?.distance && (
              <div>
                <small className="error">{data.distance}</small>
              </div>
            )}
          </label>

          <input type="hidden" name="type" id="type" />
          <div style={{ marginTop: '10px' }}>
            <button type="submit" className="button">
              Salvar
            </button>
          </div>
        </div>
      </Form>
      {data &&
        data?.map((items, groupIndex) => {
          return (
            <div className="table-container" key={groupIndex}>
              <table>
                <thead>
                  <tr>
                    <th>Latitude</th>
                    <th>Longitude</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.location?.coordinates[0].map((item, index) => (
                    <tr key={index}>
                      <td>{item[1]}</td>
                      <td>{item[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-item text-center">
                {<h3>{items.name}</h3>}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default RegionsSearchPointNear
