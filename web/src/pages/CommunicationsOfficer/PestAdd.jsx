import { useState } from "react"
import Layout from "../../components/Layout"
import { Box, TextField, Typography, Button, InputLabel, Alert, Autocomplete, IconButton, CircularProgress } from "@mui/material"
import { Close, Image, Save } from "@material-ui/icons"
import HiddenInput from "../../components/HiddenInput"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { sendAlertMessage } from "../../model/data"

const PestAdd = () => {

    // name 
    const [name, setName] = useState("")

    const {id} = useParams()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    // description 
    const [description, setDescription] = useState("")

    const [loading, setLoading] = useState(false)

    // common damage
    const [commonDamage, setCommonDamage] = useState("")

    const [habitat, setHabitat] = useState("")


    const handleSubmit=async()=>{
        
        const formData = new FormData()
        setLoading(true)
        
        formData.append("name", name)
        formData.append("description", description)
        formData.append("common_damage", commonDamage)
        formData.append("preferred_habitat",habitat)
        formData.append("image", photo)

        const response = await fetch(`http://localhost:8000/add_pest/`,{
            method: "POST",
            body: formData
        })

        if(response.status == 202){
            dispatch(sendAlertMessage({
                severity: "info",
                body: "The pest you are trying to add is already existing in the system, please just proceed to the pest control measure for the pest, by clicking on the blue button"
            }))
            setLoading(false)
        }

        else if(response.status == 201){
            dispatch(sendAlertMessage({
                severity: "success",
                body: "pest has been added succussfully, you can now provide information on how to control this pest"
            }))

            setLoading(false)

            const data = await response.json()

            navigate(`/add-pest-control-measure/${id}`, {state: {pest: data?.id}})

        }

        else{
            dispatch(sendAlertMessage({
                body: "Failed to add information, please try again", severity: "error"
            }))

            setLoading(false)

            
        }


       

    }

    // photo of Pest 
    const [photo, setPhoto] = useState(null)
    return (
        <Layout>



            <Box sx={{ p: 4 }} className="bg-white rounded-much">

                {/* reminder  */}
                <Alert className="w-100 mb-3" severity="warning">
                    <Typography>
                        Before you provide a pest control measure, you must provide an explanation for the pest you are seeking to prevent
                    </Typography>
                </Alert>

                {/* name input  */}
                <TextField
                    className="w-100 my-2"
                    label="Name of the pest"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    helperText={"please ensure that the pest you are adding is non existant if so, please proceed without adding a crop"}
                />

            


                {/* description input  */}
                <TextField
                    className="w-100 my-4"
                    rows={2}
                    multiline
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* damage input  */}
                <div className="d-flex align-items-center justify-content-between">

                    <TextField
                        className="w-100"
                        sx={{ marginRight: 1 }}
                        label="Common damage"
                        value={commonDamage}
                        onChange={(e) => setCommonDamage(e.target.value)}
                    />

                    <TextField
                        className="w-100"
                        label="Preferred Habitat"
                        value={habitat}
                        onChange={(e) => setHabitat(e.target.value)}
                    />

                </div>


                {/* upload image and submit  */}

                <Box sx={{ mt: 3 }} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>

                    {/* image upload  */}

                    {
                        photo

                            ?

                            <Alert action={
                                <IconButton onClick={()=>setPhoto(null)}>
                                    <Close/>
                                </IconButton>
                            }>
                                <Typography>You have selected {photo.name}</Typography>
                            </Alert>

                            :

                            <Button
                                startIcon={<Image />}>

                                <InputLabel>
                                    <Typography className="text-blue" textTransform={"lowercase"}>Select image of a crop attacked by the Pest</Typography>
                                    <HiddenInput accept={".jpg, .jpeg, .png"} setter={(e) => setPhoto(e.currentTarget.files[0])} />
                                </InputLabel>
                            </Button>

                    }


                    <div className="d-flex align-items-center">

                        {/* save btn  */}
                    <Button 
                     sx={{marginRight: 1}} onClick={()=>navigate(`/add-pest-control-measure/${id}`)} variant="contained">
                       continue without adding a pest
                    </Button>

                    {/* save btn  */}
                    <Button 
                    onClick={handleSubmit}
                    disabled={
                        loading || !name || !description || !commonDamage || !habitat || !photo
                    }
                    startIcon={<Save />} color="secondary" variant="contained">
                        {
                            loading 
                            
                            ?

                            <CircularProgress size={14}/>

                            :

                            <Typography textTransform={"lowercase"}>Save</Typography>

                        }
                    </Button>

                    </div>

                </Box>



            </Box>



        </Layout>
    )
}

export default PestAdd