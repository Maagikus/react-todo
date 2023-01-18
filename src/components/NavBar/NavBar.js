import '../../styles.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { urlChanged } from "../../store/actions";
import { useState } from 'react';
const NavBar = () => {
	const dispatch = useDispatch()
	const auth = getAuth()
	const [user] = useAuthState(auth)
	const [menuOpen, setMenuOpen] = useState(false)
	return (
		<header className="header">
			<div className="header__container">
				<div className="header__wrapper">
					<div className={menuOpen ? "header__menu menu menu-open" : "header__menu menu"}>
						<button onClick={() => !menuOpen ? setMenuOpen(true) : setMenuOpen(false)} type="button" className="menu__icon icon-menu"><span></span></button>
						<nav className="menu__body">
							{user ?
								(<ul className="menu__list">
									<li className="menu__item"><NavLink onClick={() => {
										setMenuOpen(false)
										dispatch(urlChanged())
									}} to='/todos' className='menu__link' activeClassName='_active'>Задачи</NavLink></li>
									<li className="menu__item"><NavLink onClick={() => {
										setMenuOpen(false)
										dispatch(urlChanged())
									}} to='/dynamics' className="menu__link" activeClassName='_active'>Динамика</NavLink></li>
									{/*<li className="menu__item"><NavLink to='/todos' className="menu__link"  activeClassName='_active'>Результат</NavLink></li>*/}
									<li className="menu__item " ><NavLink onClick={() => {
										setMenuOpen(false)
										dispatch(urlChanged())
									}} to='/calendar' className="menu__link" activeClassName='_active'>Календарь</NavLink></li>
								</ul>
								)
								:
								<>
									<ul className="menu__list">
										<li className="menu__item " ><NavLink onClick={() => {
											setMenuOpen(false)
											dispatch(urlChanged())
										}} to='/login' className="menu__link" activeClassName='_active'>Войти</NavLink></li>
										<li className="menu__item " ><NavLink onClick={() => {
											setMenuOpen(false)
											dispatch(urlChanged())
										}} to='/registration' className="menu__link" activeClassName='_active'>Регистрация</NavLink></li>
									</ul>
								</>
							}
							{user ? <button onClick={() => {
								auth.signOut()
								dispatch(urlChanged())
								setMenuOpen(false)
							}} type="submit" className="menu__button button">Выход</button> : null}
						</nav>
					</div>
				</div>
			</div>
		</header>
	)
}
export default NavBar


