import { Box, TextField, Alert, Typography, Button, InputLabel, Dialog, DialogContent, DialogActions, CircularProgress } from "@mui/material"
import Layout from "../../components/Layout"
import { useEffect, useState } from "react"
import { Save, VideoCall } from "@material-ui/icons"
import HiddenInput from "../../components/HiddenInput"
import { useDispatch, useSelector } from "react-redux"
import { getOrganization, getUser, sendAlertMessage } from "../../model/data"
import { useNavigate, useParams } from "react-router-dom"

const PostHarvestTechniqueAdd = () => {

    // name 
    const [name, setName] = useState("")

    const [article, setArticle] = useState("")

    // descriptions
    const [description, setDescription] = useState("")

    // instructions
    const [instructions, setInstructions] = useState("")

    // video 
    const [video,setVideo] = useState(null)

    const {id} = useParams()

    const org = useSelector(getOrganization)

    const [loading, setLoading] = useState(false)

    const user = useSelector(getUser)

    // toggle add equipment 
    const [equipmentAddConfirmationVisibility, setEquipmentAddConfirmationVisibility] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit=async()=>{

        setLoading(true)

        const formData = new FormData()

        formData.append("title", name)
        formData.append("description", description)
        formData.append("instructions", instructions)
        formData.append("organization", org?.id)
        formData.append("tutorial", video)
        formData.append("crop", id)
        formData.append("author",user?.user_id)
        formData.append("category", "post-harvest technique")

        const res = await fetch(`http://localhost:8000/addarticle/`,{
            method: "POST",
            body: formData
        })

        if(res.status == 201){

            const data = await res.json()

            setArticle(data)

            setEquipmentAddConfirmationVisibility(true)

            setLoading(false)

        }
        else{

            dispatch(sendAlertMessage({

                        body: "Failed to add information, please try again",
                        severity: "error"
            
                    }))

                    setLoading(false)

        }


        // if ok 
        
        
        // if error 
        // setTimeout(() => {

        //     setLoading(false)

        //     
            
        // }, 3000);
        
        

    }

    const navigate = useNavigate()

    const handleCancel =()=>{
        setEquipmentAddConfirmationVisibility(false)

        setTimeout(() => {

            navigate("/")
            
        }, 500);
    }

    useEffect(()=>{

        if(video){

            dispatch(sendAlertMessage({
                severity: "info",
                body:  `you have selected ${video.name}`
            }))

            
            
        }

    },[video])

    return (
        <Layout>

            <Box className="bg-white p-4 shadow-md rounded-much">


                {/* reminder  */}
                <Alert className="w-100 mb-2" severity="warning">
                    <Typography>
                        You are about to add a post-harvest technique,
                        Post-harvest techniques added are visibile to all users on the platform, cannot be editted or deleted for audit purposes
                    </Typography>
                </Alert>


                {/* name  */}
                <TextField
                    label="Name of the post-harvest technique"
                    className="w-100 my-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* description  */}
                <TextField
                    label="Description (Brief explanation on the post-harvest technique)"
                    className="w-100 my-3"
                    value={description}
                    multiline
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* instructions  */}
                <TextField
                    label="Instructions (Provide a step by step guide on how to implement the post-harvest technique)"
                    className="w-100 my-3"
                    value={instructions}
                    multiline
                    rows={4}
                    onChange={(e) => setInstructions(e.target.value)}
                />

                {/* video upload and save container  */}
                <Box className="d-flex align-items-center justify-content-between">

                    {/* video upload btn  */}
                    <Button startIcon={<VideoCall/>}>
                        <InputLabel>
                        <Typography textTransform={"lowercase"}>add an instructional video (Optional)</Typography>
                        <HiddenInput setter={setVideo} is_video={true} accept={".mp4, .wav"}/>
                        </InputLabel>
                    </Button>

                    {/* save btn  */}
                    <Button 
                    
                    onClick={handleSubmit}
                    
                    disabled={

                        !name || !instructions || !description || !video || loading

                    }
                     color="secondary" variant="contained" startIcon={<Save/>}>
                       
                       {
                        loading

                        ?

                        <CircularProgress size={14} />

                        :

                        <Typography textTransform={"lowercase"}>Save</Typography>
                       }

                    </Button>

                </Box>


            </Box>

            {/* ============================================================================================== */}

            {/* equipment add confirmation modal  */}

            <Dialog open={equipmentAddConfirmationVisibility}>

                <DialogContent>

                    <Alert className="w-100 mb-4">
                        <Typography>
                            Post-harvest technique has been added successfully
                        </Typography>
                    </Alert>

                    <Typography>
                    You can also add an equipment used in the process of executing this technique, would you wish to continue and add information about this equipment
                    </Typography>

                </DialogContent>

                <DialogActions>

                    {/* reject to add equipment */}
                    <Button sx={{borderRadius:100}} onClick={handleCancel} variant="contained" color="secondary">
                        <Typography>No</Typography>
                    </Button>

                    {/* accept add equipment  */}
                    <Button onClick={()=>navigate(`/add-equipment/${article?.id}`, {state: {title: article?.title}})} sx={{borderRadius:100}} variant="contained" >
                        <Typography>yes</Typography>
                    </Button>

                </DialogActions>

            </Dialog>


        </Layout>
    )
}
export default PostHarvestTechniqueAdd