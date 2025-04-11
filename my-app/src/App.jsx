
import './App.css'
import Home from '../src/pages/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Project from './components/Project';
function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/projects' element={<Project/>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App
