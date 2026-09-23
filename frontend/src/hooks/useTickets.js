import {
    useCallback,
    useEffect,
    useState,
} from "react";

import ticketService from "../services/ticketService";

const useTickets = () => {
    const [tickets, setTickets] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    /*
     * Load all tickets from backend
     */
    const fetchTickets = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data =
                await ticketService.getAllTickets();

            setTickets(
                Array.isArray(data)
                    ? data
                    : []
            );
        } catch (err) {
            console.error(
                "Failed to load tickets:",
                err
            );

            setError(
                "Unable to load tickets. Please check that the backend server is running."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    /*
     * Initial load
     */
    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    /*
     * Create ticket
     */
    const createTicket = async (ticket) => {
        try {
            setError(null);

            const createdTicket =
                await ticketService.createTicket(
                    ticket
                );

            setTickets(
                (currentTickets) => [
                    ...currentTickets,
                    createdTicket,
                ]
            );

            return createdTicket;
        } catch (err) {
            console.error(
                "Failed to create ticket:",
                err
            );

            setError(
                "Unable to create ticket."
            );

            throw err;
        }
    };

    /*
     * Update ticket
     */
    const updateTicket = async (
        id,
        ticket
    ) => {
        try {
            setError(null);

            const updatedTicket =
                await ticketService.updateTicket(
                    id,
                    ticket
                );

            setTickets(
                (currentTickets) =>
                    currentTickets.map(
                        (item) =>
                            item.id === id
                                ? updatedTicket
                                : item
                    )
            );

            return updatedTicket;
        } catch (err) {
            console.error(
                "Failed to update ticket:",
                err
            );

            setError(
                "Unable to update ticket."
            );

            throw err;
        }
    };

    /*
     * Change ticket status
     */
    const changeStatus = async (
        id,
        status
    ) => {
        try {
            setError(null);

            const updatedTicket =
                await ticketService.changeStatus(
                    id,
                    status
                );

            setTickets(
                (currentTickets) =>
                    currentTickets.map(
                        (item) =>
                            item.id === id
                                ? updatedTicket
                                : item
                    )
            );

            return updatedTicket;
        } catch (err) {
            console.error(
                "Failed to change ticket status:",
                err
            );

            setError(
                "Unable to change ticket status."
            );

            throw err;
        }
    };

    /*
     * Resolve ticket
     */
    const resolveTicket = async (id) => {
        try {
            setError(null);

            const updatedTicket =
                await ticketService.resolveTicket(
                    id
                );

            setTickets(
                (currentTickets) =>
                    currentTickets.map(
                        (item) =>
                            item.id === id
                                ? updatedTicket
                                : item
                    )
            );

            return updatedTicket;
        } catch (err) {
            console.error(
                "Failed to resolve ticket:",
                err
            );

            setError(
                "Unable to resolve ticket."
            );

            throw err;
        }
    };

    /*
     * Close ticket
     */
    const closeTicket = async (id) => {
        try {
            setError(null);

            const updatedTicket =
                await ticketService.closeTicket(
                    id
                );

            setTickets(
                (currentTickets) =>
                    currentTickets.map(
                        (item) =>
                            item.id === id
                                ? updatedTicket
                                : item
                    )
            );

            return updatedTicket;
        } catch (err) {
            console.error(
                "Failed to close ticket:",
                err
            );

            setError(
                "Unable to close ticket."
            );

            throw err;
        }
    };

    /*
     * Delete ticket
     */
    const deleteTicket = async (id) => {
        try {
            setError(null);

            await ticketService.deleteTicket(
                id
            );

            setTickets(
                (currentTickets) =>
                    currentTickets.filter(
                        (item) =>
                            item.id !== id
                    )
            );
        } catch (err) {
            console.error(
                "Failed to delete ticket:",
                err
            );

            setError(
                "Unable to delete ticket."
            );

            throw err;
        }
    };

    return {
        tickets,

        loading,

        error,

        fetchTickets,

        createTicket,

        updateTicket,

        changeStatus,

        resolveTicket,

        closeTicket,

        deleteTicket,
    };
};

export default useTickets;