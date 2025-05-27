import axios from "../api/axios";

const apiUrl="/api"

export const updateAcceptation = async (id, accept, token) => {
    try {
        console.log(token)
        const response = await axios.put(
            `${apiUrl}/updatevacationstatus/${id}`,
            accept,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error("Błąd przy updateAcceptation:", error.response?.data || error.message);
        throw error;
    }
}
export const submitVacationRequest = async (request, token) => {
    try {
        const response = await axios.post(`${apiUrl}/savevacation`, request,
            {
                headers: {
                    headers: { 'Content-Type': 'application/json' },
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAllVacations = async (token) => {
    const response = await axios.get(`${apiUrl}/allvacations`,
        {
            headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
        }
    );
    return response.data;
}
export const getUserVacationById = async (id, token) => {
    try {
        const response = await axios.get(`${apiUrl}/getvacation/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
        }
        )
        return response.data
    } catch (error) {
        throw error;
    }
}