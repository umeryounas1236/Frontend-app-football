import axios from "axios"

const scrapperOptions = axios.create({
    baseURL : "http://localhost:5000"
});

const panelOptions = axios.create({
    baseURL : "http://localhost:5014"
});

export const requestPanel = async (options) => {
    const onSuccess = resp => {
        return resp?.data;
    }

    const onError = err => {
        console.log(err);
        throw err;
    }

    try {
        const response = await panelOptions({
            ...options,
            baseURL: panelOptions.defaults.baseURL
        });

        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
}

export const requestScrapper = async (options) => {
    const onSuccess = resp => {
        return resp?.data;
    }

    const onError = err => {
        console.log(err);
        throw err;
    }

    try {
        const response = await panelOptions({
            ...options,
            baseURL: scrapperOptions.defaults.baseURL
        });

        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
}