import { Box, Dialog, DialogContent, Grid, Typography } from "@mui/material"
import Layout from "../../components/Layout"
import { useEffect, useState } from "react"

// test assests import 
import TestImage from '../../assets/test/test.jpg'
import TestVideo from '../../assets/test/test.mp4'
import UserProfile from "../../components/UserProfile"
import { Category } from "@material-ui/icons"
import PestImage from '../../assets/test/test2.jpg'
import ModalHeader from "../../components/ModalHeader"
import { Navigate, useLocation } from "react-router-dom"
import { getRelativeTime } from "../../utilities/getRelativeTime"
import { GET } from "../../utilities/GET"


const InformationDetails = () => {

    const [pest, setPest] = useState(null)

    const [equipment, setEquipment] = useState(null)

    // pest modal toggle 
    const [pestVisibility, setPestVisibility] = useState(false)



    // equipment modal toggle 
    const [equipmentVisibility, setEquipmentVisibility] = useState(false)

    const location = useLocation()

    const information = location.state?.information

    useEffect(() => {

        if (information?.pest && pestVisibility) {
            GET(null, `get_pest/${information.pest}`, setPest, null)
        }

    }, [pestVisibility])

    useEffect(() => {

        if (information?.equipment && equipmentVisibility) {
            GET(null, `get_equipment/${information.equipment}`, setEquipment, null)
        }

    }, [equipmentVisibility])


    return (

        !information

            ?

            <Navigate to={-1} />

            :

            <Layout>



                <Box sx={{ p: 4 }} className="rounded bg-white shadow-md" height={"80vh"} overflow={"scroll"}>

                    {/* profile header  */}
                    <UserProfile timestamp={getRelativeTime(information?.time)} organization={information?.org_name} is_officer={information?.org_name} username={information?.username} />

                    <br />

                    {/* title  */}
                    <Typography variant="h5" sx={{ mb: 1 }} fontWeight={"600"} textTransform={"uppercase"}>{information.title}</Typography>



                    {/* hidden info  */}
                    {


                        information?.category == "pest control measure"

                            ?

                            <Typography role="button" className="text-red" onClick={() => setPestVisibility(true)}>(prevents {information.pest_name})</Typography>

                            :

                            information?.category == "post-harvest technique" && information.equipment

                                ?

                                <Typography role="button" className="text-red" onClick={() => setEquipmentVisibility(true)}>(achieved using {information.equipment_name})</Typography>

                                :

                                ""

                    }

                    {/* pest details  */}


                    <Typography lineHeight={1.7} sx={{ my: 2 }}>{information.description}</Typography>

                    {/* instructions  */}
                    <u><Typography fontWeight={700} sx={{ mt: 4, mb: 1 }}>INSTRUCTIONS</Typography></u>

                    <Typography className="text-secondary" lineHeight={1.7} sx={{ my: 2 }}>{information.instructions}</Typography>

                    {/* video  */}

                    <Grid container>

                        {/* video  */}
                        <Grid item lg={5}>

                            <div className="video-container">
                                <video controls autoPlay muted loop src={`http://localhost:8000${information.tutorial}`} />

                            </div>

                        </Grid>

                    </Grid>

                    {/* equipment link  */}

                </Box>


                {/* ================================================================= */}

                {/* pest modal  */}

                <Dialog open={pestVisibility}>

                    {
                        pest && <DialogContent>

                            <ModalHeader title={`Details about the pest (${pest?.name})`}
                                setter={setPestVisibility} />

                            <Typography fontWeight={900} sx={{ my: 2 }}>{pest?.name}</Typography>

                            <Grid container>

                                {/* pest image  */}
                                <Grid item lg={4}>

                                    <div className="image-container">
                                        <img src={`http://localhost:8000${pest?.image}`} />
                                    </div>

                                </Grid>


                                {/* pest description  */}
                                <Grid item lg={8}
                                >
                                    <u><Typography sx={{ pl: 3, mb: 1 }}>Description</Typography></u>

                                    <Typography className="text-secondary" sx={{ pl: 3 }} textAlign={"justify"}>
                                        {pest?.description}
                                    </Typography>

                                </Grid>

                            </Grid>

                            {/* preferred habitat  */}

                            <Box className="bg-pale p-4 my-3 rounded-much">

                                <Typography sx={{ mb: 1 }}>Preferred Habitat</Typography>

                                <Typography className="text-secondary" textAlign={"justify"}>
                                    {pest?.preferred_habitat}
                                </Typography>


                            </Box>
                            <Box className="bg-pale p-4 my-3 rounded-much">

                                <Typography sx={{ }}>Common Damage caused</Typography>

                                <Typography className="text-secondary" textAlign={"justify"}>
                                    {pest?.common_damage}
                                </Typography>
                            </Box>

                        </DialogContent>
                    }

                </Dialog>

                {/* end pest modal  */}


                {/* ========================================================================= */}


                {/* equipment modal  */}

                <Dialog open={equipmentVisibility}>

                    <DialogContent>

                        <ModalHeader title={"Details about the Equipment used in conjuction with this technique"}
                            setter={setEquipmentVisibility} />

                        <Typography fontWeight={900} sx={{ my: 2 }}>{equipment?.name}</Typography>

                        <Grid container>

                            {/* pest image  */}
                            <Grid item lg={4}>

                                <div className="image-container">
                                    <img src={`http://localhost:8000${equipment?.image}`} />
                                </div>

                            </Grid>


                            {/* pest description  */}
                            <Grid item lg={8}
                            >
                                <u><Typography sx={{ pl: 3, mb: 1 }}>Description</Typography></u>

                                <Typography className="text-secondary" sx={{ pl: 3 }} textAlign={"justify"}>
                                    {equipment?.description}
                                </Typography>

                            </Grid>

                        </Grid>

                        {/* preferred habitat  */}

                        <Box className="bg-pale p-4 my-3 rounded-much">

                            <Typography sx={{ mb: 1 }}>Usage Instructions</Typography>

                            <Typography className="text-secondary" textAlign={"justify"}>
                                {equipment?.instructions}
                            </Typography>

                        </Box>

                    </DialogContent>

                </Dialog>


                {/* end equipment modal  */}

            </Layout>
    )
}

export default InformationDetails