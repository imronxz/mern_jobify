// react-router-dom@6
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Dashboard, Register, Error } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/daftar" element={<Register/>} />
        <Route path="/utama" element={<Landing />} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
