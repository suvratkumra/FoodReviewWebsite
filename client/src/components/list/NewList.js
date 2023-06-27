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
    const [editDishes, setEditDishes] = useState([null]);
    const [existingDishes, setExistingDishes] = useState();
    const [formDataList, setFormDataList] = useState([
        {
            dishName: "",
            description: "",
            userOptionList:
            {
                spice_level: "none",
                dish_cuisine_type: "none",
                dish_category: "none",
                portion_size: "none",
                price_range: "none",
                taste_profile: "none"
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
                // TODO: Make error handler. 
                alert("Server Error.")
            });

        axios.get("http://localhost:3000/v1/list/my-lists", {
            headers: {
                Authorization: localStorage.getItem('token'),
            }
        }).then((response) => {
            // existing dishes.
            response.data.response[0].filter((restaurant) => {
                if (restaurant.restaurantName === queryParams.restaurantName) {
                    setExistingDishes(restaurant.dishes);
                }
            })
        }).catch((error) => {
            // TODO: handle error
            console.log(error);
        })
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
            <div className="border-2 border-gray-300 p-4 mb-4 flex flex-col flex-wrap">
                <div className='md:grid md:grid-cols-3 lg:flex lg:flex-row justify-between m-4'>
                    <div className="flex flex-col lg:w-1/4 mx-2">

                        <label htmlFor="spice_level_select">Spice Level</label>
                        <select
                            name="spice_level_select"
                            id="spice_level"
                            onChange={(event) => handleOnChangeFilters(event, i)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            {userOptions?.SPICE_LEVEL.map((value) => {
                                return <option key={value}>{value}</option>;
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col lg:w-1/4 mx-2">
                        <label htmlFor="dish_cuisine_type_select">Dish Cuisine Type</label>
                        <select
                            name="dish_cuisine_type_select"
                            id="dish_cuisine_type"
                            onChange={(event) => handleOnChangeFilters(event, i)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            {userOptions?.DISH_CUISINE_TYPE.map((value) => {
                                return <option key={value}>{value}</option>;
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col lg:w-1/4 mx-2">
                        <label htmlFor="dish_category_select">Dish Category</label>
                        <select
                            name="dish_category_select"
                            id="dish_category"
                            onChange={(event) => handleOnChangeFilters(event, i)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            {userOptions?.DISH_CATEGORY.map((value) => {
                                return <option key={value}>{value}</option>;
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col lg:w-1/4 mx-2">
                        <label htmlFor="portion_size_select">Portion Size</label>
                        <select
                            name="portion_size_select"
                            id="portion_size"
                            onChange={(event) => handleOnChangeFilters(event, i)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            {userOptions?.PORTION_SIZE.map((value) => {
                                return <option key={value}>{value}</option>;
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col lg:w-1/4 mx-2">
                        <label htmlFor="price_range_select">Price Range</label>
                        <select
                            name="price_range_select"
                            id="price_range"
                            onChange={(event) => handleOnChangeFilters(event, i)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            {userOptions?.PRICE_RANGE.map((value) => {
                                return <option key={value}>{value}</option>;
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col lg:w-1/4 mx-2">
                        <label htmlFor="taste_profile_select">Taste Profile</label>
                        <select
                            name="taste_profile_select"
                            id="taste_profile"
                            onChange={(event) => handleOnChangeFilters(event, i)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            {userOptions?.TASTE_PROFILE.map((value) => {
                                return <option key={value}>{value}</option>;
                            })}
                        </select>
                    </div>
                </div>

                {i === -1 && (
                    <button
                        onClick={() => setFiltersApplied(tempFiltersApplied)}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    >
                        Apply filters
                    </button>
                )}
            </div>
        );
    }



    const handleOnSubmitForm = (event, formIndex) => {
        event.preventDefault();
        console.log("form submitted: ", formDataList, localStorage.getItem('token'));

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('token'),
            }
        }

        const formData = new FormData();
        formData.append('restaurantName', queryParams.restaurantName);
        formData.append('dish[dishName]', formDataList[formIndex].dishName);
        formData.append('dish[description]', formDataList[formIndex].description);
        formData.append('dish[userOptionList][spice_level]', (formDataList[formIndex].userOptionList.spice_level));
        formData.append('dish[userOptionList][dish_cuisine_type]', (formDataList[formIndex].userOptionList.dish_cuisine_type));
        formData.append('dish[userOptionList][dish_category]', (formDataList[formIndex].userOptionList.dish_category));
        formData.append('dish[userOptionList][portion_size]', (formDataList[formIndex].userOptionList.portion_size));
        formData.append('dish[userOptionList][price_range]', (formDataList[formIndex].userOptionList.price_range));
        formData.append('dish[userOptionList][taste_profile]', (formDataList[formIndex].userOptionList.taste_profile));

        formDataList[formIndex]?.dishImageInformation.forEach((file, index) => {
            formData.append('file', file);
        });

        axios.post("http://localhost:3000/v1/list/create", formData, config)
            .then((response) => {
                console.log("response", response);
            })
            .catch((error) => {
                console.log("error", error);
            });
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
                <div className="border border-green-500 rounded-lg m-2 p-4">
                    <form onSubmit={(event) => handleOnSubmitForm(event, i)}>
                        <div id="main_container">
                            <div id="queue_card_container" className="w-full">
                                <div className="">
                                    <div id="dish_image" className="border-b-2 overflow-y-auto max-h-80 grid grid-cols-2">
                                        {formDataList[i]?.dishImageInformation?.map((file) => (
                                            <img
                                                key={file.name}
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                className="p-2"
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-col p-2 m-2">
                                        <div className='flex flex-col justify-around '>
                                            <label htmlFor="dishname" >Dish Name:</label>
                                            <input
                                                id="dishName"
                                                placeholder="Grilled Cheese"
                                                onChange={(event) => handleChangingFormDataInput(event, i)}
                                                className="border border-gray-300 rounded p-2 m-2"
                                            />
                                        </div>
                                        <label htmlFor="notes">Notes:</label>
                                        <textarea
                                            style={{ width: "300px", height: "150px" }}
                                            placeholder="Notes"
                                            id="description"
                                            onChange={(event) => handleChangingFormDataInput(event, i)}
                                            className="border border-gray-300 rounded p-2 m-2"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <label htmlFor="tags" className=''>Tags:</label>
                                </div>
                                <div className='md:text-sm'>

                                    {filters(i)}
                                </div>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    name="fileUpload"
                                    multiple
                                    onChange={(event) => onImageUpload(event, i)}
                                    accept=".png, .jpg, .jpeg"
                                    className="mb-2"
                                />
                                <div className='m-2'>
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
                                    >
                                        Submit Review
                                    </button>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
        return forms;
    };


    const handleEditingExistingDishes = (dish) => {
        console.log(dish);
    }

    const handleDisplayingExistingDishTags = (dish) => {
        const userOptionListArray = Object.entries(dish.userOptions);

        return (
            <div>
                {
                    userOptionListArray[0][0] === 'spice_level' &&
                    <div>
                        <span>Spice Level: </span>
                        <span>{userOptionListArray[0][1]}</span>
                    </div>
                }
                {
                    userOptionListArray[1][0] === 'dish_cuisine_type' &&
                    <div>
                        <span>Dish Cuisine Type: </span>
                        <span>{userOptionListArray[1][1]}</span>
                    </div>
                }
                {
                    userOptionListArray[2][0] === 'dish_category' &&
                    <div>
                        <span>Dish Category: </span>
                        <span>{userOptionListArray[2][1]}</span>
                    </div>
                }
                {
                    userOptionListArray[3][0] === 'portion_size' &&
                    <div>
                        <span>Portion Size: </span>
                        <span>{userOptionListArray[3][1]}</span>
                    </div>
                }
                {
                    userOptionListArray[4][0] === 'price_range' &&
                    <div>
                        <span>Price Range: </span>
                        <span>{userOptionListArray[4][1]}</span>
                    </div>
                }
                {
                    userOptionListArray[5][0] === 'taste_profile' &&
                    <div>
                        <span>Taste Profile: </span>
                        <span>{userOptionListArray[5][1]}</span>
                    </div>
                }
            </div>
        )
    }

    return (
        <div className="container mx-auto text-gray-800">
            <div className="p-4 font-bold m-5 text-3xl text-gray-800">
                <span>{queryParams.restaurantName}</span>
            </div>
            <div className="m-2 p-2 text-2xl font-bold text-gray-800">
                Filter to find existing dishes
            </div>
            {filters(-1)}
            <hr className="my-4" />
            {/* existing dishes */}
            {existingDishes?.map((dish) => (
                <div className="dish-card" key={dish._id}>
                    <div>Dish Name: {dish.dishName}</div>
                    <div>Description: {dish.description}</div>
                    <div className="flex flex-row">
                        {dish.photo.length !== 0 && <span>Dish Images:</span>}
                        <div className="overflow-y-auto flex flex-row">
                            {dish.photo.map((photo) => (
                                <img
                                    src={photo}
                                    alt="dishPhoto"
                                    className="w-32 h-32 object-cover rounded mr-2"
                                    key={photo}
                                />
                            ))}
                        </div>
                    </div>
                    <div>Tags: {handleDisplayingExistingDishTags(dish)}</div>
                </div>
            ))}
            <div className="py-4">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4"
                    onClick={() => {
                        setFormCount(formCount + 1);
                        setFormDataList((prevValue) => [
                            ...prevValue,
                            {
                                dishName: '',
                                description: '',
                                userOptionList: {
                                    spice_level: 'none',
                                    dish_cuisine_type: 'none',
                                    dish_category: 'none',
                                    portion_size: 'none',
                                    price_range: 'none',
                                    taste_profile: 'none',
                                },
                                dishImageInformation: [],
                            },
                        ]);
                    }}
                >
                    Add more dishes
                </button>
            </div>
            <div className="flex flex-col my-4">{handleAddingDishForm()}</div>
        </div>
    );



}

export default NewList