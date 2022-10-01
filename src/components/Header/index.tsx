import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'
import { TransactionModal } from '../TransactionModal'

import * as S from './styles'

import Logo from '../../assets/logo.svg'
// import {useContextSelector} from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

export const Header = () => {
  const { modalIsOpen, closeTransacionModal } = useContextSelector(
    TransactionsContext,
    (ctx) => {
      const { modalIsOpen, closeTransacionModal } = ctx
      return { modalIsOpen, closeTransacionModal }
    }
  )

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <img src={Logo} alt="" />
        <Dialog.Root open={modalIsOpen} onOpenChange={closeTransacionModal}>
          <Dialog.Trigger asChild>
            <S.NewTransactionButton>Nova transação</S.NewTransactionButton>
          </Dialog.Trigger>
          <TransactionModal />
        </Dialog.Root>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}
