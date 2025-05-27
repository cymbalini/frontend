import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Missing from './components/Missing'
import RequireAuth from './components/RequireAuth'
import NotHome from './components/NotHome'
import WorkerOnly from './components/WorkerOnly'
import VacationsDir from './components/VacationsDirector'
import VacationForm from './components/VacationsForm'

const ROLES = {
  Pracownik: 1,
  Manager:2,
  Admin:3,
  Director:4,
  AllDirector:5
}

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout /> }>
        {/* public */}
        <Route path='login' element={<Login />} />


        {/* private*/}
        <Route element={<RequireAuth allowedRoles={[ROLES.Pracownik, ROLES.Manager,ROLES.AllDirector,ROLES.Director]} />}>
          <Route path='home' element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Manager,ROLES.Director, ROLES.AllDirector]} />}>
          <Route path='nothome' element={<NotHome />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Pracownik]} />}>
          <Route path='workeronly' element={<WorkerOnly />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.AllDirector,ROLES.Director]} />} >
          <Route path='acceptvacations' element={<VacationsDir />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.AllDirector,ROLES.Director]} />} >
          <Route path='vacationform' element={<VacationForm />} />
        </Route>
        

        {/* catch all */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
