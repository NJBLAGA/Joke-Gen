import React,{ useState,useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import Moment from 'react-moment'
import {getJoke} from '../services/jokeServices'
import {Button, Panel} from './Styled'
import {useGlobalState} from '../utils/stateContext'
import {deleteJoke} from '../services/jokeServices'

export default function JokeDetails() {
	const [joke,setJoke] = useState(null)
	const {id} = useParams()
	let history = useHistory()
	const {store,dispatch} = useGlobalState()
	const {loggedInUser} = store
	useEffect(() => {
		getJoke(id)
		.then((joke) => setJoke(joke))
		.catch((error) => console.log(error))
	},[id])

	if (!joke) return null
	function handleDelete() {
		deleteJoke(id)
		.then(() => {
			dispatch({type: 'deleteJoke', data: id})
			history.push('/jokes')
		})
	}
	return (
		<div>
			<p>Written by: {joke.author}</p>			
			<p>Posted on: 
				<Moment format='D MMM YYYY'>{joke.posted}</Moment>
			</p>			
			<p>Category: {joke.category}</p>
			<p>{joke.body}</p>
			{loggedInUser === joke.author &&
				<Panel>
					<Button onClick={() => history.push(`/jokes/update/${id}`)}>Update</Button>
					<Button onClick={handleDelete}>Delete</Button>
				</Panel>
			}
		</div>
	)
}
