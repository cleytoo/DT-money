import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import * as S from './styles'

import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { memo } from 'react'

/**
 * Por que um component renderiza?
 *
 * - Hooks chenged (estado, contexto, reducer);
 * - Props changed (propiedades);
 * - Parent rerendered (component pai renderizou);
 *
 * Qual o fluxo de renderização
 * 1. React recria o HTML da interface do component(in memory)
 * 2. Compara a versão criada com a versão anterior
 * 3. SE mudou alguma coisa, ele reescreve o HTML na tela
 *
 * Memo:
 * 0. Hooks changed, Props changed(deep comparison)
 * 0.1: Comparar a versão anterior dos hooks e props
 * 0.2: SE mudou algo, ele vai permitir a nova renderização
 */

const queryFormSchema = z.object({
  query: z.string(),
})

type QueryFormInputs = z.infer<typeof queryFormSchema>

const SearchFormComponent = () => {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    ({ fetchTransactions }) => fetchTransactions
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<QueryFormInputs>({
    resolver: zodResolver(queryFormSchema),
    defaultValues: {
      query: '',
    },
  })

  const handleQueryTransactions = async (data: QueryFormInputs) => {
    await fetchTransactions(data.query)
  }

  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleQueryTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
