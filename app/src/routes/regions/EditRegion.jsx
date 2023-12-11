import { useState } from 'react'
import { Form, useLoaderData, useActionData } from 'react-router-dom'

const EditRegion = () => {
  const region = useLoaderData()
  const errors = useActionData()

  const [inputs, setInputs] = useState([])
  const [counter, setCounter] = useState(1)

  const handleAddInput = () => {
    const newInputs = [
      ...inputs,
      {
        for: `latitude${counter}`,
        label: `latitude`,
        name: `latitude${counter}`,
        id: `latitude${counter}`,
      },
      {
        for: `longitude${counter}`,
        label: `longitude`,
        name: `longitude${counter}`,
        id: `longitude${counter}`,
      },
    ]
    setInputs(newInputs)
    setCounter(counter + 1)
  }

  const handleRemoveInput = index => {
    const newInputs = [...inputs]
    newInputs.splice(index, 2)
    setInputs(newInputs)
  }

  return (
    <div className="container text-center">
      <h1 className="h1">Edit Region</h1>

      <Form method="post" action={`/regions/edit/${region._id}`}>
        <div className="form">
          <label htmlFor="name">
            <div>Region Name</div>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={region.name}
              required
            />
            {errors?.name && (
              <div>
                <small className="error">{errors.name}</small>
              </div>
            )}
          </label>

          <label htmlFor="user">
            <div>User Owner</div>
            <input
              type="text"
              name="user"
              id="user"
              defaultValue={region.user}
              required
            />
            {errors?.user && (
              <div>
                <small className="error">{errors.user}</small>
              </div>
            )}
          </label>
          {region &&
            region?.location?.coordinates[0].map((coordinate, indexGroup) => (
              <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
                key={indexGroup}
              >
                {coordinate.map((inputCoordinate, indexCoordinate) => (
                  <div
                    key={indexCoordinate}
                    className="form-group"
                    style={{
                      flexBasis: '48%',
                      marginBottom: '10px',
                    }}
                  >
                    <label
                      htmlFor={
                        indexCoordinate === 0
                          ? `latitude${indexGroup + 1}`
                          : `longitude${indexGroup + 1}`
                      }
                      key={indexCoordinate}
                    >
                      <div>
                        {indexCoordinate === 0 ? 'Latitude' : 'Longitude'}
                      </div>
                      <input
                        type="text"
                        name={
                          indexCoordinate === 0
                            ? `latitude${indexGroup + 1}`
                            : `longitude${indexGroup + 1}`
                        }
                        id={
                          indexCoordinate === 0
                            ? `latitude${indexGroup + 1}`
                            : `longitude${indexGroup + 1}`
                        }
                        defaultValue={inputCoordinate}
                        required
                      />
                    </label>
                  </div>
                ))}
              </div>
            ))}
          {errors?.coordinates && (
            <div
              className=" text-left"
              style={{ fontSize: '.9em', margin: '-10px 0 10px' }}
            >
              <small className="error">{errors.coordinates}</small>
            </div>
          )}

          <button
            type="button"
            style={{ width: '100%', backgrond: 'tomato' }}
            className="button tomato"
            onClick={handleRemoveInput}
          >
            delete
          </button>

          <input type="hidden" name="type" id="type" />

          <div style={{ marginTop: '10px' }}>
            <button
              type="button"
              style={{ width: '100%' }}
              className="button ligth-green"
              onClick={handleAddInput}
            >
              Add Latitude and Longitude
            </button>
          </div>

          <div style={{ marginTop: '10px' }}>
            <button type="submit" className="button">
              Save
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default EditRegion
