import styled from 'styled-components' 
 
const WHITE = 0xffffff

export const COLOUR1 = 0x86b2db
export const COLOUR2 = parseInt(getComplementaryColour(COLOUR1),16)

export const Header = styled.h1 `
	font-family: Arial,sans-serif;
	color: ${toHexColourString(COLOUR1)};
`

export const Panel = styled.div `
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`

export const Span = styled.span `
	padding: .5em;
	margin: 1em;
	font-family: Arial, sans-serif;
	color: ${toHexColourString(getComplementaryColour(COLOUR1))};
`

export const Button = styled(Span) `
	border: ${"1px solid " + toHexColourString(COLOUR1)};
	cursor: pointer;
`

export const Input = styled.input `
	height: 1em;
	margin: .5em;
`

export const BigTextInput = styled(Input) `
	height: 100px;
	width: 50%;
`

export const Label = styled.span `
	font-family: Arial,sans-serif;
	color: ${props => props.colour ? `${toHexColourString(props.colour)}` : "black"};
`

export const Line = styled.div `
	color: ${props => props.colour ? `${toHexColourString(props.colour)}` : "black"};
	background-color: ${props => props.colour ? toHexColourString(getComplementaryColour(props.colour)) : "white"};
	font-size: 1.5em;
	font-family: Arial,sans-serif;
	padding: .5em;
`

function getComplementaryColour(colour) {
	const compColour = (WHITE - colour).toString(16)
	return compColour
}

function toHexColourString(colour) {
	let hexColourString = colour.toString(16)
	hexColourString = `#${"000000".substr(0, 6-hexColourString.length)}${hexColourString}`
	return hexColourString
}