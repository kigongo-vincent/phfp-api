import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Badge, Box, Drawer, IconButton, Typography } from '@mui/material'
import { Menu, Message, Notifications } from '@material-ui/icons'

import NotificationsComponent from './Notifications'
import { useLocation, useNavigate } from 'react-router-dom'

import { GET } from '../utilities/GET'

import { useDispatch, useSelector } from 'react-redux'

import { clearAlertMessage, getUser, sendAlertMessage } from '../model/data'
import { constants } from '../utilities/constants'
import Sidebar from './Sidebar'

const Navbar = ({organization}) => {

  const navigate = useNavigate()

  // notifications toggle 
  const [notificationsVisibilty, setNotificationsVisibility] = useState(false)

  //anchor for notifications
  const notificationAnchor = useRef()

  const user = useSelector(getUser)

  // current route 
  const location = useLocation()

  const currentRoute = location?.pathname

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(false)

  const [messagesError, setMessagesError] = useState(false)

  const [notifications, setNotifications] = useState([])

  const [chatrooms, setChatrooms] = useState([])

  const [openDrawer, setOpenDrawer] = useState(false)

  const [new_messages, setNew_messages] = useState(0)


  const dispatch = useDispatch()

  useMemo(() => {

    GET(setLoading, `notification/${user?.user_id}`, setNotifications, setError)
    GET(setLoading, `get_chatrooms/${user?.user_id}`, setChatrooms,setMessagesError )

  }, [])


  const getNewMessages =()=>{

    let new_messages = 0

    chatrooms.length != 0 && chatrooms.forEach(chatroom => {

      new_messages += +(chatroom?.chat_buddy?.new_messages_count)
      
    });

    return new_messages

  }

  useEffect(()=>{

    if(chatrooms.length != 0 && !location.pathname.includes("messages")){

      setNew_messages(getNewMessages())

    }
  }, [chatrooms])

 


  useEffect(() => {

      if(error){

        dispatch(sendAlertMessage({
          severity: "error",
          body: "failed to get notifications"
        }))
  
  
        setTimeout(() => {
  
          setError(false)
          dispatch(clearAlertMessage())
  
        }, 3000);
  
      
      }

      if(messagesError){

        dispatch(sendAlertMessage({
          severity: "error",
          body: "failed to get messages"
        }))
  
  
        setTimeout(() => {
  
          setError(false)
          dispatch(clearAlertMessage())
  
        }, 3000);
  
      

      }

  }, [error, messagesError])

  return (
    <Box sx={{ borderRadius: 100 }} className="bg-white shadow-md d-flex align-items-center justify-content-between py-2 px-5">

      <div className="d-flex align-items-center">

        <IconButton onClick={()=>setOpenDrawer(true)} className='d-flex d-lg-none'><Menu /></IconButton>

        <Typography className='text-secondary d-lg-flex d-none'>Empowering farmers</Typography>

      </div>

      {/* notifications and messages  */}

      <Box>

        {/* notifications toggle  */}
        <IconButton
          ref={notificationAnchor}
          onClick={() => {
            setNotificationsVisibility(true);
            setNotifications(notifications.map(notification => ({ ...notification, is_viewed: true })));
            fetch(`${constants.URL}/view_notifications/${user?.user_id}`)

            // GET(setLoading, `view_notifications/${user?.user_id}`, setError, setError)
          }}
          sx={{ mr: 2 }}>
          <Badge badgeContent={notifications?.filter(notification => !notification?.is_viewed)?.length} color='error'>
            <Notifications />
          </Badge>
        </IconButton>
        {/* end notifications toggle  */}


        {/* messages toggle  */}
        <IconButton onClick={() => { navigate("/messages"); setNew_messages(0)}}>
          <Badge badgeContent={new_messages} color='error'>
            <Message />
          </Badge>
        </IconButton>
        {/* end messages toggle  */}

      </Box>

      {/* notifications and messages  */}


      {/* =========================================================== */}

      {/* notifications modal  */}
      <NotificationsComponent notifications={notifications} open={notificationsVisibilty} setter={setNotificationsVisibility} anchorEl={notificationAnchor} />


      <Drawer open={openDrawer}>

        <div className="px-5" onBlur={()=>setOpenDrawer(false)}>

          <Sidebar user={user} organization={organization}/>

        </div>

      </Drawer>

    </Box>




  )
}

export default Navbar