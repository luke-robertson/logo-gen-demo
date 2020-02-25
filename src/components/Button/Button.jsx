import React from 'react'
import { func, string } from 'prop-types'

import './Button.scss'

const Button = ({ text, action }) => {
	return (
		<div className="Button__container" onClick={action}>
			{text}
		</div>
	)
}

Button.propTypes = {
	text: string,
	action: func
}

export default Button
