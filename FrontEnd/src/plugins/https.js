
const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
    };

    if (token) {
        options.headers.Authorization = token;
    }

    try {
        const response = await fetch(url, options);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error("Unexpected response:", text);
            throw new Error("Server did not return JSON. Check backend logs.");
        }

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Request failed");
        }

        return data;
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
};

const http = {
    get: (url) => fetchWithToken(url, { method: "GET" }),

    post: (url, data) =>
        fetchWithToken(url, {
            method: "POST",
            body: JSON.stringify(data),
        }),
};

export default http;