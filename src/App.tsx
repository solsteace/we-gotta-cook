import { Outlet } from 'react-router-dom'

import { SiteTemplate } from './templates/site.tsx'
import "./App.scss";


function App() {
  return (
      <SiteTemplate>
          <Outlet />
          <p style={{"display": "hidden"}}></p>
      </SiteTemplate>
  )
}

export default App
