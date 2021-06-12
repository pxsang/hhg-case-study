import {
  Link,
  useLocation,
} from "react-router-dom";
import { NAV_LIST } from '../../configs/routes';
import './NavBar.css';

export default function NavBar() {
  let location = useLocation();

  return (
    <header className="header">
      <ul className="nav-bar">
        {NAV_LIST.map(({link, title}) => {
          const active = location.pathname === link;
          return (
            <li key={link} className={`nav-item ${active ? 'nav-item-active' : ''}`}>
              <Link to={link}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  )
}
