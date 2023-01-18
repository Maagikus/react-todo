import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import AppRouter from "../AppRouter/AppRouter";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../Loader";
import { doc, collection, getFirestore, setDoc, addDoc } from "firebase/firestore";
const App = () => {
	const db = getFirestore()
	const auth = getAuth()
	const [user, loading, error] = useAuthState(auth)
	if (user) {
		const usersCollectionRef = collection(db, `users/${user.uid}/tasks`)
	}
	if (loading) {
		return <Loader />
	}
	return (
		<Router>
			<div className="wrapper">
				<NavBar />
				<main className="page">
					<AppRouter />
				</main>
			</div>

		</Router>
	)
}
export default App