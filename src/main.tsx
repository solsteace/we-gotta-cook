import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { HomePage } from './pages/homePage/homePage.tsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", 
        element: <HomePage/>
      },
      { 
        path: "meals", 
        element: (
          <>
            <h1> Tasty meals! </h1>
          </>
        )
      },
      { 
        path: "cocktails", 
        element: (
          <>
            <h1> Scrumptious cocktails </h1>
          </>
        )
      },
      { 
        path: "blogs", 
        element: (
          <>
            <h1> Blogs to let you cook! </h1>
          </>
        )
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
