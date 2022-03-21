import { apiRequest } from "@/api/api.js";

const fetchTwits = (page, pageSize = 10) => {
    return apiRequest("GET", `api/twit/public-twits?page=${page}&pageSize=${pageSize}`)
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
