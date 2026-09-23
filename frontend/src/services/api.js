const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080/api";

const handleResponse = async (response) => {
    if (!response.ok) {
        let message =
            `Request failed with status ${response.status}`;

        try {
            const errorData = await response.json();

            if (errorData?.message) {
                message = errorData.message;
            }
        } catch {
            // Ignore invalid or empty error responses
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
};

const api = {

    async get(endpoint) {
        const response = await fetch(
            `${API_BASE_URL}${endpoint}`
        );

        return handleResponse(response);
    },

    async post(endpoint, data) {
        const response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        return handleResponse(response);
    },

    async put(endpoint, data) {
        const response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        return handleResponse(response);
    },

    async patch(endpoint, data = null) {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (data !== null) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            options
        );

        return handleResponse(response);
    },

    async delete(endpoint) {
        const response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            {
                method: "DELETE",
            }
        );

        return handleResponse(response);
    },
};

export { API_BASE_URL };

export default api;