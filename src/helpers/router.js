import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'

import store from '../helpers/store'
import MainApp from '../pages/MainApp/MainApp'

export const history = createBrowserHistory()

const AppRouter = () => (
	<Provider store={store}>
		<Router history={history}>
			<Switch>
				<Route path="/" component={MainApp} />
			</Switch>
		</Router>
	</Provider>
)

export default AppRouter
