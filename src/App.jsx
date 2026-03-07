import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NoteBookApp from './components/NoteBookApp/NoteBookApp'
import LoginPage from './components/Auth/LoginPage'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<NoteBookApp />} />
      <Route path='/register' element={<LoginPage />} />
    </Routes>
  )
}

export default App