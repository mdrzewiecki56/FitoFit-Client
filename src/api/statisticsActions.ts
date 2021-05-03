import axios from "axios";
import moment from "moment";

const getWalksWeeklySummary = async (date = moment(), page = 0, per_page = 10) => {
    const {data} = await axios.request({
        url: "/statistics/walks_weekly_summary", 
        params:{
            date: date.format('MM/DD/YYYY'),
            per_page,
            page
        }, 
        method: "GET"
    });
    return data;
};

const getWalksMonthlySummary = async (date = moment(), page = 0, per_page = 10) => {
    const {data} = await axios.request({
        url: "/statistics/walks_monthly_summary", 
        params:{
            date: date.format('MM/DD/YYYY'),
            per_page,
            page
        }, 
        method: "GET"
    });
    return data;
};

export default {getWalksWeeklySummary, getWalksMonthlySummary};