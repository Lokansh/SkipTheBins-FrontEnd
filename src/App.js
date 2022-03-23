import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Faq from './components/faq/Faq';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <div className="m-4 body-container">
      <Router>
      <Routes>
        <Route path='/' exact element={<Faq editMode={true} />} ></Route>
      </Routes>
    </Router>  
      </div>
      <Footer />
    </div>
  );
}

export default App;
