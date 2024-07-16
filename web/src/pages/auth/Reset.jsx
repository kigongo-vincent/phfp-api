import { ArrowRight } from '@material-ui/icons'

import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from '@mui/material'

import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { sendAlertMessage, clearAlertMessage, getUser } from '../../model/data'

import { setUser } from '../../model/data'

const Reset = () => {

    const { id } = useParams()

    const [password, setPassword] = useState("")

    const [password2, setPassword2] = useState("")

    const [resetting, setResetting] = useState(false)

    const [error, setError] = useState("")

    const navigate = useNavigate()

    const user = useSelector(getUser)

    const dispatch = useDispatch()

    const reset = async (e) => {

        e.preventDefault()

        setResetting(true)

        try {

            const response = await fetch(`http://localhost:8000/update_password/${id}`, {

                method: "POST",

                headers: {
                    "Content-type": "application/json"
                },

                body: JSON.stringify({ password })

            })

            if (response.status == 202) {

                const data = await response.json()

                dispatch(sendAlertMessage({ severity: "success", body: "Your password has been updated successfully" }))

                let user = {
                    username: data?.user?.username,
                    user_id: data?.user?.user_id,
                    email: data?.user?.email,
                    isLoggedIn: true,
                    role: data?.user?.role,
                    contact: data?.user?.contact,
                    tokens: {
                        access: data?.access,
                        refresh: data?.refresh
                    }
                }

                dispatch(setUser(user))
                localStorage.setItem("user", JSON.stringify(user))

            }

            else if (response.status == 403) {
                setError("This link is expired, please request for another link from the login page")
            }
            else {
                setError("Failed to update password, please try again")
            }

        }
        catch (err) {

            setError("Something went wrong, please check you email and try again")

        }
        finally {
            setResetting(false)
        }

    }

    useEffect(() => {

        if (error) {
            dispatch(sendAlertMessage({ severity: "error", body: error }))

            setTimeout(() => {
                setError(null)
                dispatch(clearAlertMessage())
            }, 2000)

        }

    }, [error])

    return (


        user?.isLoggedIn

            ?

            <Navigate to={"/"} />

            :

            <form onSubmit={reset}>

                <Box height={"100vh"} width={"100vw"} className="d-flex align-items-center justify-content-center">

                    <Container maxWidth="xs">

                        <Paper elevation={0} className="p-5 d-flex flex-column align-items-center justify-content-center">

                            <Typography variant='h5' fontWeight={"bold"}>Password reset</Typography>
                            <Typography sx={{ mt: 2, mb: 3 }}>Please provide you new password</Typography>

                            <TextField value={password} type='password' onChange={(e) => setPassword(e.target.value)} className='w-100' label="you new password" />
                            <TextField value={password2} type='password' onChange={(e) => setPassword2(e.target.value)} className='w-100 my-4' label="Confirm your password" />

                            <Button

                                type='submit'

                                disabled={

                                    password.length < 4 || !password2 || resetting || password != password2
                                }

                                className='w-100' variant='contained' endIcon={<ArrowRight />}>

                                {

                                    resetting

                                        ?

                                        <CircularProgress size={15} />

                                        :

                                        <Typography textTransform={"lowercase"}>Continue</Typography>

                                }

                            </Button>

                            <u className='text-danger' role='button' onClick={() => navigate("/login")}><Typography sx={{ mt: 3 }}>Back to login</Typography></u>

                        </Paper>

                    </Container>

                </Box>

            </form>
    )
}

export default Reset