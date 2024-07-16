import { Box, Button, CircularProgress, Dialog, DialogContent, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import WomanWalking from '../../assets/svgs/WomanWalking.svg'
import { AccountBox, ArrowRight, Close, Email, Lock } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAlertMessage, getUser, sendAlertMessage, setUser } from "../../model/data"
import {Navigate, useNavigate} from 'react-router-dom'


const Signup = () => {

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [verifying,setVerifying] = useState(false)

    const [error, setError] = useState("")

    const [loading, setloading] = useState(false)

    const [OTP, setOTP] = useState("")

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const user = useSelector(getUser)
    
    const handleSubmit = async() => {

        setloading(true)

        const response = await fetch(`http://localhost:8000/signup/`,{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email, password, role: "officer"
            })
        })

        
        if(response.status == 201){
            setOpen(true)
            setError(false)
            
            setloading(false)

        }
        else{
            setloading(false)
            setError("Account creation failed, please ensure you have never signed up using this email on the platform")
        }
        
    }


    const verifyCode=async()=>{
        

        const response = await fetch(`http://localhost:8000/verify_account/`,{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({OTP})
        })  

        if(response.status == 202){

            const data = await response.json()

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


        }else{

            setError("invalid code, please try again")

        }
    }

   

    useEffect(()=>{

        if(error){
            dispatch(sendAlertMessage({severity: "error", body: error}))

            setTimeout(()=>{
                setError(null)
                dispatch(clearAlertMessage())
            },2000)

        }

    },[error])

    return (
        
        user?.isLoggedIn

        ?

        <Navigate to={"/"}/>

        :

        <Box height={"100vh"}>

            <Grid container sx={{ height: "100%" }}>

                {/* icon container  */}
                <Grid item lg={5} className="d-lg-flex d-none  px-5  align-items-center justify-content-center">
                    <img src={WomanWalking} className="scale-down" />
                </Grid>
                {/* end icon container  */}

                {/* input container  */}
                <Grid item lg={7} sx={{ px: 10 }} className="bg-white d-flex align-items-center justify-content-center">

                    <Box >

                        {/* heading  */}
                        <Typography fontWeight={"900"} variant="h5" >
                            POST-HARVEST FARMERS INFORMATION PORTAL
                        </Typography>
                        {/* end heading  */}


                        {/* welcome message  */}
                        <Typography sx={{ my: 4 }} className="text-secondary">
                            Welcome to this platform that enables your agricultural organization to provide information to farmers on how to enhance their agricultural practices.
                        </Typography>
                        {/* end welcome message  */}

                        {/* sub heading  */}
                        <Typography>If you already created an account you can verify it from <span className="text-primary" role="button" onClick={()=>setOpen(true)}>here</span></Typography>
                        {/* end sub heading  */}

                        <br />

                        {/* email input  */}
                        <TextField
                            className="w-100"
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
                        

                        <br />
                        <br />

                        {/* password input  */}
                        <TextField
                            className="w-100"

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
                            label="password you wish to use when logging in" />
                        {/* end password input  */}

                        {/* submit button  */}
                        <Button
                            sx={{ borderRadius: 100, my: 3, py: 1 }}
                            onClick={handleSubmit}
                            disabled={!email || !password || loading}
                            endIcon={!loading && <ArrowRight />}
                            variant="contained" color="secondary" >
                            {
                                loading
                                    ?
                                    <CircularProgress size={20} className="text-dark" />
                                    :
                                    <Typography textTransform={"lowercase"}>
                                        Continue
                                    </Typography>
                            }
                        </Button>
                        {/* end submit button  */}


                        {/* signin link  */}
                        <Typography sx={{ mt: 2 }} alignSelf={"flex-end"}>
                            <span role="button" onClick={()=>navigate("/login")} className="text-blue">Signin</span> if your organization already has an account
                        </Typography>
                        {/* end signin link  */}

                    </Box>

                </Grid>
                {/* end input container  */}


            </Grid>


            {/* verification code input box  */}

            <Dialog open={open}>
                <DialogContent sx={{ minWidth: 350 }}>

                    {/* dialog header  */}
                    <Box className="d-flex align-items-center justify-content-between">
                        <Typography>Account verification</Typography>
                        <IconButton onClick={()=>setOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                    {/* end dialog header  */}

                    {/* dialog body  */}

                    <Typography sx={{ mt: 3, mb: 1 }}>Please provide the verification code that was sent to your organization's email</Typography>

                    {/* code input  */}
                    <TextField value={OTP} onChange={(e)=>setOTP(e.target.value)} sx={{ mt: 2, mb: 3 }} className="w-100" type="password" label="verfication code" />
                    {/* end code input  */}

                    {/* end dialog body  */}

                    {/* dialog footer  */}
                    <Box display="flex" alignItems="center" justifyContent={"space-between"}>

                        <Typography className="text-red"><u role="button">Resend</u></Typography>

                        <Button
                        onClick={verifyCode}
                        disabled={verifying} variant="contained" endIcon={<ArrowRight/>}>
                            {
                                verifying

                                ?

                                <CircularProgress size={20}/>

                                :

                                "Verify"
                            }
                        </Button>
                    </Box>
                    {/* end dialog footer  */}





                </DialogContent>
            </Dialog>

            {/* end verification code input box  */}
        </Box>
    )
}

export default Signup