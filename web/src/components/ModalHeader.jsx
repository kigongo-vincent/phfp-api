import { Close } from "@material-ui/icons"
import { Box, IconButton, Typography } from "@mui/material"

const ModalHeader=({title, setter})=>{
    return(
        <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>

            {/* title  */}
            <Typography>{title}</Typography>

            {/* close button  */}
            <IconButton onClick={()=>setter(false)}>

                <Close/>
                
            </IconButton>
        
        </Box>
    )
}

export default ModalHeader