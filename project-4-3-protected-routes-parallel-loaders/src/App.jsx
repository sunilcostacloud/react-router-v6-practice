import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  redirect
} from "react-router-dom"

import Layout from "./Layout"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route
      index
      element={<h1>Home page</h1>}
      loader={async () => {
        return null
      }}
    />

    {/* go to "/protected/nested" and check in console */}

    <Route
      path="protected"
      element={<h1>Super secret info here</h1>}
      loader={async () => {
        const rand = Math.random() * 2
        setTimeout(() => {
          console.log("Protected Route")
        }, rand)
        return null
      }}
    >
      <Route
        path="nested"
        element={<h1>Nested Protected Route</h1>}
        loader={async () => {
          const rand = Math.random() * 2
          setTimeout(() => {
            console.log("Nested Protected Route")
          }, rand)
          return null
        }}
      />
    </Route>
    <Route path="login" element={<h1>Login page goes here</h1>} />

  </Route>
))

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
