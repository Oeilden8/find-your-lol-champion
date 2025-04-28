import MainLayout from './components/MainLayout/MainLayout';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import './i18n';
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/find-your-lol-champion/' element={<MainLayout />}>
      <Route index element={<Home />} />
      {/* <Route path='/champion' element={<Champion />} /> */}
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
