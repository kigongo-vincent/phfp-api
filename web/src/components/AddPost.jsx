import { Alert, Box, Button, CircularProgress, Dialog, DialogContent, IconButton, InputLabel, TextField, Typography } from "@mui/material"
import ModalHeader from './ModalHeader'
import { Close, Image, Save } from "@material-ui/icons"

import { POST_FORMDATA } from '../utilities/POST'

// hidden input import 
import HiddenInput from './HiddenInput'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAlertMessage, getOrganization, getUser, refreshApp, refreshStatus, sendAlertMessage } from "../model/data"

const AddPost = ({ open, setter }) => {

    // file selected 
    const [file, setFile] = useState(null)

    // caption 
    const [caption, setCaption] = useState("")

    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(false)

    const user = useSelector(getUser)

    const organization = useSelector(getOrganization)


    const add_post = async (e) => {

        e.preventDefault()

        setter(true)

        const formData = new FormData()

        formData.append("caption", caption)

        formData.append("organization", organization?.id)

        file && formData.append("image", file)

        formData.append("author", user?.user_id)

        const response = await fetch(`http://localhost:8000/createPost/`, {
            method: "POST",
            body: formData
        })

        if (response.status == 201) {
            dispatch(sendAlertMessage({
                severity: "success",
                body: "Post has been added successfully"
            }))
            dispatch(refreshApp())
            setter(false)
            setCaption("")
        }
        else {
            setter(false)
            setError("failed to add post")
        }


    }

    const dispatch = useDispatch()

    useEffect(() => {

        if (error) {
            dispatch(sendAlertMessage({
                severity: "error",
                body: "Failed to upload post"
            }))

            setTimeout(() => {

                dispatch(clearAlertMessage())
                setError(false)

            }, 3000);
        }

    }, [error])




    return (
        <Dialog open={open}>

            <form className="w-100" onSubmit={add_post}>

                <DialogContent>

                    {/* header  */}
                    <ModalHeader title={"Add post"} setter={setter} />

                    {/* reminder  */}
                    <Alert className="w-100" severity="warning">
                        <Typography>
                            Posts made are visibile to all users on the platform, cannot be editted or deleted for audit purposes
                        </Typography>
                    </Alert>

                    {/* caption input  */}

                    <TextField label="caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-100 my-4" />

                    {/* end caption input  */}


                    {/* selected image  */}
                    {
                        file
                        &&
                        <Alert
                            sx={{ mb: 1 }}
                            action={<IconButton onClick={() => setFile(null)}><Close /></IconButton>}
                        >
                            <Typography>You have selected {file.name}</Typography>
                        </Alert>
                    }
                    {/* end selected image  */}


                    {/* image selection and save  */}
                    <Box className="d-flex align-items-center justify-content-between">


                        {/* image selection  */}
                        <Button disabled={file} variant="contained" startIcon={<Image />}>
                            <InputLabel>
                                <Typography className="text-light" textTransform={"lowercase"}>Select image (optional)</Typography>
                                <HiddenInput accept={".jpg, .jpeg, .png"} setter={(e) => setFile(e.currentTarget.files[0])} />
                            </InputLabel>
                        </Button>

                        {/* save button  */}
                        <Button
                            role="submit"
                            onClick={add_post}
                            disabled={!caption || loading} startIcon={<Save />} variant="contained" color="secondary">
                            {
                                loading
                                    ?
                                    <CircularProgress size={20} />
                                    :
                                    <Typography textTransform={"lowercase"}>Save</Typography>
                            }
                        </Button>

                    </Box>

                </DialogContent>

            </form>

        </Dialog>
    )
}

export default AddPost