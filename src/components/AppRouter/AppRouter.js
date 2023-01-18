import {
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";
import { publicRoutes, privateRoutes } from "../../router/routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { urlChanged } from "../../store/actions";
const AppRouter = () => {
	const auth = getAuth()
	const [user, loader, error] = useAuthState(auth)
	const dispatch = useDispatch()
	const location = useLocation()
	return user
		?
		(
			<Switch>
				<>
					{
						privateRoutes.map(({ path, Component }, index) => (
							<Route key={index} path={path} component={Component} />
						))
					}
					<Redirect to='/todos' />
				</>

			</Switch>
		)
		:
		(
			<Switch>
				<>
					{
						publicRoutes.map(({ path, Component }, index) => (
							<Route key={index} path={path} component={Component} />
						)
						)
					}
					<Redirect to='/login' />
				</>
			</Switch>
		)
}
export default AppRouter