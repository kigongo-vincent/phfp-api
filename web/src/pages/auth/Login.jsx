import { Box, Button, CircularProgress, Container, Dialog, DialogContent, IconButton, InputAdornment, TextField, Typography } from "@mui/material"

import WomanClimbing from '../../assets/svgs/WomanClimbing.svg'

import { ArrowRight, Email, Lock, Send } from "@material-ui/icons"

import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import { getUser, sendAlertMessage, setUser } from "../../model/data"

import { Navigate, useNavigate } from "react-router-dom"

import { jwtDecode } from 'jwt-decode'

import ModalHeader from '../../components/ModalHeader'


const Login = () => {

    const [email, setEmail] = useState("")

    const [resetting, setResetting] = useState(false)

    const [password, setPassword] = useState("")

    const [loading, setloading] = useState(false)

    const [forgotVisibility, setForgotVisibilty] = useState(false)

    const [my_email, setMy_email] = useState("")

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const user = useSelector(getUser)

    const handleSubmit = async (e) => {

        e.preventDefault()

        setloading(true)

        try {

            const response = await fetch("http://localhost:8000/token/", {

                method: "POST",

                body: JSON.stringify({

                    email: email,

                    password: password,

                }),

                headers: {

                    "Content-type": "application/json"

                }

            })

            if (response.status == 200) {

                const data = await response.json()

                const account = jwtDecode(data?.access)



                if (account?.role != "officer") {

                    dispatch(sendAlertMessage({

                        severity: "info",

                        body: "Only experts are allowed to signup from this page"

                    }))

                } else {

                    const new_user = {

                        photo: account?.photo,

                        username: account?.username,

                        user_id: account?.user_id,

                        isLoggedIn: true,

                        email: account?.email,

                        role: account?.role,

                        tokens: {

                            access: data?.access,

                            refresh: data?.refresh
                        }

                    }


                    localStorage.setItem("user", JSON.stringify(new_user))

                    dispatch(setUser(new_user))

                    navigate("/")

                }

            }

            else {
                dispatch(sendAlertMessage({

                    severity: "error",

                    body: "Invalid credentials, please try again"

                }))

            }


        }

        catch (error) {

            dispatch(sendAlertMessage({

                severity: "error",

                body: "Something went wrong, please try again"

            }))

        }

        finally {

            setloading(false)

        }
    }

    const resetPassword = async () => {

        setResetting(true)

        const res = await fetch(`http://localhost:8000/reset_password/${my_email}`)

        if (res.status == 202) {

            dispatch(sendAlertMessage({

                severity: "success",

                body: "Please check you email for instructions on how to reset your password"

            }))

            setResetting(false)

            setForgotVisibilty(false)

        } else {

            setResetting(false)

            dispatch(sendAlertMessage({

                severity: "error",

                body: "Failed to reset password, pleas try again"

            }))


        }

    }

    return (

        user?.isLoggedIn

            ?

            <Navigate to={"/"} />

            :
            <form onSubmit={handleSubmit} >

                <Container display={"flex"} className="d-flex align-items-center justify-content-center" sx={{ height: "100vh" }} alignItems={"center"} justifyContent={"center"} maxWidth="sm">




                    {/* container for login inputs  */}
                    <Box className="bg-white p-5 shadow-sm" display={"flex"} justifyContent={"space-between"} flexDirection={"column"}>


                        {/* heading  */}
                        <Typography textAlign={"center"} fontWeight={900} variant="h5">
                            POST-HARVEST FARMERS INFORMATION PORTAL
                        </Typography>
                        {/* end heading  */}


                        {/* welcome message  */}
                        <Typography sx={{ my: 4 }} className="text-secondary">
                            Welcome to this platform that enables your agricultural organization to provide information to farmers on how to enhance their agricultural practices.
                        </Typography>
                        {/* end welcome message  */}


                        {/* sub heading  */}
                        <Typography className="text-center">
                            <span className="text-red">Signin</span> with your organization
                        </Typography>
                        {/* end sub heading  */}

                        <br />




                        {/* email input  */}
                        <TextField

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <Email />
                                    </InputAdornment>
                                )
                            }}
                            variant="standard"
                            label="email"
                            color="secondary"

                        />
                        {/* end email input  */}



                        {/* password input  */}
                        <TextField
                            type="password"
                            sx={{ mt: 2 }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <Lock />
                                    </InputAdornment>
                                )
                            }}
                            variant="standard"
                            color="secondary"
                            label="password" />
                        {/* end password input  */}



                        <Typography onClick={() => setForgotVisibilty(true)} role="button" className="mt-4 text-secondary" textTransform={"lowercase"}>

                            <u>Forgot you password</u>

                        </Typography>




                        {/* submit button  */}
                        <Button
                            type="submit"
                            className="w-100"
                            sx={{ borderRadius: 100, my: 3, py: 1 }}
                            onClick={handleSubmit}
                            disabled={!email || !password || loading}
                            endIcon={!loading && <ArrowRight />}
                            variant="contained" color="secondary" >
                            {
                                loading
                                    ?
                                    <CircularProgress size={25} className="text-dark" />
                                    :
                                    <Typography textTransform={"lowercase"}>
                                        Continue
                                    </Typography>
                            }
                        </Button>
                        {/* end submit button  */}



                        {/* signup link  */}
                        <Typography sx={{ mt: 2 }} alignSelf={"flex-end"}>
                            <span className="text-blue" role="button" onClick={() => navigate("/signup")}>Signup</span> if your organization hasn't yet joined
                        </Typography>
                        {/* end signup link  */}


                    </Box>
                    {/* end container for login inputs  */}

                </Container>


                {/* // forgot password  */}

                <Dialog open={forgotVisibility}>



                    <DialogContent>

                        <ModalHeader setter={setForgotVisibilty} title={"Reset you password"} />

                        <Typography variant="h5" sx={{ mt: 3, mb: 2 }} fontWeight={900}>
                            Password Reset
                        </Typography>

                        <Typography>
                            Please provide your email after which check you email for password reset options
                        </Typography>

                        <TextField

                            value={my_email}

                            onChange={(e) => setMy_email(e.target.value)}

                            InputProps={{
                                endAdornment: (

                                    resetting

                                        ?

                                        <CircularProgress size={15} />

                                        :

                                        <InputAdornment>
                                            <IconButton onClick={resetPassword}>
                                                <Send />
                                            </IconButton>
                                        </InputAdornment>

                                )
                            }}

                            label="email"

                            className="w-100 mb-2 mt-4" />

                    </DialogContent>



                </Dialog>


            </form>



    )
}
export default Login