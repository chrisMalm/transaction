import { Paper, Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { fetchHistoryTransactions } from '../api/api'

interface listProps {
    amount?: number
    accountId: string
    balance: number
}
type fromTo = 'from' | 'to' | undefined

export interface Ihistory {
    account_id: string
    amount: number
}

export const TransactionList = ({ amount, accountId, balance }: listProps) => {
    const [state, setState] = useState<{
        isWithdrawl: fromTo
        history: Ihistory[]
    }>({
        isWithdrawl: undefined,
        history: [],
    })

    useEffect(() => {
        if (amount !== undefined) {
            setState((prevState) => ({
                ...prevState,
                isWithdrawl: amount < 0 ? 'from' : 'to',
            }))
        }
    }, [amount])

    useEffect(() => {
        fetchHistoryTransactions((data) => {
            console.log(data, 'data')

            setState((prevState) => ({
                ...prevState,
                history: data,
            }))
        })
    }, [])

    return (
        <>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Transaction History
                </Typography>
                {accountId && (
                    <Box>
                        <Box
                            data-type="transaction"
                            data-account-id={accountId}
                            data-amount={amount}
                            data-balance={balance}
                        >
                            <Typography variant="body1">
                                {`Transferred ${amount}$ ${state.isWithdrawl} Account ${accountId}`}
                            </Typography>
                            <Typography variant="body2">
                                {`The Current account Balance is: ${balance}$`}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Paper>

            {state.history.length > 0 &&
                state.history.map((historyTransaction, index) => (
                    <Paper key={index} elevation={3} sx={{ padding: 4, mt: 2 }}>
                        <Box>
                            <Typography variant="body1" className="AAAA">
                                {historyTransaction.amount < 0
                                    ? `Transferred ${historyTransaction.amount}$ from ${historyTransaction.account_id}`
                                    : `Transferred ${historyTransaction.amount}$ to ${historyTransaction.account_id}`}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
        </>
    )
}
