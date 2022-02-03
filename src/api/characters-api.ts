import { instance } from "./instance"

export const characterAPI = {
	fetchAllCharacters() {
		return instance.get('api/character/')
	}
}