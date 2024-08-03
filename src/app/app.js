import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './login'
import Page from './Page' // Import your Page component

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/page" element={<Page />} /> {/* Add the route for Page */}
      </Routes>
    </Router>
  )
}

export default Main