export const TICKET_STATUSES = [
    "OPEN",
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
];

export const TICKET_CATEGORIES = [
    "TECHNICAL",
    "ACADEMIC",
    "ADMINISTRATIVE",
    "FINANCIAL",
    "GENERAL",
];

export const TICKET_PRIORITIES = [
    "LOW",
    "MEDIUM",
    "HIGH",
    "URGENT",
];

export const NAV_ITEMS = [
    {
        label: "Dashboard",
        path: "/",
    },
    {
        label: "Tickets",
        path: "/tickets",
    },
    {
        label: "Students",
        path: "/students",
    },
    {
        label: "Analytics",
        path: "/analytics",
    },
    {
        label: "Settings",
        path: "/settings",
    },
];

export const API_BASE_URL =
    "http://localhost:8080/api";