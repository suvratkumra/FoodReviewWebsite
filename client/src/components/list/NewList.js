import React, { useState } from 'react'
import { useParams, use, useLocation } from 'react-router-dom'

const NewList = () => {
    const location = useLocation();
    const queryDetails = new URLSearchParams(location.search);

    const [dishImages, setDishImages] = useState([])

    const queryParams = {
        restaurantName: queryDetails.get('restaurant'),
        restaurantIndex: queryDetails.get('index')
    }

    const onImageUpload = (event) => {
        const files = Array.from(event.target.files);
        console.log(files)
        setDishImages((prevValues) => [...dishImages, ...files])
        console.log("dish", dishImages)
    }

    const getAllSpiceLevels = () => {
        return (
            <select>
                <option value="nothing_selected">Nothing Selected</option>
                <option value="bland">Bland</option>
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="hot">Hot</option>
                <option value="spicy">Spicy</option>
                <option value="fiery">Fiery</option>
                <option value="zesty">Zesty</option>
                <option value="tangy">Tangy</option>
                <option value="peppery">Peppery</option>
                <option value="piquant">Piquant</option>
                <option value="flaming">Flaming</option>
                <option value="scorching">Scorching</option>
                <option value="inferno">Inferno</option>
                <option value="blaze">Blaze</option>
                <option value="nuclear">Nuclear</option>
                <option value="volcanic">Volcanic</option>
                <option value="scalding">Scalding</option>
                <option value="incendiary">Incendiary</option>
                <option value="mouth-numbing">Mouth-numbing</option>
                <option value="explosive">Explosive</option>
                <option value="insane">Insane</option>
            </select>
        )
    }

    return (
        <div>
            This is the new list for restaurant: <span style={{ color: "red" }}> {queryParams.restaurantName} </span>
            <div style={{ border: "2px solid", padding: "20px", margin: "20px 5px" }}>
                <span>SORT BY</span>
                <div>
                    Category:
                    {getAllSpiceLevels()}
                </div>
            </div>
            <hr />
            <div id='main_container'>
                <div id="queue_card_container" style={{ width: "50%" }}>
                    <div style={{ display: 'flex' }}>
                        <div id="dish_image" >
                            {dishImages.map((file) => (
                                <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} style={{ width: "100px", height: "100px", padding: "2%" }} />
                            ))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <label htmlFor='dishname'>Dish Name: </label>
                            <input id='dishname' placeholder='Grilled Cheese' />
                            <label htmlFor='notes'>Notes: </label>
                            <textarea style={{ width: "300px", height: "150px", }} placeholder='Notes'></textarea>
                            <label htmlFor='tags'>Tags: </label>
                            {getAllSpiceLevels()}
                        </div>

                    </div>
                    <input type='file' id="fileUpload" name="fileUpload" multiple onChange={onImageUpload} accept=".png, .jpg, .jpeg" />
                </div>
            </div>
        </div >

    )
}

export default NewList