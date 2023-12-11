import { useState } from 'react'
import { Form, useLoaderData, useActionData } from 'react-router-dom'

const NewRegion = () => {
  const users = useLoaderData()
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
      <h1 className="h1">New Region</h1>

      <Form method="post" action="/regions/new">
        <div className="form">
          <label htmlFor="name">
            <div>Region Name</div>
            <input type="text" name="name" id="name" required />
            {errors?.name && (
              <div>
                <small className="error">{errors.name}</small>
              </div>
            )}
          </label>
          <label htmlFor="user">
            <div>User Owner</div>
            <select name="user" id="user">
              <option value="">Select an user</option>
              {users.map(user => (
                <option value={user._id} key={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors?.user && (
              <div>
                <small className="error">{errors.user}</small>
              </div>
            )}
          </label>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {inputs.map((input, index) => (
              <div
                key={index}
                className="form-group"
                style={{
                  flexBasis: '48%',
                  marginBottom: '10px',
                }}
              >
                <label htmlFor={input.for}>
                  <div>{input.label}</div>
                  <input type="text" name={input.name} id={input.id} required />
                </label>
              </div>
            ))}
          </div>

          {errors?.coordinates && (
            <div
              className=" text-left"
              style={{ fontSize: '.9em', margin: '-10px 0 10px' }}
            >
              <small className="error">{errors.coordinates}</small>
            </div>
          )}
          {inputs.length > 0 && (
            <button
              type="button"
              style={{ width: '100%', backgrond: 'tomato' }}
              className="button tomato"
              onClick={handleRemoveInput}
            >
              delete
            </button>
          )}

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

export default NewRegion
