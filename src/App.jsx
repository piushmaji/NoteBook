import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NoteBookApp from './components/NoteBookApp/NoteBookApp'
import LoginPage from './components/Auth/LoginPage'
import RegistrationPage from './components/Auth/RegistrationPage'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<NoteBookApp />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/registration' element={<RegistrationPage />} />
    </Routes>
  )
}

export default App