import style from './Menubar.module.css';
import { NavLink } from 'react-router-dom';

const Menubar = () => {
  return (
    <ul className={style.menubar}>
      <NavLink to="/" className={style.containerMenu} >
        <li>Home</li>
      </NavLink>
          <NavLink to={"/movies"} className={style.containerMenu}>
               <li>Movies</li>
     </NavLink>
    </ul>
  );
};

export default Menubar;
