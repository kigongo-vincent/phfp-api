import { Alert, Box, Button, Dialog, DialogContent, Grid, IconButton, Skeleton, Typography } from "@mui/material"
import Layout from "../../components/Layout"


// image import for addd info 
import colors from '../../assets/images/colors.png'

// group icon import 
import GroupIcon from '../../assets/svgs/UserGroup.svg'

// stat comp import 
import Statistics from "../../components/Statistics"

import Post from '../../components/Post'

import { useEffect, useLayoutEffect, useState } from "react"

// add post modal import 
import AddPost from "../../components/AddPost"


// import test post image 
import TestImage from '../../assets/test/test.jpg'

// community post import 
import CommunityPost from '../../components/CommunityPost'

import { GET } from '../../utilities/GET'


import { FaPlusCircle, FaSignOutAlt } from "react-icons/fa"
import { AddAPhoto, ArrowRight, Close, CloudUpload, LocationCity, LocationOn, Phone, PostAddSharp } from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux"
import { DashboardLock, clearUser, getOrganization, getUser, refreshStatus } from "../../model/data"
import AddInfo from "../../components/AddInfo"
import ModalHeader from "../../components/ModalHeader"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {


  // lock status 
  const is_locked = useSelector(DashboardLock)

  const navigate = useNavigate()

  // add post modal toggle 
  const [addPostVisibility, setAddPostVisibility] = useState(false)

  // add info modal toggle 
  const [addInfoVisibility, setAddInfoVisibility] = useState(false)


  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    uploads: 0,
    posts: 0
  })

  const [postVisibility, setPostVisibility] = useState(false)

  const [selected, setSlected] = useState(null)

  const [posts, setPosts] = useState([])

  const dispatch = useDispatch()

  const refresh = useSelector(refreshStatus)

  const organization = useSelector(getOrganization)

  const user = useSelector(getUser)


  useEffect(() => {

    GET(setLoading, `posts`, setPosts, setError)
    GET(setError, `get_statistics/${user?.user_id}`, setStats, setError)

  }, [refresh])

  useEffect(() => {
    if (selected) {
      setPostVisibility(true)
    }
  }, [selected])

  useEffect(() => {
    if (!postVisibility) {
      setSlected(null)
    }
  }, [postVisibility])

  return (
    <Layout>

      {/* statistics section  */}

      <Grid container>

        {/* upload info  */}

        <Grid item lg={3} >

          <Box className="bg-white p-3 rounded-much shadow-md" height={"100%"}>

            {/* add info image  */}
            <img style={{ mixBlendMode: "luminosity" }} src={colors} className="w-100" />

            {/* add info text and button   */}
            <Box display={"flex"} sx={{ mt: 2 }} alignItems={"center"} justifyContent={"space-between"}>

              <Typography>Add information</Typography>

              {/* upload form toggle btn  */}
              <IconButton onClick={() => setAddInfoVisibility(true)}>
                <FaPlusCircle size={30} className="bg-blue rounded-circle text-light p-2" />
              </IconButton>
              {/* end upload form toggle btn  */}

            </Box>

          </Box>

        </Grid>

        {/* end upload info  */}

        {/* statistics and community  */}

        <Grid item lg={4} sx={{ px: 1 }}>

          {/* community  */}
          <Box sx={{ p: 3 }} className="bg-white shadow-md rounded-much d-flex align-items-center justify-content-between">

            <Box>

              <Typography fontWeight={"bold"}>Connect with other people</Typography>

              <Typography variant="caption">Discover what other people are saying</Typography>

            </Box>

            <img src={GroupIcon} width={50} />

          </Box>
          {/* end community  */}

          {/* statistics  */}

          <Box display={"flex"} alignItems={"center"}>

            {/* info uploads  */}

            <Statistics figure={stats.uploads} text={"your uploads"} icon={<CloudUpload />} />

            {/* end info uploads  */}

            {/* total posts made  */}

            <Statistics figure={stats.posts} text={"Your Posts"} icon={<PostAddSharp />} />

            {/* end total posts made  */}

          </Box>

          {/* end statistics  */}

        </Grid>

        {/* end statistics and community  */}


        <Grid item lg={2}></Grid>


        {/* add post  */}
        <Grid item lg={3} >

          <Box height={"100%"} className="p-5 rounded-much bg-table-img text-light d-flex align-items-center justify-content-end flex-column">



            <Button variant="contained" onClick={() => setAddPostVisibility(true)} className="bg-body-tertiary px-4 text-dark" sx={{ borderRadius: 100 }} startIcon={<AddAPhoto />}>

              <Typography textTransform={"lowercase"}>Add a post</Typography>

            </Button>

          </Box>

        </Grid>
        {/* end add post  */}


      </Grid>
      {/* end statistics section  */}


      {/* ================================================================ */}


      {/* posts  */}
      <Box className="mt-3 p-4 bg-white rounded-much shadow-md">

        {/* header  */}
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>

          <Typography>Posts</Typography>

          {/* more posts  */}
          <Button onClick={() => navigate("/posts")} className="text-secondary" endIcon={<ArrowRight />}>
            <Typography textTransform={"lowercase"}>View all</Typography>
          </Button>
          {/* end more posts  */}

        </Box>
        {/* end header  */}


        {/* posts list  */}

        <Grid container>

          {

            loading

              ?

              Array(3).fill().map((_, i) => (
                <Grid item lg={4} key={i} sx={{ p: 2 }}>
                  <Box className="d-flex align-items-center">

                    <Skeleton height={40} width={40} variant="circular" />
                    <Skeleton height={40} sx={{ flex: 1, ml: 2 }} />
                  </Box>

                  <Skeleton height={"15vh"} />
                </Grid>
              ))

              :

              posts.length != 0
                ?
                
                posts?.slice(0, 3)?.map(post => (
                  <Grid item lg={4}>

                    <Post post={post} setter={setSlected} />

                  </Grid>
                ))

                :
                <Typography>No posts found</Typography>
                
          }


        </Grid>

        {/* end posts list  */}


      </Box>
      {/* end posts  */}


      {/* =================================================================================== */}

      {/* lock modal  */}

      <Dialog sx={{ backdropFilter: "blur(6px)" }} open={is_locked}>

        <DialogContent>

          <Alert severity="info">

            <Typography>
              Your organization is still under review, please wait for authorization by the admin, you will be notified via email if your account is activated
            </Typography>

          </Alert>

          {/* logout link  */}

          <Button onClick={() => dispatch(clearUser())} startIcon={<FaSignOutAlt size={14} />} color="secondary" variant="contained" sx={{ mt: 2 }}>
            <Typography textTransform={"lowercase"}>Logout</Typography>
          </Button>

          {/* end logout link  */}

        </DialogContent>


      </Dialog>

      {/* end lock modal  */}

      {/* ==================================================================================================== */}

      {/* add post modal  */}

      <AddPost open={addPostVisibility} setter={setAddPostVisibility} />

      {/* end add post modal  */}

      {/* add info modal  */}
      <AddInfo open={addInfoVisibility} setter={setAddInfoVisibility} />
      {/* end add info modal  */}



      {/* ================================================================================ */}

      {/* post details  */}

      <Dialog open={postVisibility}>

        <DialogContent className="bg-pale" sx={{ width: "32vw" }}>
          <ModalHeader title={"post details"} setter={setPostVisibility} />

          <br />

          <CommunityPost no_comments={true} post={selected} />

        </DialogContent>



      </Dialog>

      {/* end post details  */}



    </Layout>
  )
}

export default Dashboard