import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { useTransaction } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormat } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import * as S from './styles'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

export const Transactions = () => {
  const { transactions } = useTransaction()

  return (
    <div>
      <Header />
      <Summary />

      <S.TransactionsContainer>
        <SearchForm />
        <S.TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <S.PriceHighLight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormat.format(transaction.price)}
                  </S.PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  )
}
