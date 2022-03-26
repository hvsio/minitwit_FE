import { apiRequest } from "@/api/api.js";

const fetchTwits = (page, pageSize = 10) => {
    const numberOfTwits = page * 20;
    return apiRequest("GET", `api/twit/public-twits?page=${page}&pageSize=${pageSize}&no=${numberOfTwits}`)
};

const fetchPersonalTwits = (userId) => {
    return apiRequest("GET", `api/twit/personal-twits/${userId}`)
}

const flagTwit = (flaggingInput) => {
    return apiRequest("PUT", "api/twit/mark-message", flaggingInput)
}

const createTwit = (twitData) => {
    return apiRequest("POST", "api/twit/add", twitData)
}

export default {
    fetchTwits,
    flagTwit,
    createTwit,
    fetchPersonalTwits
}
