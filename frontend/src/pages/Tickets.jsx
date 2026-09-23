import { useMemo, useState } from "react";
import {
    Plus,
    Ticket as TicketIcon,
    Eye,
    Pencil,
    CheckCircle,
    XCircle,
    Trash2,
    User,
    CalendarDays,
} from "lucide-react";

import { useAppContext } from "../context/AppContext";

import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import TicketTable from "../components/TicketTable";
import TicketModal from "../components/TicketModal";
import CreateTicketModal from "../components/CreateTicketModal";
import EditTicketModal from "../components/EditTicketModal";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";

import { formatDateOnly } from "../utils/formatDate";

const Tickets = () => {
    const {
        tickets,
        loading,
        error,
        createTicket,
        updateTicket,
        resolveTicket,
        closeTicket,
        deleteTicket,
    } = useAppContext();

    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({
        status: "",
        category: "",
        priority: "",
    });

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTicket, setEditingTicket] = useState(null);
    const [viewingTicket, setViewingTicket] = useState(null);

    const [confirmAction, setConfirmAction] = useState(null);

    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    /*
     * Search + filters
     */
    const filteredTickets = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        return tickets.filter((ticket) => {
            const matchesSearch =
                !searchValue ||
                ticket.ticketNumber
                    ?.toLowerCase()
                    .includes(searchValue) ||
                ticket.title
                    ?.toLowerCase()
                    .includes(searchValue) ||
                ticket.description
                    ?.toLowerCase()
                    .includes(searchValue) ||
                ticket.studentName
                    ?.toLowerCase()
                    .includes(searchValue) ||
                ticket.studentEmail
                    ?.toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                !filters.status ||
                ticket.status === filters.status;

            const matchesCategory =
                !filters.category ||
                ticket.category === filters.category;

            const matchesPriority =
                !filters.priority ||
                ticket.priority === filters.priority;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCategory &&
                matchesPriority
            );
        });
    }, [tickets, search, filters]);

    /*
     * Toast helper
     */
    const showToast = (message, type = "success") => {
        setToast({
            message,
            type,
        });

        setTimeout(() => {
            setToast({
                message: "",
                type: "success",
            });
        }, 3000);
    };

    /*
     * Filter handlers
     */
    const handleFilterChange = (name, value) => {
        setFilters((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const clearFilters = () => {
        setSearch("");

        setFilters({
            status: "",
            category: "",
            priority: "",
        });
    };

    /*
     * Create ticket
     */
    const handleCreateTicket = async (ticketData) => {
        try {
            await createTicket(ticketData);

            setShowCreateModal(false);

            showToast("Ticket created successfully.");
        } catch (err) {
            showToast("Unable to create ticket.", "error");
        }
    };

    /*
     * Edit ticket
     */
    const handleUpdateTicket = async (id, ticketData) => {
        try {
            await updateTicket(id, ticketData);

            setEditingTicket(null);

            showToast("Ticket updated successfully.");
        } catch (err) {
            showToast("Unable to update ticket.", "error");
        }
    };

    /*
     * Open confirmation
     */
    const askForAction = (type, ticket) => {
        setConfirmAction({
            type,
            ticket,
        });
    };

    /*
     * Confirm action
     */
    const handleConfirmAction = async () => {
        if (!confirmAction) {
            return;
        }

        const { type, ticket } = confirmAction;

        try {
            if (type === "resolve") {
                await resolveTicket(ticket.id);

                showToast(
                    `${ticket.ticketNumber} resolved successfully.`
                );
            }

            if (type === "close") {
                await closeTicket(ticket.id);

                showToast(
                    `${ticket.ticketNumber} closed successfully.`
                );
            }

            if (type === "delete") {
                await deleteTicket(ticket.id);

                showToast(
                    `${ticket.ticketNumber} deleted successfully.`
                );
            }
        } catch (err) {
            if (type === "resolve") {
                showToast(
                    "Unable to resolve ticket.",
                    "error"
                );
            }

            if (type === "close") {
                showToast(
                    "Unable to close ticket.",
                    "error"
                );
            }

            if (type === "delete") {
                showToast(
                    "Unable to delete ticket.",
                    "error"
                );
            }
        } finally {
            setConfirmAction(null);
        }
    };

    /*
     * Confirmation dialog content
     */
    const getConfirmDetails = () => {
        if (!confirmAction) {
            return {
                title: "",
                message: "",
                confirmText: "Confirm",
            };
        }

        const { type, ticket } = confirmAction;

        if (type === "resolve") {
            return {
                title: "Resolve Ticket?",
                message: `Are you sure you want to mark ${ticket.ticketNumber} as resolved?`,
                confirmText: "Resolve",
            };
        }

        if (type === "close") {
            return {
                title: "Close Ticket?",
                message: `Are you sure you want to close ${ticket.ticketNumber}?`,
                confirmText: "Close",
            };
        }

        return {
            title: "Delete Ticket?",
            message: `Are you sure you want to permanently delete ${ticket.ticketNumber}? This action cannot be undone.`,
            confirmText: "Delete",
        };
    };

    const confirmDetails = getConfirmDetails();

    /*
     * Loading
     */
    if (loading) {
        return <LoadingSpinner message="Loading tickets..." />;
    }

    return (
        <div className="space-y-6">

            {/* Toast */}
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() =>
                    setToast({
                        message: "",
                        type: "success",
                    })
                }
            />

            {/* Confirmation Dialog */}
            <ConfirmDialog
                isOpen={Boolean(confirmAction)}
                title={confirmDetails.title}
                message={confirmDetails.message}
                confirmText={confirmDetails.confirmText}
                cancelText="Cancel"
                onConfirm={handleConfirmAction}
                onCancel={() => setConfirmAction(null)}
                danger={confirmAction?.type === "delete"}
            />

            {/* View Ticket */}
            <TicketModal
                isOpen={Boolean(viewingTicket)}
                ticket={viewingTicket}
                onClose={() => setViewingTicket(null)}
            />

            {/* Create Ticket */}
            <CreateTicketModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateTicket}
            />

            {/* Edit Ticket */}
            <EditTicketModal
                isOpen={Boolean(editingTicket)}
                ticket={editingTicket}
                onClose={() => setEditingTicket(null)}
                onSubmit={handleUpdateTicket}
            />

            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                            <TicketIcon className="h-6 w-6 text-blue-600" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                Tickets
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage and track student support requests.
                            </p>
                        </div>

                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                    <Plus className="h-5 w-5" />
                    Create Ticket
                </button>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium text-slate-500">
                        Total
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-800">
                        {tickets.length}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium text-slate-500">
                        Open
                    </p>

                    <p className="mt-1 text-2xl font-bold text-blue-600">
                        {
                            tickets.filter(
                                (ticket) =>
                                    ticket.status === "OPEN"
                            ).length
                        }
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium text-slate-500">
                        In Progress
                    </p>

                    <p className="mt-1 text-2xl font-bold text-purple-600">
                        {
                            tickets.filter(
                                (ticket) =>
                                    ticket.status === "IN_PROGRESS"
                            ).length
                        }
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium text-slate-500">
                        Resolved
                    </p>

                    <p className="mt-1 text-2xl font-bold text-emerald-600">
                        {
                            tickets.filter(
                                (ticket) =>
                                    ticket.status === "RESOLVED"
                            ).length
                        }
                    </p>
                </div>

            </div>

            {/* Error */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Search */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search by ticket number, title, student name or email..."
                />

            </div>

            {/* Filters */}
            <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={clearFilters}
            />

            {/* Result count */}
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm font-medium text-slate-700">
                        {filteredTickets.length} ticket
                        {filteredTickets.length !== 1
                            ? "s"
                            : ""}{" "}
                        found
                    </p>

                    {(search ||
                        filters.status ||
                        filters.category ||
                        filters.priority) && (
                        <p className="mt-1 text-xs text-slate-400">
                            Showing filtered results
                        </p>
                    )}
                </div>

                {(search ||
                    filters.status ||
                    filters.category ||
                    filters.priority) && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                        Reset search
                    </button>
                )}

            </div>

            {/* Empty State */}
            {filteredTickets.length === 0 ? (
                <EmptyState
                    title={
                        tickets.length === 0
                            ? "No tickets yet"
                            : "No matching tickets"
                    }
                    message={
                        tickets.length === 0
                            ? "Create your first support ticket to get started."
                            : "Try changing your search or filters."
                    }
                />
            ) : (
                <>
                    {/* Desktop Table */}
                    <TicketTable
                        tickets={filteredTickets}
                        onView={setViewingTicket}
                        onEdit={setEditingTicket}
                        onResolve={(ticket) =>
                            askForAction("resolve", ticket)
                        }
                        onClose={(ticket) =>
                            askForAction("close", ticket)
                        }
                        onDelete={(ticket) =>
                            askForAction("delete", ticket)
                        }
                    />

                    {/* Mobile / Tablet Cards */}
                    <div className="grid grid-cols-1 gap-4 lg:hidden">

                        {filteredTickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >

                                {/* Header */}
                                <div className="flex items-start justify-between gap-3">

                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">

                                            <span className="text-sm font-bold text-blue-600">
                                                {ticket.ticketNumber}
                                            </span>

                                            <StatusBadge
                                                status={ticket.status}
                                            />

                                        </div>

                                        <h3 className="mt-2 font-semibold text-slate-800">
                                            {ticket.title}
                                        </h3>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setViewingTicket(ticket)
                                        }
                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>

                                </div>

                                {/* Description */}
                                <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-500">
                                    {ticket.description ||
                                        "No description provided."}
                                </p>

                                {/* Student */}
                                <div className="mt-4 flex flex-wrap gap-3">

                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <User className="h-3.5 w-3.5" />
                                        {ticket.studentName ||
                                            "Unknown"}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <CalendarDays className="h-3.5 w-3.5" />
                                        {formatDateOnly(
                                            ticket.createdAt
                                        )}
                                    </div>

                                </div>

                                {/* Badges */}
                                <div className="mt-4 flex items-center justify-between">

                                    <PriorityBadge
                                        priority={ticket.priority}
                                    />

                                    <span className="text-xs text-slate-400">
                                        {ticket.category}
                                    </span>

                                </div>

                                {/* Actions */}
                                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setViewingTicket(ticket)
                                        }
                                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                                    >
                                        <Eye className="h-3.5 w-3.5" />
                                        View
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEditingTicket(ticket)
                                        }
                                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                        Edit
                                    </button>

                                    {ticket.status !== "RESOLVED" &&
                                        ticket.status !== "CLOSED" && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    askForAction(
                                                        "resolve",
                                                        ticket
                                                    )
                                                }
                                                className="flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-2 text-xs font-medium text-emerald-600 transition hover:bg-emerald-50"
                                            >
                                                <CheckCircle className="h-3.5 w-3.5" />
                                                Resolve
                                            </button>
                                        )}

                                    {ticket.status !== "CLOSED" && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                askForAction(
                                                    "close",
                                                    ticket
                                                )
                                            }
                                            className="flex items-center gap-1.5 rounded-lg border border-orange-200 px-3 py-2 text-xs font-medium text-orange-600 transition hover:bg-orange-50"
                                        >
                                            <XCircle className="h-3.5 w-3.5" />
                                            Close
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            askForAction(
                                                "delete",
                                                ticket
                                            )
                                        }
                                        className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                </>
            )}

        </div>
    );
};

export default Tickets;