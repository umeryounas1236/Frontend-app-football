import axios from "axios"
import { requestPanel, requestScrapper } from "../../services/axios";
import { has, isEmpty } from "lodash";

const panelUrl = 'http://localhost:5014';
const scraperurl = 'http://localhost:5000'

export const GetCountriesFromPanel = async () => {
    const resp = await requestPanel({
        url : `/api/countries`,
        method : "get"
    });

    return resp?.content;
}

export const GetSeasonsFromPanel = async () => {
    const resp = await requestPanel({
        url : `/api/seasons`,
        method : "get"
    });
    return resp?.content;
}

export const GetTournamentsFromPanel = async () => {
    const resp = await requestPanel({
        url : `/api/football/tournaments`,
        method : "get"
    });

    return resp?.content;
}

export const createContestGroupinPanel = async (data) => {
    const resp = await axios.post(`${panelUrl}/api/football/contest-groups`,data);
    return resp?.data;
}

export const createCompetitors = async (data) => {
    const resp = await axios.post(`${panelUrl}/api/football/competitors/collection`,data);
    return resp?.content;
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
    const resp = await axios.put(`${panelUrl}/api/football/tournaments`,data);
    return resp.data;
}



export const GetDetailsFromFlash = async (tournament) => {
    debugger;
    const resp = await requestScrapper({
        url : `/football/flashscore/contest-details`,
        method : "post",
        data : tournament
    });

    debugger;
    const competitorMappings = resp?.participants?.map(c => c?.mapping?.flashScore)?.join(',');
    const provider = 'flashScore';

    const competitors = await requestPanel({
        url : `/api/football/competitors/by-provider?provider=${provider}&values=${competitorMappings}`,
        method : "get"
    });

    for (const c of competitors?.content) {
        const temp = resp?.participants?.find(p => has(p?.mapping,'flashScore') && p?.mapping['flashScore'] === c?.mapping?.flashScore);
        if(!isEmpty(temp)){
            temp.isCreated = true;
        }
    }

    return resp;
}