import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AddStudent from './Pages/AddStudent';
import APIComponent from './Pages/APIComponent';
import GoogleTranslation from './APIs/GoogleTranslation' ;

// import AppStudioComponent from './components/AppStudioComponent'





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/add-student" element={<AddStudent />} />
        <Route path='/api-hub' element={<APIComponent></APIComponent>}></Route>
        <Route path='/api-google-translate' element={<GoogleTranslation></GoogleTranslation>}></Route>
        {/* <Route path="/app-studio-component" element={<AppStudioComponent />} /> */}
      
      </Routes>
    </Router>
  );
}

export default App;

////0.1.8
