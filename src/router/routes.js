import Registration from "../components/Registration/Registration";
import TodoPage from "../components/TodoPage/TodoPage";
import Dynamics from "../components/Dynamics/Dynamics";
import Calendar from "../components/Calendar/Calendar";
import LoginIn from "../components/LoginIn/LoginIn";

export const publicRoutes = [
	{
		path: '/registration',
		Component: Registration,

	},
	{
		path: '/login',
		Component: LoginIn,

	}
]
export const privateRoutes = [
	{
		path: '/todos',
		Component: TodoPage
	},
	{
		path: '/dynamics',
		Component: Dynamics
	},
	{
		path: '/calendar',
		Component: Calendar
	},



]

