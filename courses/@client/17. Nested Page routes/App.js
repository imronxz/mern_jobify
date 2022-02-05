// react-router-dom@6
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Auth, Error } from './pages';
//* dashboard pages
import { AddJob, AllJobs, Profile, Stats, SharedLayout } from './pages/dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard">
          <Route path="tambah-pekerjaan" element={<AddJob />} />
          <Route path="semua-pekerjaan" element={<AllJobs />} />
          <Route path="profile-user" element={<Profile />} />
          <Route path="status-utama" element={<Stats />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/utama" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
