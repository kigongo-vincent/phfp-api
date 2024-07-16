const HiddenInput =({setter, accept, is_video})=>{
    return(
        
        is_video

        ?

        <input type="file" accept={accept && accept} onChange={(e)=>setter(e.currentTarget.files[0])} className="d-none"/>

        :

        <input type="file" accept={accept && accept} onChange={setter} className="d-none"/>
    )
}

export default HiddenInput