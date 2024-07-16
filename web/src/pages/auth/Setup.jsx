import { Box, TextField, Alert, Typography, Button, InputLabel, CircularProgress, IconButton } from "@mui/material"
import SpaceShip from '../../assets/svgs/SpaceShip.svg'
import { Close, FileCopy, Save } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAlertMessage, getUser, sendAlertMessage, setOrganization, setUser } from "../../model/data"

import HiddenInput from '../../components/HiddenInput'
import { POST_FORMDATA } from "../../utilities/POST"
import { Navigate, useNavigate } from "react-router-dom"

const Setup = () => {

    const [name, setName] = useState("")

    const [contact, setContact] = useState("")

    const [licence, setLicence] = useState(null)

    const [address, setAddress] = useState("")
    
    const [username, setUsername] = useState("")

    const dispatch = useDispatch()

    const [loading, setloading] = useState(false)

    const [error, setError] = useState(false)

    const user = useSelector(getUser)

    const navigate = useNavigate()

    const addOrganization =async()=>{

        const formData = new FormData()

        setloading(true)
        formData.append("officer", user?.user_id)
        formData.append("name", name)
        formData.append("address", address)
        formData.append("contact", contact)
        formData.append("licence", licence)
        

        const response = await fetch(`http://localhost:8000/addOrganization/`,{
            method: "POST",
            body: formData
        })

        if(response.status == 201){
            setloading(false)

            const res = await fetch(`http://localhost:8000/update_user/${user?.user_id}`,{


                method: "PATCH",

                body:JSON.stringify({username}),

                headers: {"Content-type": "application/json"}

            })

            if(res.status != 201){

                dispatch(sendAlertMessage({

                    body: "failed to update you username",

                    severity: "error"

                }))

            }

            else{

                const savedUser = JSON.parse(localStorage.getItem("user"))

                savedUser.username = username

                localStorage.setItem("user", JSON.stringify(savedUser))

                dispatch(setUser(savedUser))


            }

            const data = await response.json()
            
            let organization = {
                id: data?.id,
                name: data?.name,
                contact: data?.contact,
                address: data?.address,
                licence: data?.licence
            }
            
            dispatch(setOrganization(organization))
            localStorage.setItem("organization", JSON.stringify(organization))
            navigate("/")
            dispatch(sendAlertMessage({
                severity: "success",
                body:"Your organization info has been uploaded successfully"
            }))
        }else{
            setloading(false)
            setError("Failed to add information, try again")
        }
    }

    useEffect(() => {

        licence &&

            dispatch(sendAlertMessage({
                severity: "info",
                body: `you have selected ${licence.name}`
            }))

    }, [licence])


    useEffect(()=>{

        if(error){
            dispatch(sendAlertMessage({
                severity: "error",
                body: "Failed to upload information, please try again"
            }))

            setTimeout(()=>{
                setError(false)
                dispatch(clearAlertMessage())
            },4000)
        }

    },[error])

    return (
       

        !user?.isLoggedIn

        ?

        <Navigate to={"/login"}/>

        :

        <Box height={"100vh"} width="100vw" display="flex" alignItems={"center"} justifyContent={"center"}>

        {/* main container  */}
        <Box className="bg-white shadow-sm w-75" sx={{ px: 3, py: 4 }} display={"flex"} justifyContent={"space-between"} alignItems={"center"} >

            {/* icon  */}
            <img src={SpaceShip} className="scale-down d-lg-flex d-none" />
            {/* icon  */}

            {/* inputs section  */}
            <Box className="w-75">

              

                <br />


                <Alert className="w-100" severity="info">
                    <Typography >Finsih the setup by providing more information about your organization</Typography>
                </Alert>

                {/* end intro  */}

                <br />


                {/* name input  */}
                <TextField value={name} onChange={(e) => setName(e.target.value)} className="w-100" variant="standard" label="Name of the Organization" />

                {/* username input  */}
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} className="w-100 mt-3" variant="standard" label="Your username" />

                {/* address input  */}
                <TextField value={address} onChange={(e) => setAddress(e.target.value)} sx={{ my: 2 }} variant="standard" className="w-100" label="Address" />

                {/* contact input  */}
                <TextField value={contact} onChange={(e) => setContact(e.target.value)} variant="standard" className="w-100" label="Contact" />

                {/* upload and save buttons  */}

                <Box sx={{ mt: 4 }} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>


                    {/* upload licence btn  */}

                    {
                        licence
                        ?
                        <Alert sx={{mr:1}} action={<IconButton onClick={()=>setLicence(null)}><Close/></IconButton>}>You selected {licence.name}</Alert>
                        :
                        <Button variant="contained" color="secondary" startIcon={<FileCopy />}>
                        <InputLabel>
                            <Typography className="text-light" textTransform={"lowercase"}>upload licence of Organization</Typography>
                            <HiddenInput accept={".pdf, .jpg, .jpeg, .png"} setter={(e) => setLicence(e.currentTarget.files[0])} />
                        </InputLabel>
                    </Button>
                    }
                    {/* end upload licence btn  */}


                    {/* save button  */}
                    <Button 
                    onClick={addOrganization}
                    variant="contained" color="secondary"
                    disabled={
                        loading 
                        ||
                        !contact
                        ||
                        !address
                        ||
                        !name
                        ||
                        !licence
                    }
                    startIcon={<Save />}>
                        {
                            loading
                            ?
                            <CircularProgress size={20}/>
                            :
                            <Typography textTransform={"lowercase"}>save</Typography>
                        }
                    </Button>
                    {/* end save button  */}

                </Box>

                {/* end upload and save buttons  */}

            </Box>
            {/* end inputs section  */}


        </Box>
        {/* end main container  */}

    </Box>
    )
}

export default Setup