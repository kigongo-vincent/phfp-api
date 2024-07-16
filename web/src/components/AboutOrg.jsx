import { Dialog, DialogContent, IconButton, Button, Typography, Box } from "@mui/material"
import { Close, LocationOn, Phone } from "@material-ui/icons"
import GeoLocation from "./GeoLocation"

const About =({organization, orgVisibility, setOrgVisibility})=>{
    return(
        <Dialog open={orgVisibility}>

        <DialogContent>
  
        <Box minWidth={500} className="d-flex align-items-center justify-content-between">
  
          <Typography>About your Organization</Typography>
  
          {/* close org info  */}
          <IconButton onClick={()=>setOrgVisibility(false)}>
            <Close/>
          </IconButton>
  
        </Box>
  
  
        {/* org details  */}
        
        <Typography textTransform={"capitalize"} className="bg-pale px-4 py-2 rounded" sx={{mt:4, mb:3}} variant="h6">{organization.name}</Typography>
  
  
        {/* org contact  */}
        <Box className="d-flex align-items-center justify-content-between">
  
        <Button  sx={{mb:2}}  startIcon={<LocationOn color="secondary"/>}>
          <Typography textTransform={"lowercase"}>Geo location</Typography>
        </Button>  
  
        <Button variant="contained" sx={{mb:2}}  startIcon={<Phone/>}>
          <Typography>{organization?.contact}</Typography>
        </Button>
  
        </Box>
  
  
        {/* map component  */}
        <GeoLocation address={organization?.address}/>
  
        </DialogContent>
  
        </Dialog>
    )
}

export default About