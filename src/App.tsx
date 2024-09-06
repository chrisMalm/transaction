import { useState } from 'react'
import { Grid, Container } from '@mui/material'
import { TransactionList } from './components/TransactionList'
import { FormComponent } from './components/FormComponent'
import { fetchNewBalance } from './api/api'
interface Transactions {
    balance: number
    accountId: string
    amount?: number
}
export const App = () => {
    // this is like merge 3 usestate together
    const [transaction, setTransaction] = useState<Transactions>({
        balance: 0,
        accountId: '',
        amount: 0,
    })
    console.log(transaction, 'trans')

    const handleAddTranscription = async (
        accountId: string,
        amount: number
    ) => {
        if (accountId && amount) {
            const newTransaction = { ...transaction, accountId, amount }
            setTransaction(newTransaction)
            await fetchNewBalance(accountId, (balance) => {
                setTransaction((prev) => ({ ...prev, balance }))
            })
        } else {
            console.log('error')
        }
    }
    return (
        <Container sx={{ marginTop: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <FormComponent onAddTransaction={handleAddTranscription} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TransactionList {...transaction} />
                </Grid>
            </Grid>
        </Container>
    )
}
