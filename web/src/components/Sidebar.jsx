import { BusinessOutlined, Camera, Home, House } from "@material-ui/icons"
import { Avatar, Badge, Box, CircularProgress, IconButton, InputLabel, List, ListItem, ListItemButton, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { FaCamera, FaSignOutAlt } from 'react-icons/fa'
import About from "./AboutOrg"
import HiddenInput from "./HiddenInput"
import { PATCH_FORMDATA } from "../utilities/PATCH"
import { useDispatch } from "react-redux"
import { clearAlertMessage, clearUser, sendAlertMessage, setUser } from "../model/data"
import { constants } from "../utilities/constants"
import { useNavigate } from "react-router-dom"
const Sidebar = ({organization, user}) => {
    
    // about org visibilty 
    const [orgVisibility, setOrgVisibility] = useState(false)
    
    // photo 
    const [file, setFile] = useState(null)

    const [error, setError] = useState(false)

    const [loading, setloading] = useState(false)
    
    const dispatch = useDispatch()
    
    const uploadImage =async()=>{
        setloading(true)
        const formData = new FormData()

        formData.append("photo", file)

        const response = await fetch(`http://localhost:8000/update_user/${user?.user_id}`,{
            method: "PATCH",
            body: formData
        })

        if(response.status == 201){
            const data = await response.json()
            setloading(false)
            let new_user = JSON.parse(localStorage.getItem("user"))
            new_user.photo = data?.photo

            dispatch(setUser(new_user))
            localStorage.setItem("user", JSON.stringify(new_user))
        }else{
            setloading(false)
        }

    }


    useEffect(()=>{

        if(error){
            dispatch(sendAlertMessage({
                severity: "error",
                body: "Failed to update image"
            }))

            setTimeout(() => {
                dispatch(clearAlertMessage())
                setError(false)
            }, 2000);
        }

    },[error])

    // photo selection action 
    useEffect(()=>{

        if(file){
             uploadImage()
        }

    },[file])

    const navigate = useNavigate()
    
    return (
        <Box >

            {/* header  */}

            <Typography className="text-red p-4" fontWeight={"bold"}>PHFIP</Typography>

            {/* end header  */}

            {/* profile container  */}

            <Box display={"flex"} sx={{ mt: 5, mb: 2 }} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>

                {/* photo  */}
                <Badge 
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                badgeContent={

                    // image upload 
                    loading

                    ?

                    <CircularProgress className="text-light" size={14}/>
                    :
                    <IconButton>
                        <InputLabel>
                        <FaCamera  className="blurred rounded p-1" size={25}/>
                        <HiddenInput accept={".jpg, .jpeg, .png"} setter={(e)=>setFile(e.currentTarget.files[0])}/>
                        </InputLabel>
                    </IconButton>
                    }
                    >

                    <Avatar src={`${constants.URL}/${user?.photo}`} sizes="large" className="scale-up" />

                </Badge>

                {/* name  */}
                <Typography fontWeight={"bold"} sx={{ mt: 3, mb: 1 }}>{user?.username}</Typography>

                {/* role  */}
                <Typography variant="caption">Communications Officer</Typography>

            </Box>

            {/* profile container  */}


            {/* routes  */}

            <List>

                {/* home page     */}
                <ListItem className="text-red">

                    <ListItemButton onClick={()=>navigate("/")} className="d-flex align-items-center">

                        <Home />

                        <Typography className="mx-2">home page</Typography>

                    </ListItemButton>

                </ListItem>
                {/* end home page     */}


                {/* organization page     */}
                <ListItem >

                    <ListItemButton onClick={()=>setOrgVisibility(true)} className="d-flex align-items-center">

                        <BusinessOutlined />

                        <Typography className="mx-2">My Organization</Typography>

                    </ListItemButton>

                </ListItem>
                {/* end organization page     */}


                {/* logout    */}
                <ListItem >

                    <ListItemButton onClick={()=>dispatch(clearUser())} className="d-flex align-items-center">

                        <FaSignOutAlt size={14} />

                        <Typography className="mx-2">Signout</Typography>

                    </ListItemButton>

                </ListItem>
                {/* end logout     */}



            </List>

            {/* end routes  */}


            {/* about organization  */}
            <About organization={organization} orgVisibility={orgVisibility} setOrgVisibility={setOrgVisibility}/>


        </Box>
    )
}
export default Sidebar