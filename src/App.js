import { Suspense } from 'react'
import { Router } from '@reach/router'
import * as Routes from './routes'

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Routes.HomePage path='/' />
      <Routes.LoginPage path='/login' />
    </Router>
  </Suspense>
)

export default App
