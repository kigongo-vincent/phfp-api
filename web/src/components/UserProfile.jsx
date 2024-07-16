import { Avatar, Badge, Box, Typography } from "@mui/material"
import { FaCertificate } from "react-icons/fa"
import { useSelector } from "react-redux"
import { getUser } from "../model/data"

const UserProfile = ({ photo_url, username, organization, timestamp, is_officer}) => {

    const user = useSelector(getUser)

    return (
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

            {/* profile  */}
            <Box display={"flex"} alignItems={"center"}>

                {/* photo url  */}
                
                <Badge
                overlap="circular"
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                 badgeContent ={is_officer && <FaCertificate size={19} className="text-warning rounded-much bg-light  p-1"/>}>
                <Avatar src={user?.username == username  ?  `http://localhost:8000${user?.photo}`: `http://localhost:8000${photo_url}`} />
                </Badge>

                <Box>

                    {/* username  */}
                    <Typography className="text-blue" sx={{ ml: 1 }}>{username}</Typography>

                    {/* organization  */}


                    {
                        organization && <Typography sx={{ ml: 1 }}>

                            {

                            organization?.length > 20

                            ?

                            organization?.substring(0, 20) + "..."

                            :

                            organization

                            }

                            

                            </Typography>
                    }

                </Box>

            </Box>

            {/* timestamp  */}

            {
                timestamp && <Typography variant="caption" className="text-secondary">{timestamp}</Typography>
            }

        </Box>
    )
}

export default UserProfile