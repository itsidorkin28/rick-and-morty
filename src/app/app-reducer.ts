export enum APP_ACTIONS {
	SET_APP_INITIALIZED = 'APP/SET-APP-INITIALIZED',
	SET_APP_ERROR = 'APP/SET-APP-ERROR',
	SET_APP_STATUS = 'APP/SET-APP-STATUS',
}

const initialState = {
	status: 'idle' as RequestStatusType,
	error: null as AppErrorType,
	isAppInitialized: false as boolean,
}

export const appReducer = (state = initialState, action: AppActionsType) => {
	switch (action.type) {
		case APP_ACTIONS.SET_APP_INITIALIZED:
			return {...state, isAppInitialized: action.payload}
		case APP_ACTIONS.SET_APP_ERROR:
			return {...state, error: action.payload}
		case APP_ACTIONS.SET_APP_STATUS:
			return {...state, status: action.payload}
		default:
			return state
	}
}

// Actions
export const setAppInitialized = (payload: boolean) => {
	return {type: APP_ACTIONS.SET_APP_INITIALIZED, payload} as const
}
export const setAppStatus = (payload: RequestStatusType) => {
	return {type: APP_ACTIONS.SET_APP_STATUS, payload} as const
}
export const setAppError = (payload: AppErrorType) => {
	return {type: APP_ACTIONS.SET_APP_ERROR, payload} as const
}

// Types
export type AppActionsType =
	ReturnType<typeof setAppInitialized>
	| ReturnType<typeof setAppStatus>
	| ReturnType<typeof setAppError>

export type AppInitialStateType = typeof initialState

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppErrorType = string | null;