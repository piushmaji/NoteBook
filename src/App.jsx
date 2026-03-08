import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NoteBookApp from './components/NoteBookApp/NoteBookApp'
import LoginPage from './components/Auth/LoginPage'
import RegistrationPage from './components/Auth/RegistrationPage'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#333",
            color: "#fff",
            fontWeight: "500",
            borderRadius: "8px",
            padding: "12px 16px"
          }
        }}
      />
      <Routes>
        <Route path='/' element={<NoteBookApp />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
      </Routes>
    </>
  )
}

export default App