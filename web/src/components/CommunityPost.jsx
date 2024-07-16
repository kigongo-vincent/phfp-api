import { Box, Button, CircularProgress, Dialog, DialogContent, IconButton, TextField, Typography } from "@mui/material"
import UserProfile from "./UserProfile"

// test image 
import TestImage from '../assets/test/test.jpg'
import { Chat, Comment, Send } from "@material-ui/icons"
import { FaComment } from "react-icons/fa"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import ModalHeader from "./ModalHeader"
import Message from "./Message"
import { useNavigate } from "react-router-dom"
import { getRelativeTime } from "../utilities/getRelativeTime"
import { GET } from "../utilities/GET"
import { useDispatch, useSelector } from "react-redux"
import { getUser, sendAlertMessage } from "../model/data"



const CommunityPost = ({ post }) => {

    const [commentVisibility, setCommentVisibility] = useState(false)

    const [comments, setComments] = useState([])

    const [chatroom, setChatRoom] = useState(null)

    const [body, setBody] = useState("")

    const [check, setCheck] = useState(true)

    const [error, setError] = useState(false)

    const [send, setSend] = useState(false)

    const user = useSelector(getUser)

    useEffect(() => {

        commentVisibility && GET(null, `comments/${post?.id}`, setComments, setError)

    }, [commentVisibility])

    const scroll = useRef()

    const [comment, setComment] = useState("")

    useLayoutEffect(() => {

        if (scroll.current) {

            scroll.current.scrollTop = scroll.current.scrollHeight - scroll.current.clientHeight
        }

    }, [scroll.current, comment, comments])

    const [summarise, setSummarise] = useState(true)

    const [checking, setChecking] = useState(false)

    const sendFirstMessage = async (e) => {

        e.preventDefault()

        setSend(true)

        try {

            const response = await fetch(`http://localhost:8000/create_chatroom_and_add_message/`, {

                method: "POST",

                body: JSON.stringify({

                    receiver: post?.author,

                    sender: user?.user_id,

                    body: body

                }),

                headers: {

                    "Content-type": "application/json"
                }

            })

            if (response.status == 201) {

                const data = await response.json()

                dispatch(sendAlertMessage({

                    severity: "success",
    
                    body: "You have successfully initiated a conversation with " + post?.username
    
                }))

                navigate("/messages", {state: {chatroom_id: data?.id}})

            } else {

                dispatch(sendAlertMessage({

                    severity: "error",

                    body: "Failed to send message, please try again"

                }))

            }
        }
        catch (err) {

            dispatch(sendAlertMessage({

                severity: "error",

                body: "Failed to send message, please try again"

            }))

        }

        finally {

            setSend(false)

        }

    }

    const navigate = useNavigate()

    const chatAction = () => {

        setChecking(true)

        setTimeout(() => {

            GET(setCheck, `check_for_chatroom/${user?.user_id}/${post?.author}`, setChatRoom, setError)

        }, 1000);

    }

    useEffect(() => {

        if (chatroom) {

            navigate("/messages", { state: { chatroom_id: chatroom?.id } })

        }

    }, [chatroom])

    const dispatch = useDispatch()
    const addComment = async (e) => {

        e.preventDefault()

        const response = await fetch(`http://localhost:8000/add_comment/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                body: comment,
                author: user?.user_id,
                post: post?.id
            })
        })


        if (response.status == 201) {

            const data = await response.json()

            setComments([...comments, data])

            setComment("")

        }
        else {

            dispatch(sendAlertMessage({

                severity: "error", body: "failed to send comment"

            }))

        }
    }



    return (
        <Box sx={{ mb: 1 }} className="bg-white shadow-md rounded">

            {/* profile  */}
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ px: 2, py: 1 }}>
                <Box sx={{ flex: 1 }}>
                    <UserProfile photo_url={post?.user_photo} timestamp={getRelativeTime(post?.time)} organization={post?.org_name} username={post?.username} is_officer={post?.org_name} />
                </Box>
                {
                    user?.user_id != post?.author

                    &&

                    <Button sx={{ marginLeft: 2 }} startIcon={<Chat />} onClick={chatAction}>

                        <Typography textTransform={"lowercase"}>chat</Typography>
                    </Button>
                }
            </Box>

            {
                post?.image

                    ?

                    <>
                        <img className="my-2" src={`http://localhost:8000${post?.image}`} width={"100%"} />

                        <Typography className="text-secondary" sx={{ px: 2, py: 1 }}>

                            {

                                post?.caption?.length < 50

                                    ?

                                    post?.caption

                                    :

                                    summarise

                                        ?
                                        <>
                                            {post.caption.substring(0, 50)}... <span role="button" onClick={() => setSummarise(false)} className="text-blue">view more</span>
                                        </>
                                        :
                                        <>
                                            {post.caption} <span role="button" onClick={() => setSummarise(true)} className="text-blue">view less</span>
                                        </>
                            }
                        </Typography>
                    </>

                    :

                    <Typography className="text-secondary" sx={{ px: 2, py: 1 }}>
                        {post?.caption}
                    </Typography>

            }

            {/* comments  */}

            {
                <Box role="button" sx={{ px: 2 }} className="d-flex align-items-center">
                    <FaComment />
                    <Button onClick={() => setCommentVisibility(true)}>
                        <Typography textTransform={"lowercase"} sx={{ mx: 1 }} variant="caption">View comments</Typography>
                    </Button>
                </Box>
            }

            <br />


            {/* comments modal */}

            <Dialog open={commentVisibility}>
                <DialogContent sx={{ minWidth: 500 }}>
                    {/* header  */}
                    <ModalHeader title={"Comments"} setter={setCommentVisibility} />

                    <Box height={"65vh"} overflow={"scroll"} ref={scroll}>

                        {
                            comments.length == 0

                                ?

                                <Typography fontWeight={900} variant="h5">No comments found</Typography>

                                :

                                comments.map((comment) => (
                                    <Box >
                                        <UserProfile photo_url={comment?.user_photo} is_officer={comment?.user_role == "officer"} username={comment?.username} />
                                        <br />
                                        <Message message={{ is_owner: false, time: comment?.time, body: comment?.body }} />
                                    </Box>
                                ))
                        }

                    </Box>

                    <form className="w-100" onSubmit={addComment}>

                    <TextField
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <IconButton role="submit" onClick={addComment}>
                                    <Send />
                                </IconButton>
                            )
                        }}
                        className="w-100"
                        label="Reply"
                    />

                    </form>

                </DialogContent>
            </Dialog>
            {/* set comments modal */}


            {/* chat history check modal */}

            <Dialog open={checking}>

                <DialogContent sx={{ minWidth: 500 }} className="d-flex align-items-center justify-content-center flex-column">


                    <div className="w-100">

                        <ModalHeader setter={setChecking} title={"chat hsitory"} />

                    </div>

                    {

                        check

                            ?

                            <>

                                <CircularProgress size={30} sx={{ m: 3 }} />

                                <Typography>Checking for chat history for {post?.username}</Typography>

                                <br />

                                <Typography variant="caption">please wait....</Typography>
                            </>

                            :

                            !chatroom &&

                            <div className="w-100">

                                <Typography sx={{ my: 3 }}>You donot have any previous conversations with {post?.username}</Typography>

                                <Typography fontWeight={900} sx={{ mb: 2 }} variant="h5">Say Hi to {post?.username}</Typography>

                                <form onSubmit={sendFirstMessage} className="w-100 d-flex flex-column">

                                    <TextField value={body} onChange={(e) => setBody(e.target.value)} className="w-100" placeholder="say something..." variant="filled" />

                                    <Button disabled={ body.length == 0 || send } role="submit" endIcon={<Send />} variant="contained" className="align-self-end mt-5">

                                        {

                                            send

                                            ?

                                            <CircularProgress size={14}/>

                                            :

                                            <Typography textTransform={"lowercase"}>Send message</Typography>

                                        }

                                    </Button>

                                </form>

                            </div>

                    }

                </DialogContent>

            </Dialog>

            {/* end chat history check modal */}



        </Box>
    )
}

export default CommunityPost