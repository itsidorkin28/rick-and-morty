import React from 'react'
import s from './CharacterCard.module.scss'
import styled from 'styled-components'

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

	const statusColor = status === 'Alive' ? 'green' : status === 'Dead' ? 'red' : 'grey'
	const characterType = type ? <p>Type: <span>{type}</span></p> : <p>Type: <span>unknown</span></p>
	return (
		<div className={s.characterCard}>
			<div className={s.avatar}>
				<img src={image} alt={name} />
			</div>
			<div className={s.description}>
				<h2>
					{name}
				</h2>
				<div className={s.status}>
					<StatusCircle color={statusColor} /> <span>{status}</span> - <span>{species}</span>
				</div>
				<div className={s.info}>
					<p>Gender: <span>{gender}</span></p>
					{characterType}
					<p>Location: <span>{location}</span></p>
				</div>
			</div>
		</div>
	)
})


