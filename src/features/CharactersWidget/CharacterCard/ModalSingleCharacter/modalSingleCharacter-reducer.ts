import {charactersApi, GenderType, IAllCharacters, StatusType} from '../../api/characters-api'
import {ThunkType} from '../../app/store'
import {setAppError, setAppInitialized} from '../../app/app-reducer'

export enum CHARACTERS_ACTIONS {
	SET_CHARACTERS = 'CHARACTERS/SET-CHARACTERS',
}

const initialState: IAllCharacters = {
	info: {
		count: 20,
		pages: 1,
		next: null,
		prev: null,
	},
	results: [
		{
			id: 1,
			name: 'unknown',
			status: 'unknown',
			species: 'unknown',
			type: 'unknown',
			gender: 'unknown',
			origin: {
				name: 'unknown',
				url: 'unknown',
			},
			location: {
				name: 'unknown',
				url: 'unknown',
			},
			image: 'unknown',
			episode: [],
			url: 'unknown',
			created: new Date(),
		},
	],
}

export const charactersReducer = (state = initialState, action: CharactersActionsType) => {
	switch (action.type) {
		case CHARACTERS_ACTIONS.SET_CHARACTERS:
			return {...state, info: {...action.payload.info}, results: [...action.payload.results]}
		default:
			return state
	}
}

// Actions
export const setCharacters = (payload: IAllCharacters) => {
	return {type: CHARACTERS_ACTIONS.SET_CHARACTERS, payload} as const
}

// Thunks
export const fetchAllCharacters = (page: number, name: string,
                                   status: StatusType, species: string,
                                   type: string, gender: GenderType): ThunkType => async dispatch => {
	try {
		const result = await charactersApi.fetchAllCharacters(page, name, status, species, type, gender)
		dispatch(setCharacters(result.data))
	} catch (e) {
		dispatch(setAppError((e as Error).message))
	} finally {
		dispatch(setAppInitialized(true))
	}
}



// Types
export type CharactersActionsType = ReturnType<typeof setCharacters>