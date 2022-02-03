import {instance} from './instance'

export const charactersApi = {
	fetchAllCharacters(page: number, name: string, status: StatusType, species: string, type: string, gender: GenderType) {
		return instance.get<IAllCharacters>('api/character/', {params: {page, name, status, species, type, gender}})
	},
	fetchSingleCharacter(id: number) {
		return instance.get<ICharacter>(`api/character/${id}`)

	}
}

export type StatusType = 'unknown' | 'alive' | 'dead' | ''
export type GenderType = 'female' | 'male' | 'genderless' | 'unknown' | ''

export interface IInfo {
	count: number;
	pages: number;
	next: string | null;
	prev: string | null;
}

export interface IOrigin {
	name: string;
	url: string;
}

export interface ILocation {
	name: string;
	url: string;
}

export interface ICharacter {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: IOrigin;
	location: ILocation;
	image: string;
	episode: string[];
	url: string;
	created: Date;
}

export interface IAllCharacters {
	info: IInfo;
	results: ICharacter[];
}
