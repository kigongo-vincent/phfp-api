import { Autocomplete, Button, Dialog, DialogContent, TextField, Typography } from "@mui/material"
import ModalHeader from "./ModalHeader"
import { useEffect, useState } from "react"
import { ArrowRight } from "@material-ui/icons"
import { useNavigate } from "react-router-dom"
import { GET } from "../utilities/GET"

const AddInfo = ({ open, setter }) => {

    // crop selected 
    const [crop, setCrop] = useState("")

    // category selected 
    const [category, setCategory] = useState("")

    // all crops 
    const [crops, setCrops] = useState([])

    const navigate = useNavigate()

    const getCropId = (cropName)=>{
      return crops?.find(crop => crop?.name == cropName)?.id
    }

    const nextPage =()=>{
        if(category.includes("technique")){
            navigate(`/add-post-harvest-technique/${getCropId(crop)}`)
        }
        else if(category.includes("control")){
            navigate(`/add-pest/${getCropId(crop)}`)
        }
        else{
            setter(false)
        }
    }

    // info category 
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "Post-harvest techniques"
        },
        {
            id: 2,
            name: "Pest and disease control measures"
        }
    ])


    useEffect(()=>{

        GET(null, 'crops', setCrops, null)

    }, [])
    return (
        <Dialog open={open}>

            <DialogContent sx={{minWidth: 500}}>

                {/* header  */}
                <ModalHeader title={"Add information"} setter={setter} />

                {/* crop selection  */}
                <Autocomplete
                    options={crops.map(crop => crop.name)}
                    className="my-3 w-100"
                    value={crop}
                    onChange={(_, value) => setCrop(value)}
                    renderInput={(params)=><TextField label="Crop" {...params}/>}
                />

                {/* info category selection  */}
                <Autocomplete
                    options={categories.map(category => category.name)}
                    className="my-3 w-100"
                    value={category}
                    onChange={(_, value) => setCategory(value)}
                    renderInput={(params)=><TextField label="Category" {...params}/>}
                />

                {/* save button  */}
                <Button onClick={nextPage} disabled={!crop || !category } variant="contained" endIcon={<ArrowRight/>}>
                    <Typography textTransform="lowercase">continue</Typography>
                </Button>

            </DialogContent>

        </Dialog>
    )
}

export default AddInfo