import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Statistics =({added, text, figure, icon})=>{

    const navigate = useNavigate()

    const handleClick=()=>{

        if(text.includes("ploads")){
            navigate("/crop-selection-view")
        }

    }

    return(
        <Box className="bg-white rounded-much px-3 py-4 mt-2" sx={{mr:1}}>

            <Typography variant="h4">{figure}</Typography>

            <Button startIcon={icon} onClick={handleClick}>
                
            <Typography textTransform={"lowercase"}>{text}</Typography>

            </Button>
            
        </Box>
    )
}
export default Statistics