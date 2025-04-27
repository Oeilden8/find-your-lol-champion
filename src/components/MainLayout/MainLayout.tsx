import React from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

function MainLayout() {
  return (
    <div>
      <section className='mainContainer'>
        {/* An <Outlet> renders whatever child route is currently active */}
        <Outlet />
      </section>
    </div>
  );
}

export default MainLayout;
