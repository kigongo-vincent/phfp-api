import { Box, TextField, Alert, Typography, Button, InputLabel, Dialog, DialogContent, DialogActions, Autocomplete, IconButton, CircularProgress } from "@mui/material"
import Layout from "../../components/Layout"
import { useEffect, useState } from "react"
import { Close, Save, VideoCall } from "@material-ui/icons"
import HiddenInput from "../../components/HiddenInput"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getOrganization, getUser, sendAlertMessage } from "../../model/data"
import { GET } from "../../utilities/GET"

const PestControlMeasureAdd = () => {

    // name 
    const [name, setName] = useState("")

    const {id} = useParams()

    const location = useLocation()
    
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const pest = location?.state?.pest

    const user = useSelector(getUser)

    // descriptions
    const [description, setDescription] = useState("")
    
    const [selectedPest, setSelectedPest] = useState("")

    // instructions
    const [instructions, setInstructions] = useState("")

    const org = useSelector(getOrganization)

    // video 
    const [video,setVideo] = useState(null)

    const [loading, setLoading] = useState(false)

    const [pests, setPests] = useState([])

    function getPestId(name){
        return pests?.find(pest =>pest?.name == name)?.id
    }

    useEffect(()=>{

        GET(null, "get_pests", setPests, null)

    },[])


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
        formData.append("category", "pest control measure")
        formData.append("pest", pest ? pest : getPestId(selectedPest))

        const res = await fetch(`http://localhost:8000/addarticle/`,{
            method: "POST",
            body: formData
        })

        if(res.status == 201){

            const data = await res.json()

            dispatch(sendAlertMessage({

                body: "Upload successfull",
                severity: "success"

                
            }))
            
            navigate("/")
            
            setLoading(false)

        }
        else{

            dispatch(sendAlertMessage({

                        body: "Failed to add information, please try again",
                        severity: "error"
            
                    }))

                    setLoading(false)

        }
    }






    useEffect(()=>{

        if(pest){
            setSelectedPest(pest)
        }
            

    },[])

    

    return (
        <Layout>

            <Box className="bg-white p-4 shadow-md rounded-much">


                
                <Typography sx={{mb:2}}>
                        Add pest control measure
                    </Typography>
                

              {
                !pest &&   <Autocomplete
                options={pests.map(pest => pest?.name)}
                value={selectedPest}
                onChange={(_,value)=>setSelectedPest(value)}
                renderInput={(params)=> <TextField {...params} label="Select the pest"/>}
                />

              }
                {/* name  */}
                <TextField
                    label="control measure"
                    className="w-100 my-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* description  */}
                <TextField
                    label="Description (Provide an in depth explanation about the pest control measure)"
                    className="w-100 my-3"
                    value={description}
                    multiline
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* instructions  */}
                <TextField
                    label="Instructions (Please provide a step by step guide on how to execute this control measure)"
                    className="w-100 my-3"
                    value={instructions}
                    multiline
                    rows={4}
                    onChange={(e) => setInstructions(e.target.value)}
                />

                {/* video upload and save container  */}
                <Box className="d-flex align-items-center justify-content-between">

                    {/* video upload btn  */}
                    {
                        video

                        ?

                        <Alert action={<IconButton onClick={()=>setVideo(null)}><Close/></IconButton>}>
                            <Typography>You have selected {video?.name}</Typography>
                        </Alert>

                        :

                        <Button startIcon={<VideoCall/>}>
                        <InputLabel>
                        <Typography textTransform={"lowercase"}>add an instructional video (Optional)</Typography>
                        <HiddenInput accept={".mp4, .wav"} setter={setVideo} is_video={true}/>
                        </InputLabel>
                    </Button>

                    }

                    {/* save btn  */}
                    <Button 
                    onClick={handleSubmit}
                    disabled={
                        !name || !description || !instructions || !video || loading || !selectedPest
                    }
                    color="secondary" variant="contained" startIcon={<Save/>}>
                        
                        {

                            loading

                            ?

                            <CircularProgress size={14}/>

                            :

                            <Typography textTransform={"lowercase"}>Save control measure</Typography>

                        }

                    </Button>

                </Box>


            </Box>

        </Layout>
    )
}
export default PestControlMeasureAdd