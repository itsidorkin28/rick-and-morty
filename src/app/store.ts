import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {CharactersActionsType, charactersReducer} from '../features/CharactersWidget/characters-reducer'
import {AppActionsType, appReducer} from './app-reducer'
import {
	modalSingleCharacterReducer,
	ModalSingleCharactersActionsType,
} from '../features/CharactersWidget/CharacterCard/ModalSingleCharacter/modalSingleCharacter-reducer'

const rootReducer = combineReducers({
	app: appReducer,
	characters: charactersReducer,
	modalSingleCharacter: modalSingleCharacterReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootStateType = ReturnType<typeof rootReducer>

export type RootActionsType = CharactersActionsType | AppActionsType | ModalSingleCharactersActionsType

export type ThunkType = ThunkAction<void, RootStateType, unknown, RootActionsType>

// @ts-ignore
window.store = store