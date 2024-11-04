import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import './App.css';
import './styles/MobLogin.scss'
import './styles/test.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Trash from './pages/Trash';
import Archive from './pages/Archive';
import Editnote from './pages/Editnote';
import Login from './pages/Login';

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
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App