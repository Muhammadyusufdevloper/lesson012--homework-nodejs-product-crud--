import { lazy } from "react"
import { Route, Routes } from "react-router-dom"
import Admin from "./pages/admin/admin"
import ManageProduct from "./pages/admin/pages/ManageProduct"
import CreateProduct from "./pages/admin/pages/CreateProduct"
const Home = lazy(() => import("./pages/home/Home"))
const Auth = lazy(() => import("./pages/auth/Auth"))
const Login = lazy(() => import("./pages/login/Login"))
const Register = lazy(() => import("./pages/register/Register"))
const App = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />} >
        </Route>
        <Route path="/" element={<Auth />}>
          <Route path="admin" element={<Admin />} >
            <Route path="product" element={<ManageProduct />} />
            <Route path="create" element={<CreateProduct />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App