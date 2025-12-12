const BASE_URL = "https://horoscope-app-api.vercel.app/api/v1";

export async function getDailyHoroscope(sign, day = "TODAY") {
    try {
        const response = await fetch(
            `${BASE_URL}/get-horoscope/daily?sign=${sign}&day=${day}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch daily horoscope: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching daily horoscope:", error);
        throw error;
    }
}

export async function getWeeklyHoroscope(sign) {
    try {
        const response = await fetch(
            `${BASE_URL}/get-horoscope/weekly?sign=${sign}`,
            { next: { revalidate: 86400 } } // Cache for 24 hours
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch weekly horoscope: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weekly horoscope:", error);
        throw error;
    }
}

export async function getMonthlyHoroscope(sign) {
    try {
        const response = await fetch(
            `${BASE_URL}/get-horoscope/monthly?sign=${sign}`,
            { next: { revalidate: 86400 } } // Cache for 24 hours
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch monthly horoscope: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching monthly horoscope:", error);
        throw error;
    }
}
