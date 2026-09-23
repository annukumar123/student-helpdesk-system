export const formatLabel = (value) => {
    if (!value) {
        return "";
    }

    return value
        .toLowerCase()
        .split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");
};

export const getInitials = (name) => {
    if (!name) {
        return "?";
    }

    const words = name
        .trim()
        .split(/\s+/);

    if (words.length === 1) {
        return words[0]
            .charAt(0)
            .toUpperCase();
    }

    return (
        words[0].charAt(0) +
        words[words.length - 1].charAt(0)
    ).toUpperCase();
};

export const isTicketClosed = (status) => {
    return status === "CLOSED";
};

export const isTicketResolved = (status) => {
    return status === "RESOLVED";
};

export const isTicketActive = (status) => {
    return (
        status === "OPEN" ||
        status === "IN_PROGRESS"
    );
};

export const calculateTicketStats = (
    tickets = []
) => {
    return {
        total: tickets.length,

        open: tickets.filter(
            (ticket) =>
                ticket.status === "OPEN"
        ).length,

        inProgress: tickets.filter(
            (ticket) =>
                ticket.status === "IN_PROGRESS"
        ).length,

        resolved: tickets.filter(
            (ticket) =>
                ticket.status === "RESOLVED"
        ).length,

        closed: tickets.filter(
            (ticket) =>
                ticket.status === "CLOSED"
        ).length,

        urgent: tickets.filter(
            (ticket) =>
                ticket.priority === "URGENT"
        ).length,
    };
};