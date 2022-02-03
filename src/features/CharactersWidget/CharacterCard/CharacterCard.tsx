import React, { useState } from 'react'
import s from './CharacterCard.module.scss'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {fetchSingleCharacterCharacters} from './ModalSingleCharacter/modalSingleCharacter-reducer'
import {ModalSingleCharacter} from './ModalSingleCharacter/ModalSingleCharacter'

type CharacterCardType = {
	name: string,
	status: string,
	species: string,
	type: string,
	gender: string,
	id: number,
	image: string,
	location: string,

}

const StatusCircle = styled.div<{color: string}>`
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: ${props => props.color};
`

export const CharacterCard = React.memo(({
	                                         name, status, id, image, location,
	                                         species, type, gender,
                                         }: CharacterCardType) => {
	const dispatch = useDispatch()
	const [modalOpen, setOpenModal] = useState<boolean>(false)
	const statusColor = status === 'Alive' ? 'green' : status === 'Dead' ? 'red' : 'grey'
	const characterType = type ? <p>Type: {type}</p> : <p>Type: unknown</p>
	const openModalWindow = () => {
		dispatch(fetchSingleCharacterCharacters(id))
		setOpenModal(true)
	}
	const closeModalWindow = () => {
		setOpenModal(false)
	}
	return (
		<div>
			{modalOpen && <ModalSingleCharacter closeModalWindow={closeModalWindow}/>}
			<div className={s.characterCard}>
				<div className={s.avatar}>
					<img src={image} alt={name} />
				</div>
				<div className={s.description}>
					<h2 onClick={openModalWindow}>
						{name}
					</h2>
					<div className={s.status}>
						<StatusCircle color={statusColor} /> <span>{status}</span> - <span>{species}</span>
					</div>
					<div className={s.info}>
						<p>Gender: {gender}</p>
						{characterType}
						<p>Location: {location}</p>
					</div>
				</div>
			</div>
		</div>

	)
})


