import { completedTask } from "../actions"

const initialState = {
	tasks: [],
	task: {},
	completed: [],
	loadingStatus: 'idle',
	completedTask: {}
}

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CREATED_TASK':
			return {
				...state,
				task: action.payload,
				tasks: [...state.tasks, action.payload]
			}
		case 'TASK_FETCHED':
			return {
				...state,
				tasks: [...state.tasks, ...action.payload],
				loadingStatus: 'completed'
			}
		case 'TASK_FETCHING':
			return {
				...state,
				loadingStatus: 'loading'
			}
		case 'COMPLETED_TASK_FETCHED':
			return {
				...state,
				completed: [...state.completed, ...action.payload]
			}
		case 'TASK_COMPLETED':
			const newCompleted = state.tasks.filter(item => item.id === action.payload)
			return {
				...state,
				tasks: state.tasks.filter(item => item.id !== action.payload),
				completed: [...state.completed, ...newCompleted],
				completedTask: newCompleted

			}
		case 'DELETED_TASK':
			return {
				...state,
				completed: state.completed.filter(item => item.id !== action.payload)
			}
		case 'URL_CHANGED':
			return {
				...state,
				tasks: [],
				task: {},
				completed: []
			}
		default:
			return state
	}
}
export default projectReducer