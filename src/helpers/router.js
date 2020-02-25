import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import MainApp from '../pages/MainApp/MainApp'

export const history = createBrowserHistory()

const AppRouter = () => (
	<Router history={history}>
		<Switch>
			<Route path="/" component={MainApp} />
		</Switch>
	</Router>
)

export default AppRouter
