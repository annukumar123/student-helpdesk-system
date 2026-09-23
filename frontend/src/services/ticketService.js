import api from "./api";

const ticketService = {
    getAllTickets() {
        return api.get("/tickets");
    },

    getTicketById(id) {
        return api.get(`/tickets/${id}`);
    },

    getTicketByNumber(ticketNumber) {
        return api.get(
            `/tickets/number/${ticketNumber}`
        );
    },

    createTicket(ticket) {
        return api.post(
            "/tickets",
            ticket
        );
    },

    updateTicket(id, ticket) {
        return api.put(
            `/tickets/${id}`,
            ticket
        );
    },

    changeStatus(id, status) {
        return api.patch(
            `/tickets/${id}/status`,
            {
                status,
            }
        );
    },

    resolveTicket(id) {
        return api.patch(
            `/tickets/${id}/resolve`
        );
    },

    closeTicket(id) {
        return api.patch(
            `/tickets/${id}/close`
        );
    },

    deleteTicket(id) {
        return api.delete(
            `/tickets/${id}`
        );
    },
};

export default ticketService;