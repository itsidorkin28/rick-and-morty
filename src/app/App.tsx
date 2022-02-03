import React from 'react'
import './App.scss'
import {CharactersWidget} from '../features/CharactersWidget/CharactersWidget'
import {useSelector} from 'react-redux'
import {RootStateType} from './store'
import {LinearProgress} from '@mui/material'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'

function App() {

	const isAppInitialized = useSelector<RootStateType, boolean>(state => state.app.isAppInitialized)

	return (
		<div>
			{!isAppInitialized && <LinearProgress color='inherit' />}
			<div className='app-wrapper'>
				<CharactersWidget isAppInitialized={isAppInitialized}/>
			</div>
			<ErrorSnackbar />
		</div>

	)
}

export default App
