import styled from 'styled-components'

export const Title = styled.h1`
  color: #3F51B5;
  font-size: 3rem;
  padding: 0;
  margin: 0;
`

type FlexProps = {
  direction?: string,
  alignItems?: string,
  justifyContent?: string,
  grow?: string
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  direction:  ${props => props.direction} ;
  align-items:  ${props => props.alignItems} ;
  justify-content:  ${props => props.justifyContent} ;
  flex-grow: ${props => props.grow};
`