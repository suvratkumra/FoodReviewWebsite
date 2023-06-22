import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, use, useLocation } from 'react-router-dom'

const NewList = () => {
    const location = useLocation();
    const queryDetails = new URLSearchParams(location.search);

    const [dishImages, setDishImages] = useState([])
    const [userOptions, setUserOptions] = useState();
    const [filtersApplied, setFiltersApplied] = useState();
    const [tempFiltersApplied, setTempFiltersApplied] = useState();

    const queryParams = {
        restaurantName: queryDetails.get('restaurant'),
        restaurantIndex: queryDetails.get('index')
    }

    useEffect(() => {
        axios.get("http://localhost:3000/v1/list/user-options")
            .then((response) => {
                setUserOptions(response?.data?.response[0]);
                // console.log(userOptions);
            })
            .catch((err) => {
                // TODO: error handling. 

            });
    }, []);

    const onImageUpload = (event) => {
        const files = Array.from(event.target.files);
        console.log(files)
        setDishImages((prevValues) => [...dishImages, ...files])
        console.log("dish", dishImages)
    }

    const handleOnChangeFilters = (event) => {
        setTempFiltersApplied((prevValues) => ({
            ...prevValues,
            [event.target.id]: event.target.value
        }));
    }

    const filters = () => {
        return (
            <div style={{ border: "2px solid", padding: "20px", margin: "20px 5px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='spice_level_select'>Spice Level</label>
                    <select name='spice_level_select' id='spice_level' onChange={handleOnChangeFilters}>
                        {userOptions?.SPICE_LEVEL.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='dish_cuisine_type_select'>Dish Cuisine Type</label>
                    <select name='dish_cuisine_type_select' id='dish_cuisine_type' onChange={handleOnChangeFilters}>
                        {userOptions?.DISH_CUISINE_TYPE.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='dish_category_select'>Dish Category</label>
                    <select name='dish_category_select' id='dish_category' onChange={handleOnChangeFilters}>
                        {userOptions?.DISH_CATEGORY.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='portion_size_select'>Portion Size</label>
                    <select name='portion_size_select' id='portion_size' onChange={handleOnChangeFilters}>
                        {userOptions?.PORTION_SIZE.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='price_range_select'>Price Range</label>
                    <select name='price_range_select' id='price_range' onChange={handleOnChangeFilters}>
                        {userOptions?.PRICE_RANGE.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='taste_profile_select'>Taste Profile</label>
                    <select name='taste_profile_select' id='taste_profile' onChange={handleOnChangeFilters}>
                        {userOptions?.TASTE_PROFILE.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='price_range_select'>Price Range</label>
                    <select name='price_range_select' id='price_range' onChange={handleOnChangeFilters}>
                        {userOptions?.PRICE_RANGE.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <button onClick={() => setFiltersApplied(tempFiltersApplied)}>
                    Apply filters
                </button>
            </div>
        )
    }

    return (
        <div>
            This is the new list for restaurant: <span style={{ color: "red" }}> {queryParams.restaurantName} </span>
            <h2>Filter</h2>
            {filters()}
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
                        </div>

                    </div>
                    <input type='file' id="fileUpload" name="fileUpload" multiple onChange={onImageUpload} accept=".png, .jpg, .jpeg" />
                </div>
            </div>
        </div >

    )
}

export default NewList