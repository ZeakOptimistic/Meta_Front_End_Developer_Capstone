import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <div className="layout">
      <Router>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
