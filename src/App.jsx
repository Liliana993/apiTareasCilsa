import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<CreateTask />} />
      </Routes>
    </>
  )
}

export default App;
