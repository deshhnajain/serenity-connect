import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './pages/Aboutus';
import { Nav } from 'react-bootstrap';
import MyNavbar from './Component/navbar/navbar';
function App() {
  return (
<Router>
  
  {/* <AboutUs/>Testing aboutus page */}
  {/* <AboutUs/> */}
  <MyNavbar />
  <Routes>
  <Route path="/about" element={<AboutUs />} />
  </Routes>
  </Router>
  )
}

export default App