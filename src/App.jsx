import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import './App.css';
import './styles/MobLogin.scss'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Trash from './pages/Trash';
import Archive from './pages/Archive';
import Editnote from './pages/Editnote';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="font-interFont overflow-hidden">
      {/* <Dashboard/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>}>
            <Route index element={<Home/>}></Route>
            <Route path="trash" element={<Trash/>}></Route>
            <Route path="editnote" element={<Editnote/>}></Route>
            <Route path="archive" element={<Archive/>}></Route>
          </Route>
          <Route path="/login" index element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="*" element={
            <div className='flex h-screen flex-col items-center justify-center'>
              <h1 className='text-8xl m-5'>404 No Page Found</h1>
              <p className='text-xl'>return to <a href="/login" className='underline'>login</a></p>
            </div>
            }></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App