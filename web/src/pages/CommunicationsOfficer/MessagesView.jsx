import { Alert, Box, Grid, IconButton, Skeleton, TextField, Typography } from "@mui/material"
import Layout from "../../components/Layout"
import Chat from "../../components/Chat"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Send } from "@material-ui/icons"
import Message from "../../components/Message"
import { GET } from "../../utilities/GET"
import { useDispatch, useSelector } from "react-redux"
import { getUser, sendAlertMessage } from "../../model/data"
import { useLocation } from "react-router-dom"

const MessagesView = () => {

    const [messages, setMessages] = useState([])

    const [chatrooms, setChatrooms] = useState([])

    const [message, setMessage] = useState([])

    const [currentChatroom, setcurrentChatroom] = useState(null)

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false)

    const user = useSelector(getUser)

    const location = useLocation()

    const chatroom_id = location?.state?.chatroom_id

    const [typing, setTyping] = useState(false)



    const showTyping =()=>{

        setTyping(true)

        setTimeout(() => {

            setTyping(false)
            
        }, 3000);

    }

    useEffect(()=>{

        message.length !=0 && showTyping()

    },[message])




    const scroll = useRef()

    useLayoutEffect(() => {

        if (scroll.current) {

            scroll.current.scrollTop = scroll.current.scrollHeight - scroll.current.clientHeight

        }

    }, [scroll.current, messages, message])

    


    useEffect(() => {

        GET(setLoading, `get_chatrooms/${user?.user_id}`, setChatrooms, setError)

    }, [])


    useEffect(() => {

        if (chatrooms) {

            if (currentChatroom) {

                const chatRoom = chatrooms?.find(chatroom => chatroom?.id == currentChatroom?.id)

                setMessages(chatRoom?.messages)

            }
            else {

                if (chatrooms.length != 0) {
                    

                    setcurrentChatroom(chatroom_id ? chatrooms.find(chatroom => +(chatroom?.id) === +(chatroom_id)) : chatrooms[0])

                }

            }

        }


    }, [chatrooms])


    useEffect(() => {

        if (currentChatroom) {

            
            setChatrooms(

                chatrooms.map(

                    chatroom => (
                        
                        chatroom?.id == currentChatroom?.id

                        ?

                        {...chatroom, chat_buddy: {...chatroom.chat_buddy, new_messages_count: 0}}
                        
                        :

                        chatroom

                    )

                )

            )

            fetch(`http://localhost:8000/view_messages/${user?.user_id}/${currentChatroom?.id}`)

            setMessages(currentChatroom?.messages)

        }
        
    }, [currentChatroom])


    const dispatch = useDispatch()

    const sendMessage = async (e) => {

        if(!message){

            return 

        }

        e.preventDefault()

        const now = new Date()

        await fetch(`http://localhost:8000/add_message_to_chatroom/`, {

            method: "POST",

            body: JSON.stringify({

                chatroom: currentChatroom.id,

                body: message,

                viewers: [user?.user_id],

                sender: user?.user_id                    

            }),

            headers: {

                "Content-type": "application/json"

            }

        })

        setChatrooms(chatrooms.map(


            chatroom => (

                chatroom.id == currentChatroom.id

                    ?

                    {...chatroom, messages: [...chatroom?.messages, {

                            chatroom: currentChatroom.id,

                            id: chatroom?.messages?.length + 1,

                            time: now.toISOString(),

                            body: message,

                            viewers: [user?.user_id],

                            sender: user?.user_id

                        }]
                    }

                    :

                    chatroom

            )

        ))

        setMessage("")

    }




    // messages 


    return (
        <Layout>

            {

                loading

                    ?

                    <>

                        <Skeleton height={"10vh"} />

                        <Skeleton height={"50vh"} />

                    </>

                    :

                    <Grid container height={"80vh"} overflow={"scroll"} sx={{ mt: 1 }}>

                        {/* chats  */}
                        <Grid item lg={3}>

                            <Box sx={{ mr: 1.5 }} height="100%" className="bg-white px-1 py-4 rounded-much">

                                <Typography sx={{ mb: 2 }} className="px-4">Chats</Typography>

                                {
                                    chatrooms.length == 0

                                        ?

                                        // if no chats 

                                        <Typography sx={{ my: 3, px: 2 }} className="text-secondary">No chats found</Typography>

                                        :

                                        chatrooms.map(chat => <Chat setter={setcurrentChatroom} is_focused={currentChatroom?.id == chat.id} chatroom={chat} key={chat?.id} />)



                                }


                            </Box>

                        </Grid>
                        {/* end chats  */}

                        {/* messages  */}
                        <Grid item lg={9} >

                            <Box height="100%" className="bg-white p-4 d-flex flex-column justify-content-between rounded-much">



                                {/* messages header     */}
                                {
                                    currentChatroom && <Box className="d-flex align-items-center justify-content-between">

                                        {/* current user chat  */}
                                        <Typography>{currentChatroom?.chat_buddy?.username}</Typography>

                                        <Typography variant="caption">{currentChatroom?.messages?.length} message(s) discovered</Typography>

                                    </Box>
                                }

                                {/* <hr /> */}

                                {/* messages content  */}

                                <Box height="55vh" ref={scroll} className=" d-flex flex-column" overflow={"scroll"}>


                                    {
                                        messages?.length == 0

                                            ?

                                            <Typography>No messages found</Typography>

                                            :

                                            messages?.map(message => (

                                                <Message message={message} />
                                            ))
                                    }

                                    {

                                        typing && "typing..."

                                    }

                                </Box>
                                {/* end messages content  */}

                                {/* send message  */}

                                {

                                    currentChatroom?.messages

                                    &&

                                    <form className="w-100" onSubmit={sendMessage}>

                                        <TextField
                                            className="w-100"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton role="submit">
                                                        <Send />
                                                    </IconButton>
                                                )
                                            }}
                                            label="Reply" />

                                    </form>

                                }

                                {/* end send message  */}

                            </Box>

                        </Grid>
                        {/* end messages  */}

                    </Grid>

            }

        </Layout>
    )
}

export default MessagesView