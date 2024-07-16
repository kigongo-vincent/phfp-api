import { Box, Fab, Grid, IconButton, Typography } from "@mui/material"

import Navbar from '../components/Navbar'

import Sidebar from "./Sidebar"

import { Navigate, useLocation, useNavigate } from "react-router-dom"

import { Home } from "@material-ui/icons"

import { useDispatch, useSelector } from "react-redux"

import { getOrganization, getUser, lockScreen, sendAlertMessage, setOrganization, unLockScreen } from "../model/data"
import { useEffect } from "react"

const Layout = ({ children }) => {


    // current route 
    const location = useLocation()

    const currentRoute = location?.pathname

    const dispatch = useDispatch()

    const organization = useSelector(getOrganization)

    const user = useSelector(getUser)

    const navigate = useNavigate()

    const fetchOrg = async () => {

        const response = await fetch(`http://localhost:8000/get_organization/${user?.user_id}`)

        if (response.status != 200) {

            navigate("/setup")

            dispatch(sendAlertMessage({

                body: "your account was created, but you never uploaded information about your organization, please provide information about you organization",

                severity: "info"

            }))

        } else {

            const data = await response.json()

            if (data?.is_active) {

                const new_organization = {

                    id: data?.id,
                    name: data?.name,
                    address: data?.address,
                    contact: data?.contact,
                    licence: data?.licence,
                    is_active: data?.is_active,


                }

                localStorage.setItem("organization", JSON.stringify(new_organization))

                dispatch(setOrganization(new_organization))

                dispatch(unLockScreen())

            } else {

                dispatch(lockScreen())

            }

        }

    }

    useEffect(() => {

        if (user?.role == "officer") {

            fetchOrg()

        }

    }, [])

    return (

        !user?.isLoggedIn

            ?

            <Navigate to={"/login"} />

            :

            <Box height={"100vh"} width={"100vw"}>

                <Grid container sx={{ height: "100%" }}>

                    {/* sidebar  */}

                    <Grid item lg={2.2} className="bg-white d-lg-block d-none">

                        <Sidebar user={user} organization={organization} />

                    </Grid>

                    {/* end sidebar  */}


                    {/* content section  */}

                    <Grid item lg={9.8}>

                        <Box sx={{ py: 2, px: 2 }}>

                            {/* navbar  */}
                            <Navbar user={user} organization={organization} />
                            {/*end navbar  */}


                            {/* dynamic content  */}

                            <Box sx={{ p: 1 }}>
                                {children}
                            </Box>

                            {/* end dynamic content  */}

                        </Box>

                    </Grid>

                    {/* end content section  */}

                </Grid>


                {/* home link  */}

                {
                    currentRoute.includes("crop-selection-view")

                    &&

                    <Fab className="bg-white" sx={{ boxShadow: "10px 10px 20px rgba(0,0,0,.1)", position: "fixed", bottom: "10%", right: "3%" }}>
                        <IconButton onClick={()=>navigate("/")}>
                            <Home />
                        </IconButton>
                    </Fab>
                }



            </Box>
    )
}

export default Layout