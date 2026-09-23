import { createContext, useContext, useMemo } from "react";

import useTickets from "../hooks/useTickets";
import useUsers from "../hooks/useUsers";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const ticketData = useTickets();
    const userData = useUsers();

    const value = useMemo(() => {
        return {
            // ==============================
            // Tickets
            // ==============================

            tickets: ticketData.tickets,

            createTicket: ticketData.createTicket,
            updateTicket: ticketData.updateTicket,
            changeStatus: ticketData.changeStatus,
            resolveTicket: ticketData.resolveTicket,
            closeTicket: ticketData.closeTicket,
            deleteTicket: ticketData.deleteTicket,
            fetchTickets: ticketData.fetchTickets,

            ticketsLoading: ticketData.loading,
            ticketsError: ticketData.error,

            // ==============================
            // Users / Students
            // ==============================

            users: userData.users,

            createUser: userData.createUser,
            updateUser: userData.updateUser,
            deleteUser: userData.deleteUser,
            fetchUsers: userData.fetchUsers,

            usersLoading: userData.loading,
            usersError: userData.error,

            // ==============================
            // Global loading/error
            // ==============================

            loading:
                ticketData.loading ||
                userData.loading,

            error:
                ticketData.error ||
                userData.error,
        };
    }, [ticketData, userData]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "useAppContext must be used inside AppProvider"
        );
    }

    return context;
};

export default AppContext;