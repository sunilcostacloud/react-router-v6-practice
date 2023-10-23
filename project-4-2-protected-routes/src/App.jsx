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
    <Route
      path="protected"
      element={<h1>Super secret info here</h1>}
      loader={async () => {
        const isLoggedIn = false;
        if (!isLoggedIn) {
          throw redirect("/login")
        }
        return null
      }}
    />
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
