import { Box, Button, Typography } from "@mui/material"

import UserProfile from "./UserProfile"
import { ArrowRight } from "@material-ui/icons"
import { getRelativeTime } from "../utilities/getRelativeTime"

const Post=({post, setter})=>{
    return(
        <Box sx={{mt:1, mr:1}} className = "d-flex flex-column bg-pale px-4 py-3 rounded-much">

         {/* profile     */}
        <UserProfile photo_url={post?.user_photo} is_officer={post?.organization} username={post?.username} organization={post?.org_name} timestamp={getRelativeTime(post?.time)}/>
        
        {/* post title  */}
        <Typography sx={{my:3}} fontWeight={"light"}>
            {

                post?.caption?.length > 40

                ?

                post?.caption?.substring(0, 40) + "..."

                :

                post?.caption

                
        }</Typography>

        {/* view more link  */}
        <Button  onClick={()=>setter(post)} endIcon={<ArrowRight/>} sx={{alignSelf: "flex-end"}}>
            <Typography textTransform={"lowercase"}>View more</Typography>
        </Button>

        </Box>
    )
}

export default Post