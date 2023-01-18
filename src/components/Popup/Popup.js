import AddForm from "../AddForm/AddForm"
const Popup = ({ active, setActive }) => {
	return (
		<div id="popup" aria-hidden="true" onClick={() => setActive(false)} className={active ? "popup popup_show" : "popup"}>
			<div className="popup__wrapper " >
				<div className="popup__content" onClick={(e) => e.stopPropagation()}>
					<button onClick={() => setActive(false)} data-close type="button" className="popup__close">Закрыть</button>
					<div className="tasks__form form-task">
						<AddForm />
					</div>
				</div>
			</div>
		</div>
	)
}
export default Popup