import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    let changeableUrl = url; 
    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        // const response = await axios.get(url);
        // return response;

        // destructure the data from the response
        // The following code means: pick the "data" property from `axios.get(url)`
        // and them store it in a new const "data"
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);
        const modifiedData = { confirmed, recovered, deaths, lastUpdate }
        // console.log(modifiedData);

        /*
        const { data } = await axios.get(url);
        
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate,
        }
        */

        return modifiedData;   
        
    } catch (error) {
        console.log(error);  
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        // console.log(data);
        // use map function to map each row of data, defined as dailyData parameter
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
        
    } catch (error) {
        
    }
}


export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);


    } catch (error) {
        console.log(error);
        
    }
}