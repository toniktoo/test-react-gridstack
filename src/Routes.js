import { Routes, Route } from 'react-router-dom';
import { DashboardExample } from './pages/dashboard-example';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardExample />} />
    </Routes>
  );
};
