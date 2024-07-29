import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './Component/pages/Aboutus';
function App() {
  return (
<Router>
  
  {/* <AboutUs/>Testing aboutus page */}
  <AboutUs/>
  <Routes>
  <Route path="/about" element={<AboutUs />} />
  </Routes>
  </Router>
  )
}

export default App