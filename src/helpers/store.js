import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const makeHistory = createBrowserHistory()

export const history = makeHistory

const configureStore = createStore(
	rootReducer(history),
	compose(applyMiddleware(routerMiddleware(history), thunk))
)

export default configureStore
