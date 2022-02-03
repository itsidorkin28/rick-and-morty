import React from 'react'
import s from './ModalSingleCharacter.module.scss'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {RootStateType} from '../../../../app/store'
import {ICharacter} from '../../../../api/characters-api'
import {RequestStatusType} from '../../../../app/app-reducer'
import {LinearProgress} from '@mui/material'

type ModalSingleCharacterType = {
	closeModalWindow: () => void
}

const StatusCircle = styled.div<{color: string}>`
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: ${props => props.color};
`

export const ModalSingleCharacter = React.memo(({closeModalWindow}: ModalSingleCharacterType) => {

	const character = useSelector<RootStateType, ICharacter>(state => state.modalSingleCharacter)
	const appStatus = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
	const statusColor = character.status === 'Alive' ? 'green' : character.status === 'Dead' ? 'red' : 'grey'

	const characterType = character.type ? <p>Type: {character.type}</p> :
		<p>Type: unknown</p>

	if (appStatus === 'failed') {
		closeModalWindow()
	}
	return (
		<div className={s.modalBackground}>
			{appStatus === 'loading'
				? <LinearProgress color='inherit' />
				: <div className={s.modalCard}>
					<div className={s.avatar}>
						<button className={s.btn} onClick={closeModalWindow}>Close</button>
						<img src={character.image} alt={character.name} />
					</div>
					<div className={s.description}>
						<h2>
							{character.name}
						</h2>
						<div className={s.status}>
							<StatusCircle color={statusColor} />
							<span>{character.status}</span> - <span>{character.species}</span>
						</div>
						<div className={s.info}>
							<p>Gender: {character.gender}</p>
							{characterType}
							<p>Location: {character.location.name}</p>
						</div>
					</div>
				</div>
			}
		</div>
	)
})


