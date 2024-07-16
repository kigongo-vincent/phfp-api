import {Box, Button, Paper, Typography} from "@mui/material"

import {ArrowRight} from '@material-ui/icons'

import {useNavigate} from 'react-router-dom'

const NotFound = () => {

  const navigate = useNavigate()

  return (
    
    <Box height={"100vh"} width={"100vw"} className="d-flex align-items-center justify-content-center">

      <Paper elevation={0} sx={{p:5}}>

        <Typography variant="h4" fontWeight={900}>

        sorry this page is not working!

        </Typography>

        <Typography textAlign={"center"} sx={{mt:3}}>
          please proceed to a working page
        </Typography>

        <Button onClick={()=>navigate("/")} className="w-100 mt-5" endIcon={<ArrowRight/>}>

          <Typography textTransform={"lowercase"}>Confirm</Typography>

        </Button>

      </Paper>

    </Box>

  )
}

export default NotFound