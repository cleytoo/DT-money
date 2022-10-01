import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  closeTransacionModal: (state: boolean) => void
  modalIsOpen: boolean
}

type CreateTransactionInput = Omit<Transaction, 'id' | 'createdAt'>

export const TransactionsContext = createContext({} as TransactionsContextType)

// prettier-ignore
export const TransactionsProvider = ({children}: {children: ReactNode}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeTransacionModal = useCallback((state: boolean) => setModalIsOpen(state),[])


  const fetchTransactions = useCallback( async (query?: string) => {
    const { data } =await api.get('transactions',{
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    setTransactions(data)
  },[])

  const createTransaction = useCallback(async (data:CreateTransactionInput) => {
    const { description, price, category, type } = data
    const res = await api.post('transactions', {
      description,
      price,
      type,
      category,
      createdAt: new Date(),
    })
    setTransactions(state => [...state, res.data])
  },[])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction, modalIsOpen, closeTransacionModal }}>
      {children}
    </TransactionsContext.Provider>
  )
}

// const url = new URL('http://localhost:3333/transactions')

// if(query) {
//   url.searchParams.append('q', query)
// }

// const res = await fetch(url)
// const data = await res.json()
