import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './component/layout/Layout';
import { ROUTES } from './utils/routes';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to={ROUTES.dashboard} />} />
          <Route path={ROUTES.dashboard} element={<Dashboard />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
