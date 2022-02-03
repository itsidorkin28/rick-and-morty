import {charactersApi, ICharacter} from '../../../../api/characters-api'
import {setAppError, setAppStatus} from '../../../../app/app-reducer'
import { ThunkType } from '../../../../app/store'

export enum MODAL_SINGLE_CHARACTER_ACTIONS {
	SET_MODAL_SINGLE_CHARACTER = 'CHARACTERS/SET-MODAL-SINGLE-CHARACTER',
}

const initialState: ICharacter = {
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
}


export const modalSingleCharacterReducer = (state = initialState, action: ModalSingleCharactersActionsType) => {
	switch (action.type) {
		case MODAL_SINGLE_CHARACTER_ACTIONS.SET_MODAL_SINGLE_CHARACTER:
			return {...state, ...action.payload}
		default:
			return state
	}
}

// Actions
export const setSingleCharacter = (payload: ICharacter) => {
	return {type: MODAL_SINGLE_CHARACTER_ACTIONS.SET_MODAL_SINGLE_CHARACTER, payload} as const
}

// Thunks
export const fetchSingleCharacterCharacters = (id: number): ThunkType => async dispatch => {
	dispatch(setAppStatus('loading'))
	try {
		const result = await charactersApi.fetchSingleCharacter(id)
		dispatch(setSingleCharacter(result.data))
		dispatch(setAppStatus('succeeded'))
	} catch (e) {
		dispatch(setAppError((e as Error).message))
		dispatch(setAppStatus('failed'))
	}
}


// Types
export type ModalSingleCharactersActionsType = ReturnType<typeof setSingleCharacter>