// Loaders
import usersLoader from './loaders/usersLoader.js'
import userLoader from './loaders/userLoader.js'

import regionsLoader from './loaders/regionsLoader.js'
import regionLoader from './loaders/regionLoader.js'

// Actions
import createUserAction from './actions/createUserAction.js'
import updateUserAction from './actions/updateUserAction.js'
import deleteUserAction from './actions/deleteUserAction.js'

import createRegionAction from './actions/createRegionAction.js'
import updateRegionAction from './actions/updateRegionAction.js'
import deleteRegionAction from './actions/deleteRegionAction.js'
import pointRegionAction from './actions/pointRegionAction.js'
import pointRegionNearAction from './actions/pointRegionNearAction.js'

// Pages
import App from './App.jsx'
import Home from './routes/Home.jsx'

import NewUser from './routes/users/NewUser.jsx'
import Users from './routes/users/Users.jsx'
import User from './routes/users/User.jsx'
import EditUser from './routes/users/EditUser.jsx'

import NewRegion from './routes/regions/NewRegion.jsx'
import Regions from './routes/regions/Regions.jsx'
import Region from './routes/regions/Region.jsx'
import EditRegion from './routes/regions/EditRegion.jsx'

import RegionsSearch from './routes/regions/RegionsSearch.jsx'
import RegionsSearchPoint from './routes/regions/RegionsSearchPoint.jsx'
import RegionsSearchPointNear from './routes/regions/RegionsSearchPointNear.jsx'

// import ErrorBoundary from './routes/ErrorBoundary.jsx'

// CSS
import './index.css'

const AppRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'users',
        element: <Users />,
        loader: usersLoader,
      },
      {
        path: 'users/new',
        element: <NewUser />,
        action: createUserAction,
      },
      {
        path: 'users/user/:id',
        element: <User />,
        loader: userLoader,
      },
      {
        path: 'users/edit/:id',
        element: <EditUser />,
        loader: userLoader,
        action: updateUserAction,
      },
      {
        path: 'users/delete/:id',
        action: deleteUserAction,
      },
      {
        path: 'regions/new',
        element: <NewRegion />,
        loader: usersLoader,
        action: createRegionAction,
      },
      {
        path: 'regions',
        element: <Regions />,
        loader: regionsLoader,
      },
      {
        path: 'regions/region/:id',
        element: <Region />,
        loader: regionLoader,
      },
      {
        path: 'regions/edit/:id',
        element: <EditRegion />,
        loader: regionLoader,
        action: updateRegionAction,
      },
      {
        path: 'regions/delete/:id',
        action: deleteRegionAction,
      },
      {
        path: 'regions/search',
        element: <RegionsSearch />,
      },
      {
        path: 'regions/search/point',
        element: <RegionsSearchPoint />,
        action: pointRegionAction,
      },
      {
        path: 'regions/search/point/near',
        element: <RegionsSearchPointNear />,
        action: pointRegionNearAction,
      },
    ],
  },
]

export default AppRoutes
