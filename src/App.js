import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductDetails from './pages/productDetails';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<ProductDetails />} />
        </Routes>
      </Router>
    
  );
}

export default App;
