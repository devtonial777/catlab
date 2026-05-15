import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { MainLayout } from '@/layouts/MainLayout'

import { Home } from '@/pages/Home'
import { About } from '@/pages/About'

export function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/sobre" element={<About />} />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}