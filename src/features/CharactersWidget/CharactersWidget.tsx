import React, {ChangeEvent, useEffect, useState} from 'react'
import {CharacterCard} from './CharacterCard/CharacterCard'
import s from './CharactersWidget.module.scss'
import {fetchAllCharacters} from './characters-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../../app/store'
import {FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent} from '@mui/material'
import {GenderType, IAllCharacters, StatusType} from '../../api/characters-api'
import {useDebounce} from '../../CustomHooks/useDebounce'

type CharactersWidgetType = {
	isAppInitialized: boolean
}

export const CharactersWidget = React.memo(({isAppInitialized}: CharactersWidgetType) => {
	const dispatch = useDispatch()

	const characters = useSelector<RootStateType, IAllCharacters>(state => state.characters)

	const [currentPage, setCurrentPage] = useState<number>(1)
	const [name, setName] = useState<string>('')
	const [species, setSpecies] = useState<string>('')
	const [type, setType] = useState<string>('')
	const [status, setStatus] = useState<StatusType>('')
	const [gender, setGender] = useState<GenderType>('')
	const debouncedName = useDebounce<string>(name, 1000)
	const debouncedSpecies = useDebounce<string>(species, 1000)
	const debouncedType = useDebounce<string>(type, 1000)

	const statusSelectHandleChange = (event: SelectChangeEvent) => {
		setStatus(event.target.value as StatusType)
	}

	const genderSelectHandleChange = (event: SelectChangeEvent) => {
		setGender(event.target.value as GenderType)
	}

	const nameSearchHandle = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value)
	}
	const speciesSearchHandle = (e: ChangeEvent<HTMLInputElement>) => {
		setSpecies(e.currentTarget.value)
	}
	const typeSearchHandle = (e: ChangeEvent<HTMLInputElement>) => {
		setType(e.currentTarget.value)
	}

	useEffect(() => {
		dispatch(fetchAllCharacters(currentPage, debouncedName, status, debouncedSpecies, debouncedType, gender))
	}, [dispatch, currentPage, status, debouncedSpecies, debouncedType, gender, debouncedName])

	const charactersOfList = characters.results.map(c => {
		return (
			<CharacterCard key={c.id}
			               id={c.id}
			               image={c.image}
			               name={c.name}
			               status={c.status}
			               type={c.type}
			               species={c.species}
			               gender={c.gender}
			               location={c.location.name}
			/>
		)
	})
	if (!isAppInitialized) {
		return <></>
	}
	return (
		<div>
			<div className={s.charactersWidget}>
				<div className={s.searchInput}>
					<input type='text' value={name} onChange={nameSearchHandle} placeholder={'Name...'} />
					<input type='text' value={species} onChange={speciesSearchHandle}
					       placeholder={'Species...'} />
					<input type='text' value={type} onChange={typeSearchHandle} placeholder={'Type...'} />
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Status</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={status}
							label='Status'
							onChange={statusSelectHandleChange}
							sx={{backgroundColor: 'white', margin: '0 5px'}}
						>
							<MenuItem value={''}>All</MenuItem>
							<MenuItem value={'alive'}>Alive</MenuItem>
							<MenuItem value={'dead'}>Dead</MenuItem>
							<MenuItem value={'unknown'}>Unknown</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Gender</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={gender}
							label='Gender'
							onChange={genderSelectHandleChange}
							sx={{backgroundColor: 'white', margin: '0 5px'}}
						>
							<MenuItem value={''}>All</MenuItem>
							<MenuItem value={'male'}>Male</MenuItem>
							<MenuItem value={'female'}>Female</MenuItem>
							<MenuItem value={'genderless'}>Genderless</MenuItem>
							<MenuItem value={'unknown'}>Unknown</MenuItem>
						</Select>
					</FormControl>
				</div>

				<div className={s.charactersOfList}>
					{charactersOfList}
				</div>
				<div className={s.pagination}>
					<Pagination count={characters.info.pages}
					            variant='outlined'
					            shape='rounded'
					            defaultPage={1}
					            onChange={(e, page) => setCurrentPage(page)} />
				</div>
			</div>
		</div>

	)
})


