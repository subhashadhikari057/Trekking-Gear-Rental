import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        {/* Routes will go here */}
        <h1 className="text-2xl font-bold text-center mt-10">Welcome to TrekGear</h1>
      </div>
    </Router>
  );
}

export default App;
