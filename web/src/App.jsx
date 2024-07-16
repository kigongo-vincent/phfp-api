import { Dialog, DialogContent, ThemeProvider, IconButton, Typography, createTheme, Alert } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import { Close } from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux"
import { clearAlertMessage, getAlertMessage } from "./model/data"
import Signup from "./pages/auth/Signup"
import Setup from "./pages/auth/Setup"
import Dashboard from "./pages/CommunicationsOfficer/Dashboard"
import PostHarvestTechniqueAdd from "./pages/CommunicationsOfficer/PostHarvestTecniqueAdd"
import EquipmentAdd from "./pages/CommunicationsOfficer/EquipmentAdd"
import PestAdd from "./pages/CommunicationsOfficer/PestAdd"
import PestControlMeasureAdd from "./pages/CommunicationsOfficer/PestControlMeasureAdd"
import MessagesView from "./pages/CommunicationsOfficer/MessagesView"
import CropSelectionView from "./pages/CommunicationsOfficer/CropSelectionView"
import InformationView from "./pages/CommunicationsOfficer/InformationView"
import InformationDetails from "./pages/CommunicationsOfficer/InformationDetails"
import PostsView from "./pages/CommunicationsOfficer/PostsView"
import NotFound from "./pages/auth/NotFound"
import Reset from "./pages/auth/Reset"
const App = () => {

    const message = useSelector(getAlertMessage)

    const dispatch = useDispatch()

    const theme = createTheme({
        palette: {
            primary: {
                main: "#824EEF",
                contrastText: "aliceblue"
            },
            secondary: {
                main: "#FF007C",
                contrastText: "aliceblue"
            },


        },
        typography: {
            fontFamily: "Inter",
        }
    })

    return (
        <ThemeProvider theme={theme}>

            <Routes>

                {/* dashboard  */}
                <Route path="/" Component={Dashboard} />
                {/* end dashboard  */}

                {/* login route  */}
                <Route path="/login" Component={Login} />
                {/* end login route  */}

                {/* signup page  */}
                <Route path="/signup" Component={Signup} />
                {/*  end signup page  */}

                {/* setup screen  */}
                <Route path="/setup" Component={Setup} />
                {/* end setup screen  */}

                {/* add  post harvest technique  */}
                <Route path="/add-post-harvest-technique/:id" Component={PostHarvestTechniqueAdd} />
                {/* end add  post harvest technique  */}

                {/* equipment add route  */}
                <Route path="/add-equipment/:id" Component={EquipmentAdd} />
                {/* end equipment add route  */}

                {/* pest add route  */}
                <Route path="/add-pest/:id" Component={PestAdd} />
                {/* end pest add route  */}

                {/* pest control measure add route  */}
                <Route path="/add-pest-control-measure/:id" Component={PestControlMeasureAdd} />
                {/* end pest control measure add route  */}

                {/* view messages  */}
                <Route path="/messages" Component={MessagesView} />
                {/* view messages  */}

                {/* crop selection view route  */}
                <Route path="/crop-selection-view" Component={CropSelectionView} />
                {/* end crop selection view route  */}

                {/* information view  */}
                <Route path="/information/:id" Component={InformationView} />
                {/* end information view  */}

                {/* information details route  */}
                <Route path="/information-details/:id" Component={InformationDetails} />
                {/* end information details route  */}

                {/* posts  */}
                <Route path="/posts" Component={PostsView} />
                {/* end posts  */}

                <Route path="*" Component={NotFound} />

                <Route path="/reset_password/:id" Component={Reset} />


            </Routes>

            {/* alert message  */}
            <Dialog open={message?.body}>
                {
                    message?.body
                    && <DialogContent>
                        <Alert

                            severity={message?.severity}

                            action={

                                <IconButton
                                    onClick={() => dispatch(clearAlertMessage())}>
                                    <Close />
                                </IconButton>}>

                            <Typography >{message?.body}</Typography>

                        </Alert>
                    </DialogContent>
                }
            </Dialog>
            {/* alert message  */}

        </ThemeProvider>
    )

}
export default App