import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container text-center">
      <h1 className="h1">OZmap Test</h1>
      <div>
        <div className="home-cta">
          <p>
            In a connected and globalized world, geolocation becomes
            increasingly essential. And here at OZmap, we always seek to
            optimize and improve our systems.
          </p>
          <Link to={'/users/new'} className="button big">
            Register one user now!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
