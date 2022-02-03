import {charactersApi, IAllCharacters} from '../../api/characters-api'
import {ThunkType} from '../../app/store'

export enum CHARACTERS_ACTIONS {
	SET_CHARACTERS = 'CHARACTERS/SET-CHARACTERS',
}

const initialState: IAllCharacters = {
	info: {
		count: 826,
		pages: 42,
		next: null,
		prev: null,
	},
	results: [
		{
			id: 1,
			name: 'Alex',
			status: 'status',
			species: 'species',
			type: 'type',
			gender: 'male',
			origin: {
				name: 'name',
				url: 'test',
			},
			location: {
				name: 'name',
				url: 'test',
			},
			image: 'image',
			episode: [],
			url: 'test',
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
export const fetchAllCharacters = (page: number): ThunkType => async dispatch => {
	try {
		const result = await charactersApi.fetchAllCharacters(page)
		dispatch(setCharacters(result.data))
	} catch (e) {
		console.log((e as Error).message)
	}
}

// Types
export type CharactersActionsType = ReturnType<typeof setCharacters>