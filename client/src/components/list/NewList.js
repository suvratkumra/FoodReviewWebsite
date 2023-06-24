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
    const [formCount, setFormCount] = useState(1);
    const [formDataList, setFormDataList] = useState([
        {
            dishName: "",
            description: "",
            userOptionList:
            {
                spice_level: null,
                dish_cuisine_type: null,
                dish_category: null,
                portion_size: null,
                price_range: null,
                taste_profile: null
            },
            dishImageInformation: []

        }]);

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

    const onImageUpload = (event, index) => {
        const files = Array.from(event.target.files);
        setDishImages((prevValues) => [...dishImages, ...files])
        formDataList[index].dishImageInformation = files;
        console.log("dish", dishImages)
    }

    const handleOnChangeFilters = (event, index) => {
        if (index === -1) {
            setTempFiltersApplied((prevValues) => ({
                ...prevValues,
                [event?.target?.id]: event?.target?.value
            }));
        }
        else {
            const currentFormDataList = formDataList[index];

            // console.log(currentFormDataList[formCount], formCount)
            // extract the userOptionList from the formDataList[index];
            const currentUserOptionList = currentFormDataList.userOptionList;

            const key = event?.target?.id;

            console.log(currentUserOptionList)
            console.log(key, event.target.value)
            // add the existing change in the list 
            currentUserOptionList[key] = event?.target?.value;

            // update this currentFormDataList
            currentFormDataList.userOptionList = currentUserOptionList;

            formDataList[index] = currentFormDataList;
        }

        console.log(formDataList);
        // console.log(event, index);
    }

    const filters = (i) => {
        return (
            <div style={{ border: "2px solid", padding: "20px", margin: "20px 5px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='spice_level_select'>Spice Level</label>
                    <select name='spice_level_select' id='spice_level' onChange={(event) => handleOnChangeFilters(event, i)}>
                        {userOptions?.SPICE_LEVEL.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='dish_cuisine_type_select'>Dish Cuisine Type</label>
                    <select name='dish_cuisine_type_select' id='dish_cuisine_type' onChange={(event) => handleOnChangeFilters(event, i)}>
                        {userOptions?.DISH_CUISINE_TYPE.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='dish_category_select'>Dish Category</label>
                    <select name='dish_category_select' id='dish_category' onChange={(event) => handleOnChangeFilters(event, i)}>
                        {userOptions?.DISH_CATEGORY.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='portion_size_select'>Portion Size</label>
                    <select name='portion_size_select' id='portion_size' onChange={(event) => handleOnChangeFilters(event, i)}>
                        {userOptions?.PORTION_SIZE.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='price_range_select'>Price Range</label>
                    <select name='price_range_select' id='price_range' onChange={(event) => handleOnChangeFilters(event, i)}>
                        {userOptions?.PRICE_RANGE.map((value) => {
                            return <option>{value}</option>;
                        })}
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "10%" }}>
                    <label htmlFor='taste_profile_select'>Taste Profile</label>
                    <select name='taste_profile_select' id='taste_profile' onChange={(event) => handleOnChangeFilters(event, i)}>
                        {userOptions?.TASTE_PROFILE.map((value) => {
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

    const handleOnSubmitForm = (event, formIndex) => {
        event.preventDefault();
        console.log("form submitted: ", formIndex)
    }

    const handleChangingFormDataInput = (event, index) => {
        const key = event?.target?.id;
        const value = event?.target?.value;

        // update the index's values.
        formDataList[index][key] = value;
    }

    const handleAddingDishForm = () => {
        const forms = [];


        for (let i = 0; i < formCount; i++) {

            forms.push(
                <div style={{ border: "2px red dotted", margin: "1%", padding: "1%" }}>
                    <form onSubmit={(event) => handleOnSubmitForm(event, i)} >
                        <div id='main_container'>
                            <div id="queue_card_container" style={{ width: "100%" }}>
                                <div style={{ display: 'flex' }}>
                                    <div id="dish_image" >
                                        {formDataList[i]?.dishImageInformation?.map((file) => (
                                            <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} style={{ width: "100px", height: "100px", padding: "2%" }} />
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: "column" }}>
                                        <label htmlFor='dishname'>Dish Name: </label>
                                        <input id='dishName' placeholder='Grilled Cheese' onChange={(event) => handleChangingFormDataInput(event, i)} />
                                        <label htmlFor='notes'>Notes: </label>
                                        <textarea style={{ width: "300px", height: "150px", }} placeholder='Notes' id='description' onChange={(event) => handleChangingFormDataInput(event, i)} ></textarea>
                                        <label htmlFor='tags'>Tags: </label>
                                    </div>
                                </div>
                                {filters(i)}
                                {/* {console.log(formDataList)} */}
                                <input type='file' id="fileUpload" name="fileUpload" multiple onChange={(event) => onImageUpload(event, i)} accept=".png, .jpg, .jpeg" />
                                <button type='submit'>Submit Review</button>
                            </div>
                        </div>

                    </form>
                </div>)

        }
        // console.log("form", forms);
        return forms;
    }

    return (
        <div>
            This is the new list for restaurant: <span style={{ color: "red" }}> {queryParams.restaurantName} </span>
            <h2>Filter</h2>
            {filters(-1)}
            <hr />
            <button onClick={() => {
                setFormCount(formCount + 1);
                setFormDataList((prevValue) => [
                    ...prevValue, {

                        dishName: "",
                        description: "",
                        userOptionList:
                        {
                            spice_level: null,
                            dish_cuisine_type: null,
                            dish_category: null,
                            portion_size: null,
                            price_range: null,
                            taste_profile: null
                        },
                        dishImageInformation: []
                    }])
            }}> Add more dishes </button>
            <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap' }}>
                {handleAddingDishForm()}

            </div>

        </div >

    )
}

export default NewList