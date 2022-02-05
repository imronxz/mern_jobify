// react-router-dom@6
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Auth, Error, ProtectedRoute } from './pages';
//* dashboard pages
import { AddJob, AllJobs, Profile, Stats, SharedLayout } from './pages/dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {/* default pages with index */}
          <Route index element={<Stats />} />
          <Route path="tambah-pekerjaan" element={<AddJob />} />
          <Route path="semua-pekerjaan" element={<AllJobs />} />
          <Route path="profile-pekerja" element={<Profile />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/utama" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
