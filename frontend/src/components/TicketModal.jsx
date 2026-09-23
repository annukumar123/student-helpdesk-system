import {
    Calendar,
    FileText,
    Hash,
    Mail,
    User,
    X,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

import { formatDate } from "../utils/formatDate";
import { formatLabel } from "../utils/helpers";

const TicketModal = ({
    isOpen,
    ticket,
    onClose,
}) => {
    if (!isOpen || !ticket) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                                {ticket.ticketNumber ||
                                    "N/A"}
                            </span>

                            <StatusBadge
                                status={
                                    ticket.status
                                }
                            />
                        </div>

                        <h2 className="mt-2 break-words text-xl font-bold text-slate-800">
                            {ticket.title ||
                                "Untitled Ticket"}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close ticket details"
                        className="shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-6 p-6">
                    {/* Description */}
                    <section>
                        <div className="mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />

                            <h3 className="text-sm font-semibold text-slate-800">
                                Description
                            </h3>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                                {ticket.description ||
                                    "No description provided."}
                            </p>
                        </div>
                    </section>

                    {/* Ticket Information */}
                    <section>
                        <h3 className="mb-3 text-sm font-semibold text-slate-800">
                            Ticket Information
                        </h3>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="rounded-xl border border-slate-200 p-4">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Hash className="h-4 w-4" />
                                    Ticket Number
                                </div>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {ticket.ticketNumber ||
                                        "N/A"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 p-4">
                                <p className="text-xs text-slate-400">
                                    Category
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {formatLabel(
                                        ticket.category
                                    ) || "N/A"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 p-4">
                                <p className="mb-1.5 text-xs text-slate-400">
                                    Priority
                                </p>

                                <PriorityBadge
                                    priority={
                                        ticket.priority
                                    }
                                />
                            </div>

                            <div className="rounded-xl border border-slate-200 p-4">
                                <p className="mb-1.5 text-xs text-slate-400">
                                    Status
                                </p>

                                <StatusBadge
                                    status={
                                        ticket.status
                                    }
                                />
                            </div>

                            <div className="rounded-xl border border-slate-200 p-4">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Calendar className="h-4 w-4" />
                                    Created At
                                </div>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {formatDate(
                                        ticket.createdAt
                                    )}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 p-4">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Calendar className="h-4 w-4" />
                                    Resolved At
                                </div>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {formatDate(
                                        ticket.resolvedAt
                                    )}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Student Information */}
                    <section>
                        <h3 className="mb-3 text-sm font-semibold text-slate-800">
                            Student Information
                        </h3>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Student ID */}
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <Hash className="h-4 w-4 text-blue-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Student ID
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-700">
                                            {ticket.studentId ||
                                                "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {/* Student Name */}
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <User className="h-4 w-4 text-blue-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Student Name
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-700">
                                            {ticket.studentName ||
                                                "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-3 sm:col-span-2">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <Mail className="h-4 w-4 text-blue-600" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400">
                                            Email
                                        </p>

                                        <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                                            {ticket.studentEmail ||
                                                "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketModal;