import axios from 'axios'
import { Ihistory } from '../components/TransactionList'

export const fetchHistoryTransactions = async (
    updateHistory: (data: Ihistory[]) => void
) => {
    try {
        const response = await axios.get<Ihistory[]>(
            'https://infra.devskills.app/api/accounting/transactions'
        )
        console.log('get history transactions response:', response.data)
        updateHistory(response.data)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error making GET request:', error.response?.data)
        } else {
            console.error('Unexpected error:', error)
        }
    }
}

export const fetchNewBalance = async (
    accountId: string,
    setBalance: (balance: number) => void
) => {
    if (accountId) {
        try {
            const response = await axios.get(
                `https://infra.devskills.app/api/accounting/accounts/${accountId}`
            )

            console.log('get new balance response :', response.data)
            setBalance(response.data.balance)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    'Error making POST request:',
                    error.response?.data
                )
                // setError('Failed to create transaction.')
            } else {
                console.error('Unexpected error:', error)
                // setError('An unexpected error occurred.')
            }
        }
    } else {
        // setError('Please enter an amount and account ID.')
    }
}

export const postTransaction = async (
    amount: number,
    accountId: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    onAddTransaction: (accountId: string, amount: number) => void
) => {
    try {
        const response = await axios.post(
            'https://infra.devskills.app/api/accounting/transaction',
            {
                account_id: accountId,
                amount: amount,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        console.log('Transaction response:', response.data)
        onAddTransaction(accountId, amount)
        setError(null)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error making POST request:', error.response?.data)
            setError('Failed to create transaction.')
        } else {
            console.error('Unexpected error:', error)
            setError('An unexpected error occurred.')
        }
    }
}
