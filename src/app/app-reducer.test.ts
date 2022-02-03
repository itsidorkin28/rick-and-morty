import {AppInitialStateType, appReducer, setAppError, setAppInitialized, setAppStatus} from './app-reducer'

let startState: AppInitialStateType

beforeEach(() => {
	startState = {
		isAppInitialized: false,
		status: 'idle',
		error: null,
	}
})

test('app should be initialized', () => {
	const action = setAppInitialized(true)
	const endState = appReducer(startState, action)

	expect(endState.isAppInitialized).toBe(true)
})

test('correct status message should be set', () => {
	const action = setAppStatus('succeeded')
	const endState = appReducer(startState, action)

	expect(endState.status).toBe('succeeded')
})

test('correct error message should be set', () => {
	const action = setAppError('some error')
	const endState = appReducer(startState, action)

	expect(endState.error).toBe('some error')
})