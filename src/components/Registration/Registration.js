import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useFormik } from "formik";
const Registration = () => {
	const [
		createUserWithEmailAndPassword,
		user,
		loading,
		error,
	] = useCreateUserWithEmailAndPassword(auth);
	const validate = (values) => {
		const errors = {}
		if (!values.email) {
			errors.email = 'обязательное поле'

		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
			errors.email = 'invalid Email'
		}
		if (!values.pass) {
			errors.pass = 'обязательное поле'

		} else if (values.pass.length < 5) {
			errors.pass = 'pass need to be longer'
		}
		return errors
	}
	const formic = useFormik({
		initialValues: {
			email: '', pass: ''
		},
		validate,
		onSubmit: values => createUserWithEmailAndPassword(values.email, values.pass)
	})
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
						<h2 className="registration__title">Регистрация</h2>
						<form action="#" className="registration__form" onSubmit={formic.handleSubmit}>
							<div className="registration__mail">
								<label htmlFor="email">Емаил</label>

								<input value={formic.values.email}
									onChange={formic.handleChange}
									onBlur={formic.handleBlur}
									type="text" name="email" data-error="Error" placeholder="E-mail"
									className="input" />
								{formic.errors.email && formic.touched.email ? <div className="invalid-email">{formic.errors.email}</div> : null}
							</div>
							<div className="registration__pass">
								<label htmlFor="pass">Пароль</label>
								<input value={formic.values.password}
									onChange={formic.handleChange} onBlur={formic.handleBlur} type="password" name="pass" data-error="Error" placeholder="Password"
									className="input" />
								{formic.errors.pass && formic.touched.pass ? <div className="invalid-email">{formic.errors.pass}</div> : null}
							</div>
							<button onClick={(e) => {

							}}

								type="submit" className="registration__button button">Регистрация</button>
							<button onClick={login} type="submit" className="registration__button button">Google</button>
						</form>
					</div>
				</div>
			</div>

		</div>
	)
}
export default Registration