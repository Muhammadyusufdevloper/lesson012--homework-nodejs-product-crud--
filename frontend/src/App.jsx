import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Blogs from "./components/blog/Blogs"
import CreateBlog from "./pages/create-blog/CreateBlog"

const Home = lazy(() => import("./pages/home/Deshboard"))
const Auth = lazy(() => import("./pages/auth/Auth"))
const Login = lazy(() => import("./pages/login/Login"))
const Register = lazy(() => import("./pages/register/Register"))
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="" element={<Home >
            <Navigate to="/blogs" replace />
          </Home>} >
            <Route path="blogs" element={<Blogs />} />
            <Route path="create" element={<CreateBlog />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App