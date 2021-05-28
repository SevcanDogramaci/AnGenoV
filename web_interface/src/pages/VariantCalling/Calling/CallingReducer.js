import { Set } from 'immutable';

// eslint-disable-next-line import/prefer-default-export
export function CallingToolReducer(state, action) {
	console.log(state, action);
	switch (action.type) {
		case 'add':
			console.log(
				'add->',
				Set([...state.checkedCallers, action.name])
					.toList()
					.toArray()
			);
			return {
				...state,
				checkedCallers: Set([...state.checkedCallers, action.name]),
			};
		case 'delete':
			console.log(
				'delete->',
				state.checkedCallers
					.filter((name) => name !== action.name)
					.toList()
					.toArray()
			);
			return {
				...state,
				checkedCallers: state.checkedCallers.filter((name) => name !== action.name),
			};
		case 'update-read':
			return {
				...state,
				readOption: action.readOption,
				checkedCallers: Set(),
			};
		case 'update-sv-type':
			return { ...state, svType: action.svType, checkedCallers: Set() };
		default:
			throw new Error();
	}
}
