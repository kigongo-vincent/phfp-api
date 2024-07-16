import { Box, Button, Typography } from "@mui/material"
import UserProfile from "./UserProfile"
import { ArrowRight, More } from "@material-ui/icons"
import { useNavigate } from "react-router-dom"
import { getRelativeTime } from "../utilities/getRelativeTime"
import { useSelector } from "react-redux"
import { getUser } from "../model/data"

const PostPreview=({information})=>{

    const navigate = useNavigate()

    const user = useSelector(getUser)
    
    return(
        <Box className="bg-white shadow-md d-flex flex-column rounded-much py-4 px-5 mb-4">

            {/* profile header  */}
            <UserProfile photo_url={user?.username == information?.username  ?  `http://localhost:8000${user?.photo}`: `http://localhost:8000${user?.photo_url}`} timestamp={"posted "+getRelativeTime(information?.time)} is_officer={true} organization={information?.org_name} username={information?.username}/>
            
            {/* title  */}
            <Typography sx={{mt:4, mb:1}} variant="h5" fontWeight={"600"}>{information?.title}</Typography>

            {/* description  */}
            <Typography lineHeight={1.8}>{information?.description}</Typography>

            {/* more button  */}
            <Button  onClick={()=>navigate(`/information-details/${information?.id}`,{state: {information}})} endIcon={<ArrowRight/>} sx={{my:1, alignSelf: "flex-end"}}>
                <Typography textTransform={"lowercase"}>
                view details
                </Typography>
            </Button>
            
        </Box>
    )
}

export default PostPreview