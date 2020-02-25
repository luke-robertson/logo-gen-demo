import { APP_SUCCESS } from '../helpers/consts'

const initState = {
  policies: [],
  error: ''
}

export const app = (state = initState, action) => {
  switch (action.type) {
    case APP_SUCCESS:
      return {
        ...state,
        policies: action.policies
      }

    default:
      return state
  }
}
