import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Ticket,
    TrendingUp,
    User,
    Activity,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAppContext } from "../context/AppContext";

import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import LoadingSpinner from "../components/LoadingSpinner";

import { formatDateOnly } from "../utils/formatDate";

const Dashboard = () => {
    const {
        tickets,
        users,
        loading,
        error,
    } = useAppContext();

    const totalTickets = tickets.length;

    const openTickets = tickets.filter(
        (ticket) => ticket.status === "OPEN"
    ).length;

    const inProgressTickets = tickets.filter(
        (ticket) => ticket.status === "IN_PROGRESS"
    ).length;

    const resolvedTickets = tickets.filter(
        (ticket) => ticket.status === "RESOLVED"
    ).length;

    const closedTickets = tickets.filter(
        (ticket) => ticket.status === "CLOSED"
    ).length;

    const urgentTickets = tickets.filter(
        (ticket) => ticket.priority === "URGENT"
    ).length;

    const recentTickets = [...tickets]
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )
        .slice(0, 3);

    if (loading) {
        return <LoadingSpinner message="Loading dashboard..." />;
    }

    return (
        <div className="space-y-8">

            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-7 text-white shadow-xl sm:p-9">

                <div className="relative z-10 max-w-3xl">

                    <p className="text-sm font-medium text-blue-100">
                        Welcome back, Admin 👋
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Student Helpdesk Dashboard
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                        Manage student support tickets, monitor requests,
                        and keep track of helpdesk activity from one place.
                    </p>

                </div>

                {/* Decorative elements */}
                <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />

                <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/5" />

                <Activity className="absolute right-8 top-16 h-20 w-20 rotate-12 text-white/20" />

            </section>

            {/* Error */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Overview Header */}
            <div className="flex items-end justify-between">

                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        Overview
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Current helpdesk statistics
                    </p>
                </div>

                <TrendingUp className="h-5 w-5 text-emerald-500" />

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Total Tickets"
                    value={totalTickets}
                    description="All support requests"
                    icon={Ticket}
                    iconColor="blue"
                />

                <StatCard
                    title="Open Tickets"
                    value={openTickets}
                    description="Awaiting resolution"
                    icon={Clock3}
                    iconColor="orange"
                />

                <StatCard
                    title="Resolved"
                    value={resolvedTickets}
                    description="Successfully resolved"
                    icon={CheckCircle2}
                    iconColor="green"
                />

                <StatCard
                    title="In Progress"
                    value={inProgressTickets}
                    description="Currently being handled"
                    icon={Activity}
                    iconColor="purple"
                />

            </div>

            {/* Secondary Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Closed Tickets
                            </p>

                            <p className="mt-2 text-2xl font-bold text-slate-800">
                                {closedTickets}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                            <CheckCircle2 className="h-5 w-5 text-slate-600" />
                        </div>

                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Urgent Tickets
                            </p>

                            <p className="mt-2 text-2xl font-bold text-red-600">
                                {urgentTickets}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                            <Activity className="h-5 w-5 text-red-500" />
                        </div>

                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Registered Students
                            </p>

                            <p className="mt-2 text-2xl font-bold text-blue-600">
                                {users.length}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                            <User className="h-5 w-5 text-blue-600" />
                        </div>

                    </div>
                </div>

            </div>

            {/* Recent Tickets */}
            <section>

                <div className="mb-4 flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Recent Tickets
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Latest student support requests
                        </p>
                    </div>

                    <Link
                        to="/tickets"
                        className="flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-700"
                    >
                        View all
                        <ArrowRight className="h-4 w-4" />
                    </Link>

                </div>

                {recentTickets.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                            <Ticket className="h-7 w-7 text-slate-400" />
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-slate-800">
                            No tickets yet
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Create your first support ticket to see it here.
                        </p>

                        <Link
                            to="/tickets"
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Go to Tickets
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                        {recentTickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >

                                {/* Ticket header */}
                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-2">

                                        <span className="text-sm font-bold text-blue-600">
                                            {ticket.ticketNumber}
                                        </span>

                                        <StatusBadge
                                            status={ticket.status}
                                        />

                                    </div>

                                    <Link
                                        to="/tickets"
                                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                        title="View tickets"
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>

                                </div>

                                {/* Title */}
                                <h3 className="mt-4 line-clamp-1 text-base font-semibold text-slate-800">
                                    {ticket.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-2 line-clamp-2 min-h-[42px] text-sm leading-5 text-slate-500">
                                    {ticket.description ||
                                        "No description provided."}
                                </p>

                                {/* Divider */}
                                <div className="my-4 border-t border-slate-100" />

                                {/* Footer */}
                                <div className="flex flex-wrap items-center justify-between gap-3">

                                    <div className="flex items-center gap-2 text-xs text-slate-500">

                                        <User className="h-3.5 w-3.5" />

                                        <span>
                                            {ticket.studentName ||
                                                "Unknown"}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-slate-400">

                                        <CalendarDays className="h-3.5 w-3.5" />

                                        <span>
                                            {formatDateOnly(
                                                ticket.createdAt
                                            )}
                                        </span>

                                    </div>

                                </div>

                                {/* Priority */}
                                <div className="mt-4">
                                    <PriorityBadge
                                        priority={ticket.priority}
                                    />
                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </section>

        </div>
    );
};

export default Dashboard;