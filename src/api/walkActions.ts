import axios from "axios";

const autocomplete = async (query: string, userLocation: number[]) => {
    const {data} = await axios.request({url: "walks/autocomplete", params:{query, user_location: userLocation}, method: "GET"});
    return data;
};

const calculateDistance = async (start_address:string, end_address:string) => {
    const {data} = await axios.request({url: "walks/calculate_distance", params:{start_address, end_address}, method: "GET"});
    return data;
};

const addWalk = async (start_address:string, end_address:string) => {
    const {data} = await axios.request({url: "walks/", data:{walk: {start_address,end_address}}, method: "POST"});
    return data;
};

export default {autocomplete, calculateDistance, addWalk};