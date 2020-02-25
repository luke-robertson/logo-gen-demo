import React, { useEffect, useState } from 'react'
import { func, object } from 'prop-types'
import { fabric } from 'fabric'

import Button from '../../components/Button/Button'

import './MainApp.scss'

const generateRandomColor = () =>
	'#' + Math.floor(Math.random() * 16777215).toString(16)

// if i had time, i would abstract these away out of this render method, maybe its own class would be nice

const MainApp = ({ app, fetch }) => {
	const [canvas, setCanvas] = useState({})
	const [history, setHistory] = useState([])
	const [activeHistory, setActiveHistory] = useState(0)

	useEffect(() => {
		const canvas = new fabric.Canvas('canvas')
		setCanvas(canvas)
		setHistory([JSON.stringify(canvas)])
	}, [])

	const getLatestHistory = () => {
		// do a check to ensure this history object exists
		return JSON.parse(history[history.length - 1])
	}

	const addHistory = () => {
		// this should be on a event rather than inside the funcs
		const makeHistory = JSON.stringify(canvas)
		if (history.length - 1 > activeHistory) {
			// if its in the past and new item added then start history from current item, remove other history.
			const cutHistory = history.slice(0, activeHistory + 1)
			const newHistory = [...cutHistory, makeHistory]
			setHistory(newHistory)
			setActiveHistory(activeHistory + 1)
		} else {
			const newHistory = [...history, makeHistory]
			setHistory(newHistory)
			setActiveHistory(activeHistory + 1)
		}
	}

	const offsetHistory = type => {
		// todo : instead of getting latest, get the currently active
		const historyObj = getLatestHistory()
		const data = historyObj.objects.reverse()
		// this should probaly detect if there are any items at the current cords rather than checking the history
		const count = data.reduce(
			(acc, item) => {
				if (item.type === type && acc.finished === false) {
					acc.count = acc.count + 1
					acc.prev = type
				} else {
					acc.finished = true
				}
				return acc
			},
			{ count: 0, finished: false }
		)

		return count
	}

	const addSquare = () => {
		const hasHistory = offsetHistory('rect').count
		const sq = new fabric.Rect({
			top: 100 + hasHistory * 10,
			left: 100 + hasHistory * 10,
			width: 60,
			height: 60,
			fill: generateRandomColor()
		})
		canvas.add(sq)
		addHistory()
	}

	const addCircle = () => {
		const hasHistory = offsetHistory('circle').count
		const cr = new fabric.Circle({
			top: 100 + hasHistory * 10,
			left: 100 + hasHistory * 10,
			radius: 60,
			fill: generateRandomColor()
		})
		canvas.add(cr)
		addHistory()
	}

	const deleteItem = () => {
		canvas.remove(canvas.getActiveObject())
		addHistory()
	}

	const sendToBack = () => {
		const active = canvas.getActiveObject()
		canvas.sendToBack(active)
		canvas.discardActiveObject()
		addHistory()
	}

	const sendToFront = () => {
		canvas.bringToFront(canvas.getActiveObject())
		canvas.discardActiveObject()
		addHistory()
	}

	const saveToPng = () =>
		canvas.toDataURL({
			format: 'png',
			left: 0,
			top: 0,
			width: canvas.width,
			height: canvas.height
		})

	const hackForceDownload = uri => {
		let link = document.createElement('a')
		link.download = 'best_image_ever.png'
		link.href = uri
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		link = null
	}

	const undo = () => {
		const stateNo = activeHistory - 1
		const getPrevState = history[stateNo]
		canvas.loadFromJSON(getPrevState, () => {
			setActiveHistory(activeHistory - 1)
			canvas.renderAll()
		})
	}

	const redo = () => {
		const getPrevState = history[activeHistory + 1]
		canvas.loadFromJSON(getPrevState, () => {
			setActiveHistory(activeHistory + 1)
			canvas.renderAll()
		})
	}

	return (
		<div className="MainApp__container">
			<h1 className="MainApp__title">Super Fun Logo Creator</h1>
			<div className="canvas__container">
				<canvas id="canvas" width="1000" height="500" />
			</div>
			{/** 
				I dont have time to abastract these all to their own components, 
				but they should really be, ButtonContainer, Title, CanvasContainer etc etc 
			**/}
			<div className="button__container">
				<Button text="Add Square" action={addSquare} />
				<Button text="Add Circle" action={addCircle} />
				<Button text="Delete Item" action={deleteItem} />
				<Button text="Send To Back" action={sendToBack} />
				<Button text="Send To Front" action={sendToFront} />
				<Button
					text="Save Png"
					action={() => hackForceDownload(saveToPng())}
				/>
				<Button text="Undo" action={undo} />
				<Button text="Redo" action={redo} />
			</div>
		</div>
	)
}

MainApp.propTypes = {
	app: object,
	fetch: func
}

export default MainApp
