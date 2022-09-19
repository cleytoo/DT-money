import * as S from './styles'

import Logo from '../../assets/logo.svg'

export const Header = () => {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <img src={Logo} alt="" />
        <S.NewTransactionButton>Nova transação</S.NewTransactionButton>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}
