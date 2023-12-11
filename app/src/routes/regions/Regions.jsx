import { Link, useLoaderData } from 'react-router-dom'

const Regions = () => {
  const regions = useLoaderData()

  return (
    <div className="container text-center">
      <h1 className="h1">Regions</h1>

      <ul className="no-bullets">
        {regions.map(region => (
          <li key={region._id}>
            <Link to={`/regions/region/${region._id}`}>
              <h3 className="h3">
                {region.name} <span>click me</span>
              </h3>
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '30px' }}>
        <Link to={'/regions/new'} className="button big">
          Create a new region
        </Link>
      </div>
    </div>
  )
}

export default Regions
