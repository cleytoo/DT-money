import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import * as S from './styles'

export const Transactions = () => {
  return (
    <S.TransactionsContainer>
      <Header />
      <Summary />
    </S.TransactionsContainer>
  )
}
