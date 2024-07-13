import { useState } from 'react'
import './App.css'
import { Outlet, Link } from 'react-router-dom'

import { SiteTemplate } from './templates/site.tsx'


function App() {
  return (
      <SiteTemplate>
          <Outlet />
          <Outlet />
      </SiteTemplate>
  )
}

export default App
