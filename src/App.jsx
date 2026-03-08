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
            background: "rgba(255, 255, 255, 0.95)",
            color: "#1e1b4b",
            fontWeight: "600",
            fontSize: "13px",
            borderRadius: "16px",
            padding: "14px 18px",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 4px 24px rgba(109, 40, 217, 0.12), 0 1px 4px rgba(0,0,0,0.06)",
            letterSpacing: "0.01em",
            maxWidth: "360px",
          },
          success: {
            iconTheme: {
              primary: "#7c3aed",
              secondary: "#ede9fe",
            },
            style: {
              background: "rgba(255, 255, 255, 0.97)",
              border: "1px solid rgba(139, 92, 246, 0.35)",
              boxShadow: "0 4px 24px rgba(109,40,217,0.15), 0 0 0 4px rgba(139,92,246,0.06)",
            },
          },
          error: {
            iconTheme: {
              primary: "#7c3aed",
              secondary: "#ede9fe",
            },
            style: {
              background: "rgba(255, 255, 255, 0.97)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              boxShadow: "0 4px 24px rgba(239,68,68,0.1), 0 0 0 4px rgba(239,68,68,0.05)",
            },
          },
          loading: {
            iconTheme: {
              primary: "#8b5cf6",
              secondary: "#ede9fe",
            },
            style: {
              background: "rgba(255, 255, 255, 0.97)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
            },
          },
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