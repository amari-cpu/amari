import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
    const [communicationOptions, setCommunicationOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const res = await axios.get('http://localhost:9000/api/communicationPlatforms');
                setCommunicationOptions(res.data);
            } catch (error) {
                console.error('Error fetching platforms:', error);
            }
        };

        fetchPlatforms();
    }, []);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async () => {
        const [platform, category] = selectedOption.split('|');
        const payload = {
            communicationPlatform: platform,
            communicationCategory: category || null,
        };

        try {
            const res = await axios.post('http://localhost:9000/api/test/create', payload);
            console.log('Response:', res.data);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <select 
                value={selectedOption} 
                onChange={handleOptionChange} 
                className='border border-[#D7D7D7] w-full md:w-[400px] py-2 px-3 rounded-lg hover:border-[#F08E1F] border-r-4'
            >
                <option value="">Select communication option</option>
                {communicationOptions.map(platform => (
                    <optgroup key={platform.id} label={platform.communicationPlatform}>
                        {platform.communicationCategory 
                            ? platform.communicationCategory.map(category => (
                                <option key={`${platform.id}-${category}`} value={`${platform.communicationPlatform}|${category}`}>
                                    {category}
                                </option>
                              ))
                            : <option value={`${platform.communicationPlatform}|null`}>
                                No category
                              </option>
                        }
                    </optgroup>
                ))}
            </select>

            <button onClick={handleSubmit} className='mt-4 py-2 px-4 bg-[#F08E1F] text-white rounded-lg'>
                Submit
            </button>
        </div>
    );
};

export default Test;