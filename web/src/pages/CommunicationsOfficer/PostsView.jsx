import Layout from "../../components/Layout"

import PostsImage from '../../assets/images/bg.jpg'
import { Box, Grid, Button, Typography, Dialog, DialogContent, TextField, IconButton, Skeleton } from "@mui/material"
import CommunityPost from "../../components/CommunityPost"
import { useEffect, useState } from "react"

import { motion } from 'framer-motion'
import ModalHeader from "../../components/ModalHeader"
import { Send } from "@material-ui/icons"
import UserProfile from "../../components/UserProfile"
import Message from "../../components/Message"
import { GET } from "../../utilities/GET"

const PostsView = () => {

    const [notice, setNotice] = useState(true)


    // comments 




    const [posts, setPosts] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState(false)

    useEffect(() => {

        GET(setLoading, 'posts', setPosts, setError)

    }, [])

    return (
        <Layout>



            {/* <div className="image shadow-sm">
                Community Posts
            </div> */}


            <Grid sx={{ mt: 2 }} gap={2} container >


                {/* all posts  */}

                <Grid item lg={5} overflow={'scroll'} height={"80vh"} >

                    {

                        loading

                            ?

                            Array(5).fill().map( (_, i)=>
 
                                <Box key={i} sx={{mb:2}}>

                                    <Box className="d-flex align-items-center">

                                        <Skeleton height={40} width={40} variant="circular" />
                                        <Skeleton height={40} sx={{ flex: 1, ml: 2 }} />
                                    </Box>

                                    <Skeleton height={"40vh"} />

                                </Box>

                            )

                            :


                            posts.length == 0

                                ?

                                <Typography variant="h5" fontWeight={900}>No posts found</Typography>

                                :

                                posts.map(post => (
                                    <CommunityPost post={post} />
                                ))
                    }

                </Grid>

                <Grid item lg={5}>

                    {
                        notice && <>
                            <Box className="linear-gradient d-flex flex-column text-light shadow-sm rounded-much p-4">

                                <Typography lineHeight={1.8}>
                                    Posts enable farmers to get updated on the current trends and outbreaks, please engage in the community to help improve farmer's knowlegde
                                </Typography>

                                <Button onClick={() => setNotice(false)} sx={{ borderRadius: 100, mt: 2 }} className="bg-light align-self-end text-dark">
                                    <Typography textTransform={"lowercase"}>Close</Typography>
                                </Button>
                            </Box>
                        </>
                    }


                </Grid>

            </Grid>




        </Layout>
    )
}

export default PostsView