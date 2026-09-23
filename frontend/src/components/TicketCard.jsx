import {
    CheckCircle,
    Eye,
    Pencil,
    Trash2,
    XCircle,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

import { formatDate } from "../utils/formatDate";
import { formatLabel } from "../utils/helpers";

const TicketCard = ({
    ticket,
    onView,
    onEdit,
    onResolve,
    onClose,
    onDelete,
}) => {
    if (!ticket) {
        return null;
    }

    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                            {ticket.ticketNumber}
                        </span>

                        <StatusBadge
                            status={ticket.status}
                        />
                    </div>

                    <h3 className="mt-3 truncate text-base font-bold text-slate-800">
                        {ticket.title ||
                            "Untitled Ticket"}
                    </h3>
                </div>

                <PriorityBadge
                    priority={ticket.priority}
                />
            </div>

            {/* Description */}
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                {ticket.description ||
                    "No description provided."}
            </p>

            {/* Student */}
            <div className="mt-5 rounded-xl bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-400">
                            Student
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                            {ticket.studentName ||
                                "Unknown Student"}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs font-medium text-slate-400">
                            Category
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-600">
                            {formatLabel(
                                ticket.category
                            )}
                        </p>
                    </div>
                </div>

                {ticket.studentEmail && (
                    <p className="mt-1 truncate text-xs text-slate-400">
                        {ticket.studentEmail}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                    {formatDate(
                        ticket.createdAt
                    )}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        title="View ticket"
                        onClick={() =>
                            onView?.(ticket)
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <Eye className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        title="Edit ticket"
                        onClick={() =>
                            onEdit?.(ticket)
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>

                    {ticket.status !==
                        "RESOLVED" &&
                        ticket.status !==
                            "CLOSED" && (
                            <button
                                type="button"
                                title="Resolve ticket"
                                onClick={() =>
                                    onResolve?.(
                                        ticket
                                    )
                                }
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                            >
                                <CheckCircle className="h-4 w-4" />
                            </button>
                        )}

                    {ticket.status !==
                        "CLOSED" && (
                        <button
                            type="button"
                            title="Close ticket"
                            onClick={() =>
                                onClose?.(
                                    ticket
                                )
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                            <XCircle className="h-4 w-4" />
                        </button>
                    )}

                    <button
                        type="button"
                        title="Delete ticket"
                        onClick={() =>
                            onDelete?.(ticket)
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;