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
              primary: "#f43f5e",
              secondary: "#fff1f2",
            },
            style: {
              background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,241,242,0.95) 100%)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              boxShadow: `0 4px 24px rgba(244, 63, 94, 0.18),
                          0 0 0 4px rgba(244, 63, 94, 0.06),
                          inset 0 1px 0 rgba(255,255,255,0.8)`,
              color: "#881337",
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