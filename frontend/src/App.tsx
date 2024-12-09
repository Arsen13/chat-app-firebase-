import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "./context/AuthContext"
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));

function App() {

  const { authUser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Suspense fallback={<span className="loading loading-spinner"></span>}>
        <Routes>
          <Route path="/" element={!authUser ? <Navigate to="/signup" /> : <Home />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />}/>
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        </Routes>
        <Toaster />
      </Suspense>
    </div>
  )
}

export default App
