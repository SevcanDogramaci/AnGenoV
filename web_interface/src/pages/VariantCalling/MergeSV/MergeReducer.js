import { Set } from 'immutable';

export function MergeReducer(state, action) {
	switch (action.type) {
		case 'add':
			console.log(action);

			if (action.paths.length > 1) {
				let list = action.paths.map((file) => file.path);
				console.log('add here->', list, list.concat(...state));
				return Set(list.concat(...state));
			} else if (action.paths.length == 0) {
				throw new Error();
			} else {
				console.log('add->', [...state, action.paths[0].path]);
				return Set([...state, action.paths[0].path]);
			}

		case 'remove':
			console.log(
				'remove->',
				state
					.filter((item) => item !== action.path)
					.toList()
					.toArray()
			);
			return state.filter((item) => item !== action.path);
		default:
			throw new Error();
	}
}
