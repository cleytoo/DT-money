import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import * as S from './styles'

const queryFormSchema = z.object({
  query: z.string(),
})

type QueryFormInputs = z.infer<typeof queryFormSchema>

export const SearchForm = () => {
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
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
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
