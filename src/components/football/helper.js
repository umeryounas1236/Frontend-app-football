import axios from "axios"
import { requestPanel } from "../../services/axios";

const panelUrl = 'http://localhost:5014';
const scraperurl = 'http://localhost:5000'

export const GetCountriesFromPanel = async () => {
    const resp = await requestPanel({
        url : `/api/countries`,
        method : "get"
    });

    return resp?.data?.content;
}

export const GetSeasonsFromPanel = async () => {
    const resp = await requestPanel({
        url : `/api/seasons`,
        method : "get"
    });
    return resp?.data?.content;
}

export const GetTournamentsFromPanel = async () => {
    const resp = await requestPanel({
        url : `/api/football/tournaments`,
        method : "get"
    });

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



export const GetDetailsFromFlash = async (tournament) => {
    debugger;
    const resp = await axios.post(`${scraperurl}/football/flashscore/contest-details`,tournament);
    return resp?.data;
}