import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Joke from './Joke'
import {useGlobalState} from '../utils/stateContext'

const StyledLink = styled(Link) `
	text-decoration: none;
`
export default function Jokes() {
	const {store} = useGlobalState()
	const {jokes} = store
	if(!jokes) return null

	return  (
		<div>
			{jokes.map((joke,index) => {
				return (
					<StyledLink key={joke.id} to={`/jokes/${joke.id}`}>
						<Joke index={index} joke={joke} />
					</StyledLink>
				)
			})}
		</div>
	)
}
