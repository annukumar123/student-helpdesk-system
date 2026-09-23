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

const TicketTable = ({
    tickets = [],
    onView,
    onEdit,
    onResolve,
    onClose,
    onDelete,
}) => {
    return (
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px]">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Ticket
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Student
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Category
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Priority
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Status
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Created
                            </th>

                            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {tickets.map((ticket) => (
                            <tr
                                key={ticket.id}
                                className="transition hover:bg-slate-50"
                            >
                                {/* Ticket */}
                                <td className="px-5 py-4">
                                    <div>
                                        <p className="font-semibold text-slate-800">
                                            {ticket.ticketNumber ||
                                                "N/A"}
                                        </p>

                                        <p className="mt-1 max-w-[220px] truncate text-sm text-slate-500">
                                            {ticket.title ||
                                                "Untitled Ticket"}
                                        </p>
                                    </div>
                                </td>

                                {/* Student */}
                                <td className="px-5 py-4">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            {ticket.studentName ||
                                                "Unknown"}
                                        </p>

                                        <p className="mt-1 max-w-[180px] truncate text-xs text-slate-400">
                                            {ticket.studentEmail ||
                                                "No email"}
                                        </p>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-600">
                                        {formatLabel(
                                            ticket.category
                                        )}
                                    </span>
                                </td>

                                {/* Priority */}
                                <td className="px-5 py-4">
                                    <PriorityBadge
                                        priority={
                                            ticket.priority
                                        }
                                    />
                                </td>

                                {/* Status */}
                                <td className="px-5 py-4">
                                    <StatusBadge
                                        status={
                                            ticket.status
                                        }
                                    />
                                </td>

                                {/* Created */}
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-500">
                                        {formatDate(
                                            ticket.createdAt
                                        )}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-5 py-4">
                                    <div className="flex justify-end gap-1">
                                        <button
                                            type="button"
                                            title="View ticket"
                                            onClick={() =>
                                                onView?.(
                                                    ticket
                                                )
                                            }
                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>

                                        <button
                                            type="button"
                                            title="Edit ticket"
                                            onClick={() =>
                                                onEdit?.(
                                                    ticket
                                                )
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
                                                onDelete?.(
                                                    ticket
                                                )
                                            }
                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TicketTable;