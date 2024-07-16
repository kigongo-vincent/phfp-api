import { Alert, Avatar, Box, Popover, Typography } from "@mui/material"
import ModalHeader from "./ModalHeader"
import { FaGlobe } from "react-icons/fa"
import { useState } from "react"

import {getRelativeTime} from '../utilities/getRelativeTime'

const Notifications = ({ open, anchorEl, setter, notifications }) => {

    // Notifications 
    

    return (
        <Popover
            elevation={1}
            open={open}
            anchorEl={anchorEl?.current}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}>

            <Box sx={{ p: 1 }} minWidth={400}>

                {/* header  */}
                <ModalHeader setter={setter} title={"Notifications"} />

                {/* notifications list  */}
                {
                    notifications.length == 0
                        ?
                        <Typography className="text-secondary" textAlign={"center"} sx={{my:2}}>
                            No notifications found
                        </Typography>
                        :
                        notifications.map(notification => (
                            <Box className="bg-pale px-4 py-2 rounded mb-2 d-flex flex-column">
                                <Box className=" d-flex align-items-center  ">
                                <Avatar src={`http://localhost:8000${notification?.user_photo}`} sx={{mr:3}}/>
                                <Box>
                                <Typography fontWeight={"bold"}>{notification?.username}</Typography>
                                <Typography>{notification?.action}</Typography>
                            </Box>
                            </Box>
                            
                            <Typography variant="caption" alignSelf={"flex-end"}>
                                {getRelativeTime(notification.time)}
                            </Typography>
                                </Box>

                                
                        ))
                }

            </Box>

        </Popover>
    )
}

export default Notifications