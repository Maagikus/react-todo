import './../../styles.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect } from "react";
import { useGetData } from "../../hooks/getData.hook";
import { completedTaskFetched, taskFetched, taskFetching } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
ChartJS.register(ArcElement, Tooltip, Legend);
const Dynamics = () => {
	const { request } = useGetData()
	const dispatch = useDispatch()
	const tasksList = useSelector(state => state.project.tasks)
	const completed = useSelector(state => state.project.completed)
	const loadingStatus = useSelector(state => state.project.loadingStatus)
	useEffect(() => {
		dispatch(taskFetching())
		request('tasks')
			.then(data => {
				dispatch(taskFetched(data))
			})
		request('completed')
			.then(data => dispatch(completedTaskFetched(data)))
	}, [])
	const activeTask = tasksList.length
	const taskCompleted = completed.length
	let percent
	if (activeTask) {
		percent = Math.round((taskCompleted * 100) / (taskCompleted + activeTask))
	} else {
		percent = 0
	}
	let color
	switch (!!percent) {
		case percent < 40:
			color = 'red'
			break;
		case percent > 40 && percent < 70:
			color = 'yellow'
			break;
		case percent > 70:
			color = 'green'
			break;
		default:
			break;
	}
	const percentStyle = {
		backgroundColor: color,
		width: `${percent}%`
	}
	const data = {
		labels: ['Выполнено', 'Предстоит'],
		datasets: [
			{
				label: '# of Votes',
				data: [taskCompleted, activeTask],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};
	return (
		<section className="dynamics">
			<div className="dynamics__container">
				<div className="dynamics__wrapper">
					<div className="dynamics__content">
						<div className="dynamics__header">
							<div className="dynamics__title">Процент выполнения поставленных задач</div>
							<div className="dynamics__menu menu-tasks">
								<div className="dynamics__percent">{percent}%</div>
								<div style={percentStyle} className="dynamics__line"></div>
							</div>
						</div>
						<div className="dynamics__schedule">
							{
								(loadingStatus === 'loading' ? <Loader /> : <div className="dynamics__item"><Pie data={data} /></div>)
							}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Dynamics