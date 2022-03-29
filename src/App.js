import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Faq from './components/faq/Faq';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <div className="m-4 body-container">
        <Router>
          <Routes>
            <Route path='/faq' exact element={<Faq editMode={false} role='user' />} ></Route>
            <Route path='/faq-vendor'  element={<Faq editMode={true} role='vendor' />} ></Route>
            <Route path='/faq-admin' exact element={<Faq editMode={true} role='admin' />} ></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
