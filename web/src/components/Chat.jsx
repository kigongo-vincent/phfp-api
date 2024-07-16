import { Avatar, Badge, Box, Typography } from "@mui/material"
import { FaCircle } from "react-icons/fa"

const Chat = ({ chatroom, setter, is_focused }) => {
    return (
        <Box   onClick={()=>setter(chatroom)} className={`d-flex chat ${is_focused && "chat_focused" } px-3 py-1 rounded align-items-center justify-content-between mb-3`} >

            {/* profile  */}
            <Box className="d-flex align-items-center">

                {/* photo  */}
                <Badge
                sx={{mr:1}}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    badgeContent={true && <FaCircle style={{ transform: "translate(-50%, -50%)", padding: 1 }} size={12} className="bg-light rounded-circle" color="#34E163" />}


                >

                    <Avatar src={`http://localhost:8000/${chatroom?.chat_buddy?.photo}`}/>

                </Badge>

                {/* username  */}
                <Typography>{chatroom?.chat_buddy?.username}</Typography>

            </Box>

            {/* number of new messages  */}
            
            <Box className="rounded-corners px-2 bg-danger text-light">

                {

                    chatroom?.chat_buddy?.new_messages_count != 0

                    &&

                    <Typography>{chatroom?.chat_buddy?.new_messages_count}</Typography>

                }
                
            </Box>



        </Box>
    )
}

export default Chat