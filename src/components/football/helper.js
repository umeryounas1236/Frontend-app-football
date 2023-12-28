import axios from "axios"

const panelUrl = 'http://localhost:5014';
const scraperurl = 'http://localhost:5000'

export const GetCountriesFromPanel = async () => {
    const resp = await axios.get(`${panelUrl}/api/countries`);
    return resp?.data?.content;
}

export const GetSeasonsFromPanel = async () => {
    const resp = await axios.get(`${panelUrl}/api/seasons`);
    return resp?.data?.content;
}

export const createContestGroupinPanel = async (data) => {
    const resp = await axios.post(`${panelUrl}/api/football/contest-groups`,data);
    return resp?.data?.data;
}

export const createCompetitors = async (data) => {
    const resp = await axios.post(`${panelUrl}/api/football/competitors/collection`,data);
    return resp?.data?.content;
}

export const createRounds = async (data) => {
    const resp = await axios.post(`${panelUrl}/api/football/contest-rounds/collection`,data);
    return resp?.data?.content;
}

export const postcontestparticipants = async (data) => {
    const resp = await axios.post(`${panelUrl}/api/football/contest-participants/collection`,data);
    return resp?.data?.content;
}


export const UpdateTournament = async (data) => {
    debugger;
    const resp = await axios.put(`${panelUrl}/api/football/tournaments`,data);
    return resp.data?.data;
}

export const GetTournamentsFromPanel = async () => {
    debugger;
    const resp = await axios.get(`${panelUrl}/api/football/tournaments`);
    return resp?.data;
}

export const GetDetailsFromFlash = async (tournament) => {
    debugger;
    const resp = await axios.post(`${scraperurl}/football/flashscore/contest-details`,tournament);
    return resp?.data;
}