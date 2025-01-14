import './App.css'
import { matchPath, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import MyFooter from './components/MyFooter'

function App() {
  const location = useLocation();

  const isAuthPage = location.pathname==="/signup" || location.pathname ==="/login" ||location.pathname==='/welcome'|| matchPath('/verifyEmail/:id',location.pathname);

  return (
    <div>
        {!isAuthPage && <Navbar/>}
        <div className='min-h-screen bg-White'><Outlet/></div>
        {!isAuthPage && <MyFooter/>}
    </div>
  )
}

export default App
