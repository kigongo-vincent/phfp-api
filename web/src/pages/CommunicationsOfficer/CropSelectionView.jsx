import { Box, Button, Grid, IconButton, Skeleton, Typography } from "@mui/material"
import Layout from "../../components/Layout"
import { FaArrowCircleRight } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GET } from "../../utilities/GET"
import { ArrowRight } from "@material-ui/icons"

const CropSelectionView = ()=>{

    const navigate = useNavigate()

    const [crops, setCrops] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        GET(setLoading, "crops", setCrops, null)

    },[])


    return(
        <Layout>

            <Typography fontWeight={"bold"} variant="h6" sx={{my:4}} className="linear-gradient text-light w-50 p-4 rounded">
                Crop selection

                <Typography sx={{mt:1}}>Please select the crop that you'd wish to obtain information abaout</Typography>
            </Typography>

            {/* crops  */}
            <Box display={"flex"} alignItems={"center"}>


            {

                loading

                ?

                Array(2).fill().map((_, i)=>(

                    <Box sx={{mr:1}} className="bg-white p-4 rounded rounded-much">
                        <Skeleton height={30} width={100}/>
                    </Box>

                ))

                :

                crops.length == 0 

                ?

                <Typography>No crops found</Typography>

                :

                crops.map(crop => (
                    <Box sx={{mr:1}} className="bg-white p-4 rounded rounded-much">
                        <Button onClick={()=>navigate(`/information/${crop?.id}`, {state: {name: crop?.name}})} endIcon={<ArrowRight/>}>{crop.name}</Button>
                    </Box>
                ))
            }

            </Box>


        </Layout>
    )
}

export default CropSelectionView