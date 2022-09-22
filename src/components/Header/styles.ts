import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem 0;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NewTransactionButton = styled.button`
  height: 50px;
  padding: 0 1.25rem;
  border-radius: 6px;
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    transition: background-color 0.2s;
    background-color: ${(props) => props.theme['green-700']};
  }
`
