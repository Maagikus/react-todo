import '../../styles.css'
import { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { createTask } from "../../store/actions";
import { getDatabase, ref, set } from "firebase/database";
import ReactDateInputs from 'react-date-inputs';
import TimePicker from 'react-time-picker';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { nanoid } from "@reduxjs/toolkit";
import { useList } from "react-firebase-hooks/database";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
const AddForm = () => {
	const auth = getAuth()
	const [user, loading, error] = useAuthState(auth)
	const db = getFirestore()
	const dispatch = useDispatch()
	const [date, setDate] = useState('')
	const [task, setTask] = useState('')
	const [formValid, setFormValid] = useState(false)
	const [taskDirty, setTaskDirty] = useState(false)
	const [taskError, setTaskError] = useState('Поле не должно быть пустым')
	const [time, setTime] = useState('10:00');
	const taskHandler = e => {
		if (e.target.value.length < 5) {
			setTaskError('Задача должна быть длиннее')
		} else {
			setTaskDirty(false)
			setTaskError('')
			setFormValid(true)
		}
	}
	const blurHandler = e => {
		switch (e.target.name) {
			case 'task':
				setTaskDirty(true)
				break
		}
	}
	const writeTodosData = async ({ id, date, time, task }) => {
		try {
			const docRef = await addDoc(collection(db, `users/${user.uid}/tasks`), {
				date: date,
				time: time,
				task: task
			});

			await setDoc(docRef, { id: docRef.id }, { merge: true })
			dispatch(createTask({ date, time, task, id: docRef.id }))
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}
	const onSubmit = (e) => {
		e.preventDefault()
		const data = {
			date: date,
			time: time,
			task: task
		}
		writeTodosData(data)
		setDate('')
		setTime('')
		setTask('')
		setFormValid(false)
	}
	return (
		<>
			<h2 className="form-task__header">Добавить задачу</h2>
			<form onSubmit={onSubmit} action="#" className="form-task__body">
				<div className="form-task__points points-form">
					<div className="points-form__date">
						<label htmlFor="date">Дата:</label>
						<input value={date} onChange={(e) => setDate(e.target.value)} type="date" name="date" data-error="Error" placeholder="01.09.2022" className="points-form__input points-form__input-wide input" />
					</div>
					<div className="points-form__time">
						<TimePicker onChange={setTime} value={time} />
					</div>
				</div>
				<div className="form-task__task task-form">
					<label htmlFor="task" className="task-form__task">Задача:</label>
					{(taskDirty && taskError) && <div style={{ color: 'red' }}>{taskError}</div>}
					<textarea onBlur={e => blurHandler(e)} value={task} onChange={(e) => {
						setTask(e.target.value)
						taskHandler(e)
					}} className="input" name="task" id="" placeholder="Купить хлеб" cols="30" rows="10"></textarea>
				</div>
				<button disabled={!formValid} type="submit" className="form-task__button button">Добавить</button>
			</form>
		</>
	)
}
export default AddForm
