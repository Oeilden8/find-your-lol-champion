import { Outlet } from 'react-router-dom';
import './MainLayout.css';

function MainLayout() {
  return (
    <div className='mainLayout'>
      <section className='mainContainer'>
        <Outlet />
      </section>
    </div>
  );
}

export default MainLayout;
