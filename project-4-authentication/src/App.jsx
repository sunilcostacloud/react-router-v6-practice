import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";
import "./server";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vansDetailsLoader } from "./pages/Vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostLayout from "./components/HostLayout";
import HostVans from "./pages/Host/HostVans";
import HostVanDetail from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";
import Login from "./pages/Login";

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route
        index
        element={<Home />}
      />
      <Route
        path="about"
        element={<About />}
      />
      <Route
        path="login"
        element={<Login />}
      />

      {/* since there is no child elements to be displayed, we can give only path without element */}
      <Route path="vans">
        <Route
          index
          element={<Vans />}
          loader={vansLoader}
          errorElement={<Error />}
        />
        <Route
          path=":id"
          element={<VanDetail />}
          loader={vansDetailsLoader}
        />
      </Route>

      {/* if we have shared user interface we need an element acts as a layout */}

      <Route path="/host" element={<HostLayout />} >
        <Route
          index
          element={<Dashboard />}
          loader={async () => {
            return null
          }}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async () => {
            return null
          }}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async () => {
            return null
          }}
        />
        <Route
          path="vans"
          element={<HostVans />}
          loader={async () => {
            return null
          }}
        />

        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={async () => {
            return null
          }}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async () => {
              return null
            }}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async () => {
              return null
            }}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async () => {
              return null
            }}
          />
        </Route>

      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
