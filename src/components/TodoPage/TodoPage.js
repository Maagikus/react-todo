import '../../styles.css'
import AddForm from "../AddForm/AddForm";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetData } from "../../hooks/getData.hook";
import usePagination from '../../hooks/usePagination.hook'
import { completedTask, completedTaskFetched, taskFetched, taskFetching, onTaskDeleted } from "../../store/actions";
import { doc, deleteDoc, getFirestore, addDoc, collection } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import Loader from "../Loader";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Popup from '../Popup/Popup'
const TodoPage = () => {
	const location = useLocation()
	const [activePage, setActivePage] = useState(true)
	const db = getFirestore()
	const auth = getAuth()
	const [user, loading, error] = useAuthState(auth)
	const dispatch = useDispatch()
	const tasksList = useSelector(state => state.project.tasks)
	const completed = useSelector(state => state.project.completed)
	const taskComplet = useSelector(state => state.project.completedTask)
	const loadingStatus = useSelector(state => state.project.loadingStatus)
	const { request } = useGetData()
	const [modalActive, setModalActive] = useState(false)
	const {
		firstContentIndex,
		lastContentIndex,
		nextPage,
		prevPage,
		page,
		setPage,
		totalPages,
	} = usePagination({
		contentPerPage: 4,
		count: activePage ? tasksList.length : completed.length,
	});
	useEffect(() => {
		dispatch(taskFetching())
		request('tasks')
			.then(data => {
				dispatch(taskFetched(data))
			})
		request('completed')
			.then(data => dispatch(completedTaskFetched(data)))
	}, [])
	const onCmplete = useCallback(async (id) => {
		dispatch(completedTask(id))
		await deleteDoc(doc(db, `/users/${user.uid}/tasks`, id))
	}, [])
	const onDelete = async (id) => {
		await deleteDoc(doc(db, `/users/${user.uid}/completed`, id));
		dispatch(onTaskDeleted(id))
	}
	const onCompletedTask = async (id) => {
		const item = tasksList.filter(item => {
			return item.id === id
		})
		item.forEach(async (element) => {
			const item = {
				date: element.date,
				task: element.task,
				time: element.time,
			}
			await addDoc(collection(db, `/users/${user.uid}/completed`), item);
		});
	}
	function renderTasks(arr) {
		const items = arr.slice(firstContentIndex, lastContentIndex).map(({ date, task, id }, index) => {
			return (
				<li key={index} className="tasks__item">
					<div className="tasks__date">{date}</div>
					<div className="tasks__task"><span>{index + 1}.</span>{task}</div>
					<button onClick={() => {
						if (arr === tasksList) {
							console.log(id);
							onCmplete(id)
							onCompletedTask(id)
						} else {
							onDelete(id)
						}
					}} type="submit" className={arr === tasksList ? "tasks__button tasks__button-active button" : "tasks__button tasks__button-completed button"}></button>
				</li >
			)
		})
		return (items)
	}
	const changeActivePage = () => {
		if (activePage) {
			setActivePage(false)
		} else {
			setActivePage(true)
		}
	}
	const element = renderTasks(tasksList)
	const completedElements = renderTasks(completed)
	return (
		<section className="tasks">
			<div className="tasks__container">
				<div className="tasks__wrapper">
					<div className="tasks__content">
						<div className="tasks__header">
							<div className="tasks__menu menu-tasks">
								<ul className="menu-tasks__list">
									<li className={activePage ? ' menu-tasks__item _active' : 'menu-tasks__item'}>
										<a onClick={changeActivePage} href="#" className="menu-tasks__link">Активные задачи</a>
									</li>
									<li className={!activePage ? ' menu-tasks__item _active' : 'menu-tasks__item'}>
										<a onClick={changeActivePage} href="#" className="menu-tasks__link">Завершенные задачи</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="tasks__body">
							{(tasksList.length && activePage) || (!activePage && completed.length) ?
								(loadingStatus === 'loading' ? <Loader /> : <ul className="tasks__list">
									{
										activePage ? element : completedElements
									}
								</ul>)
								: <div className='empty' >ничего нет</div>}

							{(tasksList.length > 4 && activePage) || (!activePage && completed.length > 4) ?
								<div className="pagination">
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
						<div data-popup="#popup" className="tasks__add">
							<button onClick={() => setModalActive(true)} type="submit" className="button">+</button>
						</div>
					</div>
					<aside className="tasks__form form-task">
						<AddForm />
					</aside>
				</div>
			</div>
			<Popup active={modalActive} setActive={setModalActive} />
		</section >
	)
}
export default TodoPage