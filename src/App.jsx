import { BrowserRouter, Routes, Route } from 'react-router'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DashboardLayout from './components/DashboardLayout'

import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Projects from './pages/projects'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route element={<DashboardLayout />}>

          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

        </Route>

        <Route path="/login" element={<Login />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App