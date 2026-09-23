import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import { AppProvider } from './context/AppContext'

import DashboardLayout from './layouts/DashboardLayout'

import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import Students from './pages/Students'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>

      <AppProvider>

        <Routes>

          <Route element={<DashboardLayout />}>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/tickets"
              element={<Tickets />}
            />

            <Route
              path="/students"
              element={<Students />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Route>

        </Routes>

      </AppProvider>

    </BrowserRouter>
  )
}

export default App