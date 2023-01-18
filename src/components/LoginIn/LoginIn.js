import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react'
const LoginIn = () => {
	const db = getFirestore()
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [
		signInWithEmailAndPassword,
		user,
		loading,
		error,
	] = useSignInWithEmailAndPassword(auth);
	const login = async (e) => {
		e.preventDefault()
		const provider = new GoogleAuthProvider()
		const user = await signInWithPopup(auth, provider)
	}
	return (
		<div className="registration">
			<div className="registration__container">
				<div className="registration__wrapper">
					<div className="registration__content">
						<h2 className="registration__title">Вход</h2>
						<form action="#" className="registration__form">
							<div className="registration__mail">
								<label htmlFor="email">Емаил</label>
								<input value={email}
									onChange={(e) => setEmail(e.target.value)} type="text" name="email" data-error="Error" placeholder="E-mail"
									className="input" />
							</div>
							<div className="registration__pass">
								<label htmlFor="pass">Пароль</label>
								<input value={password}
									onChange={(e) => setPassword(e.target.value)} type="password" name="pass" data-error="Error" placeholder="Password"
									className="input" />
							</div>
							<button onClick={(e) => {
								e.preventDefault()
								signInWithEmailAndPassword(email, password)
							}}
								type="submit" className="registration__button button">Войти</button>
							<button onClick={login} type="submit" className="registration__button button">Google</button>
						</form>
					</div>
				</div>
			</div>

		</div>
	)
}
export default LoginIn