import {charactersReducer, setCharacters} from './characters-reducer'
import {IAllCharacters} from '../../api/characters-api'

let startState: IAllCharacters

beforeEach(() => {
	startState = {
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
})

test('characters should be add', () => {
	const action = setCharacters({
		info: {
			count: 40,
			pages: 2,
			next: null,
			prev: null,
		},
		results: [
			{
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
			},
		],
	})
	const endState = charactersReducer(startState, action)

	expect(endState.results.length).toBe(1)
	expect(endState.results[0].name).toBe('Alena')
	expect(endState.results[0].id).toBe(2)
	expect(endState.info.count).toBe(40)
	expect(endState.info.pages).toBe(2)
})