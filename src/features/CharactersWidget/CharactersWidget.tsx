import React from 'react'
import {CharacterCard} from './CharacterCard/CharacterCard'
import s from './CharactersPage.module.scss'

type PropsType = {}

export const CharactersPage = React.memo(({}: PropsType) => {
	return (
		<div className={s.charactersPage}>
			<CharacterCard />
			<CharacterCard />
			<CharacterCard />
			<CharacterCard />
			<CharacterCard />
			<CharacterCard />
			<CharacterCard />
		</div>
	)
})


