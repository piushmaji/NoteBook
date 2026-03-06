import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NoteBookApp from './components/NoteBookApp/NoteBookApp'
import LoginPage from './components/Auth/LoginPage'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NoteBookApp />} />
        <Route path='/register' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App