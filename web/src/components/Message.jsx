import { Alarm } from "@material-ui/icons"

import { Box, Typography } from "@mui/material"

import { FaClock } from "react-icons/fa"

import { getRelativeTime } from "../utilities/getRelativeTime"

import { useSelector } from "react-redux"

import { getUser } from "../model/data"

const Message =({message})=>{

    const user = useSelector(getUser)

    return(
        <Box className={` mb-3 ${message?.sender == user?.user_id ? 'align-self-end bg-pale-green': 'align-self-start bg-pale'} p-4 d-flex flex-column rounded-much`} sx={{maxWidth: "60%"}}>

            <Typography>
                {message?.body}
            </Typography>

            <div className="d-flex align-self-end mt-3 text-secondary align-items-center">
                <FaClock size={12}/>
                <Typography className="mx-2 " variant={"caption"}>{getRelativeTime(message?.time)}</Typography>
            </div>

        </Box>

        
    )
}

export default Message