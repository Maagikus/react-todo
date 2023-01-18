
export const createTask = (task) => {
	return {
		type: 'CREATED_TASK',
		payload: task
	}
}
export const taskFetched = (tasks) => {
	return {
		type: 'TASK_FETCHED',
		payload: tasks
	}
}
export const taskFetching = () => {
	return {
		type: 'TASK_FETCHING'
	}
}
export const completedTask = (id) => {
	return {
		type: 'TASK_COMPLETED',
		payload: id
	}
}
export const completedTaskFetched = (tasks) => {
	return {
		type: 'COMPLETED_TASK_FETCHED',
		payload: tasks
	}
}
export const urlChanged = () => {
	return {
		type: 'URL_CHANGED'
	}
}
export const onTaskDeleted = (id) => {
	return {
		type: 'DELETED_TASK',
		payload: id
	}
}