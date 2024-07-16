import { Autocomplete, Box, Button, Skeleton, TextField, Typography } from "@mui/material"
import Layout from "../../components/Layout"
import { useEffect, useState } from "react"
import { FaFilter } from "react-icons/fa"
import PostPreview from "../../components/PostPreview"
import { useLocation, useParams } from "react-router-dom"
import { GET } from "../../utilities/GET"
import { useSelector } from "react-redux"
import { getUser } from "../../model/data"

const InformationView = () => {

    const { id } = useParams()

    // information categories 
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "pest control measure"
        },
        {
            id: 2,
            name: "post-harvest technique"
        }
    ])

    // content 
    const [information, setInformation] = useState([])

    const [category, setCategory] = useState("")

    const [filter, setFilter] = useState(false)

    const [backup, setBackup] = useState([])

    const [loading, setLoading] = useState(true)

    const user = useSelector(getUser)

    const location = useLocation()

    const name = location.state?.name

    useEffect(() => {
        GET(setLoading, `/get_article_by_crop/${id}/${user?.user_id}`, setInformation, null)
    }, [])

    useEffect(() => {

        if (!category) {
            setFilter(false)
        } else {
            setFilter(true)
        }

    }, [category])





    return (
        <Layout>


            {/* filter section  */}
            <Box className="bg-white mt-3 rounded-much text-light px-5 py-1 d-flex align-items-center justify-content-between" >



                {/* input  */}
                <Autocomplete

                    className="text-light my-4 w-50" sx={{ outline: "none" }}
                    options={categories.map(category => category.name)}
                    onChange={(_, category) => setCategory(category)}
                    renderInput={(params) =>

                        <TextField
                            variant="standard"
                            className=" rounded-much" sx={{ outline: "none" }}

                            {...params}
                            label="Filter information by category"
                        />
                    }
                />

                {/* filter button  */}
                <Button className="linear-gradient" style={{ boxShadow: "none" }} onClick={() => setFilter(true)} variant="contained" startIcon={<FaFilter size={14} />}>
                    <Typography textTransform={"lowercase"}>filter is {filter ? "on" : "off"}</Typography>
                </Button>

            </Box>

            <br />

            <div className="px-2 mb-2 d-flex align-items-center justify-content-between">

                <Typography letterSpacing={1} textTransform={"uppercase"} className="text-secondary" variant="caption">Information about {name}</Typography>

                {/* information length  */}


                <Typography variant="caption" className="bg-danger text-light d-flex align-items-center justify-content-center rounded-circle" height={20} width={20}>{information?.length}</Typography>



            </div>

            {

                loading ? 
                
                <Box sx={{p:2}}>
                <Box className="d-flex align-items-center">
                   <Skeleton height={40} width={40} variant="circular" />
                    <Skeleton height={40} sx={{ flex: 1, ml: 2 }} />
                  </Box>

                  <Skeleton height={"40vh"} />

                </Box>

                :
information.length == 0

    ?
    // if no articles found 
    <Typography sx={{ my: 3 }} >
        No articles found
    </Typography>

    :

    // information loop 
    <Box height={"55vh"} overflow={"scroll"}>

        {


            filter
                ?

                information.filter(info => info?.category == category).map(information =>
                    <PostPreview information={information} />
                ) :
                information.map(information =>
                    <PostPreview information={information} />
                )

        }

    </Box>

            }

        </Layout >
    )
}

export default InformationView