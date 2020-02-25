import { APP_SUCCESS } from '../helpers/consts'

export const fetchData = () => async dispatch => {
	const res = await fetch(
		'https://7946a218-d225-4d0e-80ac-450bbc9713a0.mock.pstmn.io/booking'
	)
	const { policies } = await res.json()

	dispatch({ type: APP_SUCCESS, policies })
}
