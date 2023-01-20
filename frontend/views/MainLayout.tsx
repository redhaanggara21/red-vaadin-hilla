import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { Button } from '@hilla/react-components/Button';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { Item } from '@hilla/react-components/Item.js';
import { Scroller } from '@hilla/react-components/Scroller.js';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import css from './MainLayout.module.css';
import views, { RequiredViewInfoMap } from './views.js';
import { logout } from '@hilla/frontend';

export default function MenuOnLeftLayout() {
  const { pathname } = useLocation();
  const currentTitle = views[pathname]?.title ?? 'Unknown';
  const navigate = useNavigate();
  
  return (
    <AppLayout className="block h-full" primarySection="drawer">
      <header slot="drawer">
        <h1 className="text-l m-0">red-vaading-hilla-project</h1>
        <Button
          theme="primary"
          onClick={() =>
            logout()
              .then(() => navigate('/login'))
              .catch((e) => console.warn(e))
          }
        >
          Logout
        </Button>
      </header>
      <Scroller slot="drawer" scroll-direction="vertical">
        <nav>
          {Object.entries(views as RequiredViewInfoMap).map(([path, { icon: pageIcon, title: pageTitle }]) => (
            <Item key={path}>
              <NavLink className={css.navlink} key={path} to={path}>
                <span className={`${pageIcon} nav-item-icon`} slot="prefix" aria-hidden="true"></span>
                {pageTitle}
              </NavLink>
            </Item>
          ))}
        </nav>
      </Scroller>
      <footer slot="drawer" />

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h2 slot="navbar" className="text-l m-0">
        {currentTitle}
      </h2>

      <Outlet />
    </AppLayout>
  );
}
