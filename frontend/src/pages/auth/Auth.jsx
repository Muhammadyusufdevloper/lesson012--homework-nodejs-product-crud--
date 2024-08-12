import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const Auth = () => {

    let isUser = useSelector((state) => state.auth.token)

    return isUser ? <Outlet /> : <Navigate to="/login" replace />
}

export default Auth