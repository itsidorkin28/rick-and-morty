import {ICharacter} from '../../../../api/characters-api'
import {modalSingleCharacterReducer, setSingleCharacter} from './modalSingleCharacter-reducer'

let startState: ICharacter

beforeEach(() => {
	startState = {
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
	}
})

test('single characters should be added', () => {
	const action = setSingleCharacter({
		id: 2,
		name: 'Alena',
		status: 'status',
		species: 'species',
		type: 'type',
		gender: 'female',
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
	})
	const endState = modalSingleCharacterReducer(startState, action)

	expect(endState.name).toBe('Alena')
	expect(endState.id).toBe(2)
})