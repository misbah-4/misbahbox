import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'

const pages = {
  atelier: () => import('./pages/Atelier.jsx'),
  home: () => import('./pages/Home.jsx'),
  profile: () => import('./pages/Profile.jsx'),
  project: () => import('./pages/Project.jsx'),
  work: () => import('./pages/Work.jsx'),
}

const Atelier = lazy(pages.atelier)
const Home = lazy(pages.home)
const Profile = lazy(pages.profile)
const Project = lazy(pages.project)
const Work = lazy(pages.work)

const WARM_UP_DELAY = 2000

function App() {
  // Fetches the other pages once this one has settled, so moving between them is instant.
  useEffect(() => {
    const timer = setTimeout(() => Object.values(pages).forEach((load) => load()), WARM_UP_DELAY)
    return () => clearTimeout(timer)
  }, [])

  // Suspense sits above Layout so its scroll animations only run once the page has mounted.
  return (
    <Suspense fallback={null}>
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
    </Suspense>
  )
}

export default App
