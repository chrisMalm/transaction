import { Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { postTransaction } from '../api/api'

interface TransactionFormProps {
    onAddTransaction: (accountId: string, amount: number) => void
}

export const FormComponent = ({ onAddTransaction }: TransactionFormProps) => {
    const [transaction, setTransaction] = useState({
        accountId: '',
        amount: 0,
    })
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (transaction.accountId && transaction.amount) {
            await postTransaction(
                transaction.amount,
                transaction.accountId,
                setError,
                onAddTransaction
            )
        } else {
            setError('Please enter an amount and account ID.')
        }
        setTransaction((prev) => ({
            ...prev,
            accountId: '',
            amount: 0,
        }))
    }
    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Add Transaction
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Account ID"
                    value={transaction.accountId}
                    onChange={(e) =>
                        setTransaction({
                            ...transaction,
                            accountId: e.target.value,
                        })
                    }
                    data-type="account-id"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={transaction.amount}
                    onChange={(e) =>
                        setTransaction({
                            ...transaction,
                            amount: parseFloat(e.target.value),
                        })
                    }
                    data-type="amount"
                    margin="normal"
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    data-type="transaction-submit"
                    sx={{ marginTop: 2 }}
                >
                    Submit
                </Button>
                {error && (
                    <Typography
                        color="error"
                        variant="body2"
                        sx={{ marginTop: 2 }}
                    >
                        {error}
                    </Typography>
                )}
            </form>
        </Paper>
    )
}
