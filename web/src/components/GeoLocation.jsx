import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CircularProgress, Box } from "@mui/material";
const GeoLocation = ({address}) => {

    // location cordinates 
    const [coordinates, setCoordinates] = useState(null);

    // loading status 
    const [loading, setLoading] = useState(true)

    // func for getting and setting cordinates for a specified region 
    const getCordinates = async (address) => {
        setLoading(true)
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    address
                )}&accept-language=en`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch location data');
            }

            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
            } else {
                console.log('Location not found');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false)
    }


    // call get cordinates on component mount 
    useEffect(()=>{

        getCordinates(address)

    },[])



    return (

        
            loading
            ?
            <>
            <Box sx={{p:10}} className="d-flex align-items-center justify-content-center">
            <CircularProgress/>
            </Box>
            </>
            :
            <div className="map shadow-sm rounded my-3">
         <MapContainer center={coordinates} zoom={16} style={{ height: '180px', width: '100%' ,borderRadius: 10}} >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates}>
          </Marker>
        </MapContainer>
       </div>
        



    )
}
export default GeoLocation