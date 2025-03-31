// module.exports =  {
//     get: (url) => {
//         return new Promise(resolve => {
//
//             fetch(url)
//                 .then(res => res.json())
//                 .then(data => {
//                     resolve(data)
//                 })
//
//         })
//     },
//     post: (url, data) => {
//         return new Promise((resolve, reject) => { // Add reject
//             const options = {
//                 method: "POST",
//                 headers: {
//                     "content-type": "application/json"
//                 },
//                 body: JSON.stringify(data)
//             };
//
//             fetch(url, options)
//                 .then(res => res.json())
//                 .then(data => resolve(data))
//                 .catch(err => { // Catch fetch errors
//                     console.error("Fetch Error:", err);
//                     reject(err);
//                 });
//         });
//     },
//     getToken: (url) => {
//         return new Promise(resolve => {
//
//             const options = {
//                 method: "GET",
//                 headers: {
//                     authorization: localStorage.getItem('token'),
//                     "content-type": "application/json"
//                 }
//             }
//
//             fetch(url, options)
//                 .then(res => res.json())
//                 .then(data => {
//                     resolve(data)
//                 })
//
//         })
//     },
//     postToken: (url, data) => {
//         return new Promise(resolve => {
//
//             const options = {
//                 method: "POST",
//                 headers: {
//                     authorization: localStorage.getItem('token'),
//                     "content-type": "application/json"
//                 },
//                 body: JSON.stringify(data)
//             }
//
//             fetch(url, options)
//                 .then(res => res.json())
//                 .then(data => {
//                     resolve(data)
//                 })
//
//         })
//     }
// }


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

        // Check if response is JSON before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text(); // Get the raw response
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