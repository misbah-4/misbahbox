import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Atelier from './pages/Atelier.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Project from './pages/Project.jsx'
import Work from './pages/Work.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<Project />} />
        <Route path="atelier" element={<Atelier />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
