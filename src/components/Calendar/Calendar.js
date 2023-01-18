import './../../styles.css'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { completedTask, completedTaskFetched, taskFetched, taskFetching } from "../../store/actions";
import { useDispatch } from "react-redux";
import { useGetData } from "../../hooks/getData.hook";
import usePagination from '../../hooks/usePagination.hook'
import Loader from '../Loader'
const Calendar = () => {
	let nowDate = new Date()
	const [nowMonth, setNowMonth] = useState(nowDate.getMonth())
	const [currentDay, setCurrentDay] = useState(nowDate.getDate())
	const [nowYear, setNowYear] = useState(nowDate.getFullYear())
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isTaskListOpen, setIsTaskListOpen] = useState(false)
	let nowDateNumber = nowDate.getDate()
	let monthName = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
	let nextYeat = nowYear + 1
	const [currentMonthName, setCurrentMonthName] = useState(monthName[nowDate.getMonth()])
	let fullDate = new Date(nowYear, nowMonth, currentDay)
	let monthDays = new Date(nowYear, nowMonth + 1, 0).getDate();
	let daysArray = []
	let curDate = nowDate.setMonth(nowDate.getMonth() - 1);
	// Получаю день недели
	const getWeekDay = (date) => {
		let daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
		return daysOfWeek[date.getDay()];
	}
	const loadingStatus = useSelector(state => state.project.loadingStatus)
	const { request } = useGetData()
	const tasksList = useSelector(state => state.project.tasks)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(taskFetching())
		request('tasks')
			.then(data => {
				dispatch(taskFetched(data))
			})
		request('completed')
			.then(data => dispatch(completedTaskFetched(data)))
	}, [])
	//Получил дату строкой
	const onMenuOpen = () => {
		if (isMenuOpen) {
			setIsMenuOpen(false)
		} else {
			setIsMenuOpen(true)
		}
	}
	const onTaskListOpen = () => {
		if (!isTaskListOpen) {
			setIsTaskListOpen(true)
		}
	}
	const blabla = () => {
		if ((nowMonth + 1) < 10 && currentDay < 10) {
			return `${nowYear}0${nowMonth + 1}0${currentDay}`
		} else if ((nowMonth + 1) < 10 && currentDay >= 10) {
			return `${nowYear}0${nowMonth + 1}${currentDay}`
		} else if ((nowMonth + 1) >= 10 && currentDay < 10) {
			return `${nowYear}${nowMonth + 1}0${currentDay}`
		} else if ((nowMonth + 1) >= 10 && currentDay >= 10) {
			return `${nowYear}${nowMonth + 1}${currentDay}`
		}
	}
	let d = blabla()
	const filteredTasks = tasksList.filter(item => {
		return item.date.replace(/-/g, '') === d
	})
	const {
		firstContentIndex,
		lastContentIndex,
		nextPage,
		prevPage,
		page,
		setPage,
		totalPages,
	} = usePagination({
		contentPerPage: 3,
		count: filteredTasks.length,
	});
	function renderTasks(arr) {
		const items = arr.slice(firstContentIndex, lastContentIndex).map(({ task, time }, index) => {
			return (
				<li key={index} className="tasks-today__item">
					<div className="tasks-today__header">
						<div className="tasks-today__title">name of task</div>
						<div className="tasks-today__time">{time}</div>
					</div>
					<div className="tasks-today__descr">
						{task}
					</div>
				</li>
			)
		})
		return items
	}
	// Отрисовываю сетку календаря
	for (let i = 0; i < monthDays; i++) {
		daysArray.push(i + 1)
	}
	if (new Date(nowYear, nowMonth, 1).getDay() != 0) {
		for (let i = 0; i < (new Date(nowYear, nowMonth, 1).getDay() - 1); i++) {
			daysArray.unshift('')
		}
	}
	const onSelectMonth = (index, item) => {
		setNowMonth(index)
		setCurrentMonthName(item)
	}
	const onSelectDay = (index, item) => {
		setCurrentDay(item)
	}
	const setYear = () => {
		setNowYear(nowYear + 1)
	}
	const renderMonth = monthName.map((item, index) => {
		return (
			<li onClick={() => {
				onSelectMonth(index, item)
				setIsMenuOpen(false)
			}} key={index} className={(item === currentMonthName) ? 'navigation-calendar__item _active' : 'navigation-calendar__item'}>{item}</li>
		)
	})
	const elements = renderTasks(filteredTasks)
	return (
		<section className="calendar">
			<div className="calendar__container">
				<div className="calendar__wrapper">
					<div className="calendar__content">
						<div className="calendar__header header-calendar">
							<button onClick={onMenuOpen} type="button" className="header-calendar__icon"><span></span></button>
						</div>
						<div className="calendar__body body-calendar">
							<div className={isMenuOpen ? "body-calendar__navigation navigation-calendar _active" : "body-calendar__navigation navigation-calendar"}>
								<div data-da=".header-calendar,992,1"
									className="navigation-calendar__year _active">{nowYear}
								</div>
								<div className="navigation-calendar__months">

									<ul data-da=".header-calendar,992,1" className="navigation-calendar__list">
										{renderMonth}
									</ul>
								</div>
								<div onClick={setYear} className="navigation-calendar__year">{nowYear + 1}</div>
							</div>
							<div className="body-calendar__canvas canvas-calendar">
								<div className="canvas-calendar__week week-canvas">
									<ul className="week-canvas__list">
										<li className="week-canvas__item">Пн</li>
										<li className="week-canvas__item">Вт</li>
										<li className="week-canvas__item">Ср</li>
										<li className="week-canvas__item">Чт</li>
										<li className="week-canvas__item">Пт</li>
										<li className="week-canvas__item">Сб</li>
										<li className="week-canvas__item">Вс</li>
									</ul>
								</div>
								<div className="canvas-calendar__days days-calendar">
									<ul className="days-calendar__list">
										{daysArray.map((item, index) => {
											return (
												<li key={index} className={(item === currentDay) ? "days-calendar__item _active" : "days-calendar__item"} onClick={() => {
													onSelectDay(index, item)
													onTaskListOpen()
												}} >{item}</li>
											)
										})}
										{/*<li className="days-calendar__item item-points _active">1*/}
										{/*    <div className="item-points__wrapper">*/}
										{/*        <div className="item-points__point">*/}
										{/*        </div>*/}
										{/*    </div>*/}
										{/*</li>*/}
									</ul>
								</div>
							</div>
							<div className={isTaskListOpen ? "body-calendar__today today-calendar _active" : "body-calendar__today today-calendar"}>
								<div onClick={() => setIsTaskListOpen(false)} className="today-calendar__cross">+</div>
								<div className="today-calendar__header">
									<div className="today-calendar__number"><span>{currentDay}</span>{currentMonthName}</div>
									<div className="today-calendar__day">{getWeekDay(fullDate)}</div>
								</div>
								<div className="today-calendar__tasks tasks-today">
									{loadingStatus === 'loading' ? <Loader /> :
										filteredTasks.length ? <ul className="tasks-today__list">
											{elements}
										</ul> : <div >Задач на день нет</div>
									}
									{filteredTasks.length > 4 ? <div className="pagination">
										<button onClick={prevPage} className="page-arrow">
											&larr;
										</button>
										{[...Array(totalPages).keys()].map((el) => (
											<button
												onClick={() => setPage(el + 1)}
												key={el}
												className={`page ${page === el + 1 ? "active" : ""}`}
											>
												{el + 1}
											</button>
										))}
										<button onClick={nextPage} className="page-arrow">
											&rarr;
										</button>
									</div> : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section >
	)
}
export default Calendar