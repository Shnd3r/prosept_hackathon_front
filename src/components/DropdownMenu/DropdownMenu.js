import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useOutsideClick from '../../hooks/useOutsideClick';

import './DropdownMenu.css';

function DropdownMenu() {

  const dropdownMenuRef = useRef(null);

  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);

  function handleOpenSelectMenu() {
    setDropdownMenuIsOpen(!dropdownMenuIsOpen)
  }

  function handleCloseSelectMenu() {
    setDropdownMenuIsOpen(false)
  }

  useOutsideClick(dropdownMenuRef, handleCloseSelectMenu, dropdownMenuIsOpen);

  return (
    <div className='dropdown-menu'>
      <div ref={dropdownMenuRef} className='dropdown-menu__container' onClick={handleOpenSelectMenu}>
        <span className='dropdown-menu__text'>Меню</span>
        <div className={`dropdown-menu__icon ${dropdownMenuIsOpen ? 'dropdown-menu__close-icon' : 'dropdown-menu__open-icon'}`}></div>
      </div>
      <ul className={`dropdown-menu__list ${dropdownMenuIsOpen && 'dropdown-menu__list_open'}`}>
      <li className='dropdown-menu__item'>
          <Link to='/statistics/dealers' className='dropdown-menu__link' onClick={handleOpenSelectMenu}>
            Статистика диллеров
          </Link>
        </li>
        <li className='dropdown-menu__item'>
          <Link to='/' className='dropdown-menu__link' onClick={handleOpenSelectMenu}>
            Статистика 2
          </Link>
        </li>
        <li className='dropdown-menu__item'>
          <Link to='/' className='dropdown-menu__link' onClick={handleOpenSelectMenu}>
            Статистика 3
          </Link>
        </li>
      </ul>
    </div>
  )
};

export default DropdownMenu;
