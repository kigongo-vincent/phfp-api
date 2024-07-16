import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import { Box, TextField, Typography, Button, InputLabel, CircularProgress, Alert, IconButton } from "@mui/material"
import { Close, Image, Save } from "@material-ui/icons"
import HiddenInput from "../../components/HiddenInput"
import { useDispatch } from "react-redux"
import { sendAlertMessage } from "../../model/data"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const EquipmentAdd = () => {

    const {id} = useParams()

    // name 
    const [name, setName] = useState("")

    const [loading, setLoading] = useState(false)

    // description 
    const [description, setDescription] = useState("")

    // instructions 
    const [instructions, setInstructions] = useState("")

    const location = useLocation()

    const title = location.state?.title

    // photo of equipment 
    const [photo, setPhoto] = useState(null)

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const handleSubmit = async() => {

        setLoading(true)

        const formData = new FormData()

        formData.append("name", name)
        formData.append("description", description)
        formData.append("instructions", instructions)
        formData.append("image", photo)

        const response = await fetch(`http://localhost:8000/add_equipment/${id}`,{
            method: "POST",
            body: formData
        })

        // if ok 
        if (response.status == 201) {

            
               
                dispatch(sendAlertMessage({
                    body: "equipment has been added successfully",
                    severity: "success"
                }))

                navigate("/")

                setLoading(false)

          

        }
        else {

           
                dispatch(sendAlertMessage({
                    body: "Failed to add equipment, please try again",
                    severity: "error"
                }))

                setLoading(false)

           

        }


    }

    useEffect(()=>{
        if(!title){
            navigate("/")
        }

    },[])


    return (
        <Layout>

            <Typography sx={{ my: 2 }}>
                Add an equipment for <span className="text-blue">{title}</span>
            </Typography>

            <Box sx={{ p: 4 }} className="bg-white rounded-much">
                {/* name input  */}
                <TextField
                    className="w-100"
                    label="Name of the equipment"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* description input  */}
                <TextField
                    className="w-100 my-4"
                    rows={4}
                    multiline
                    label="Description of the equipment"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* instructions input  */}
                <TextField
                    className="w-100"
                    rows={4}
                    multiline
                    label="Instructions on how to use the equipment"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                />


                {/* upload image and submit  */}

                <Box sx={{ mt: 3 }} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>

                    {/* image upload  */}

                    {

                        photo

                            ?

                            <Alert 
                            action = {
                                <IconButton onClick={()=>setPhoto(null)}>
                                    <Close/>
                                </IconButton>
                            }
                            >
                                <Typography>
                                    You have selected {photo.name}
                                </Typography>
                            </Alert>

                            :

                            <Button
                                sx={{ borderRadius: 100, px: 2.4 }}
                                variant="contained" startIcon={<Image />}>

                                <InputLabel>
                                    <Typography className="text-light" textTransform={"lowercase"}>Select image of the Equipment</Typography>
                                    <HiddenInput accept={".jpg, .jpeg, .png"} setter={(e) => setPhoto(e.currentTarget.files[0])} />
                                </InputLabel>
                            </Button>

                    }


                    {/* save btn  */}
                    <Button

                        onClick={handleSubmit}

                        disabled={!name || !description || !instructions || !photo || loading}


                        startIcon={<Save />} color="secondary" variant="contained">

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



        </Layout>
    )
}

export default EquipmentAdd