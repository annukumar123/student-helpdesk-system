import {
    BarChart3,
    CheckCircle2,
    Clock3,
    AlertTriangle,
    Ticket,
    Users,
} from "lucide-react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

import { useAppContext } from "../context/AppContext";

import LoadingSpinner from "../components/LoadingSpinner";

import { formatLabel } from "../utils/helpers";

const Analytics = () => {
    const {
        tickets,
        users,
        loading,
        error,
    } = useAppContext();

    if (loading) {
        return <LoadingSpinner message="Loading analytics..." />;
    }

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

    /*
     * Status chart
     */
    const statusData = [
        {
            name: "Open",
            value: openTickets,
        },
        {
            name: "In Progress",
            value: inProgressTickets,
        },
        {
            name: "Resolved",
            value: resolvedTickets,
        },
        {
            name: "Closed",
            value: closedTickets,
        },
    ];

    /*
     * Category chart
     */
    const categoryNames = [
        "TECHNICAL",
        "ACADEMIC",
        "ADMINISTRATIVE",
        "FINANCIAL",
        "GENERAL",
    ];

    const categoryData = categoryNames.map((category) => ({
        name: formatLabel(category),
        value: tickets.filter(
            (ticket) => ticket.category === category
        ).length,
    }));

    /*
     * Priority chart
     */
    const priorityNames = [
        "LOW",
        "MEDIUM",
        "HIGH",
        "URGENT",
    ];

    const priorityData = priorityNames.map((priority) => ({
        name: formatLabel(priority),
        value: tickets.filter(
            (ticket) => ticket.priority === priority
        ).length,
    }));

    const statusColors = [
        "#3b82f6",
        "#8b5cf6",
        "#10b981",
        "#64748b",
    ];

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Analytics
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Analyze ticket activity and helpdesk performance.
                    </p>
                </div>

            </div>

            {/* Error */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Total Tickets
                            </p>

                            <p className="mt-2 text-3xl font-bold text-slate-800">
                                {totalTickets}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                            <Ticket className="h-5 w-5 text-blue-600" />
                        </div>

                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Resolved
                            </p>

                            <p className="mt-2 text-3xl font-bold text-emerald-600">
                                {resolvedTickets}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        </div>

                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                In Progress
                            </p>

                            <p className="mt-2 text-3xl font-bold text-purple-600">
                                {inProgressTickets}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
                            <Clock3 className="h-5 w-5 text-purple-600" />
                        </div>

                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Urgent
                            </p>

                            <p className="mt-2 text-3xl font-bold text-red-600">
                                {urgentTickets}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>

                    </div>
                </div>

            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* Status Distribution */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Ticket Status
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Distribution of tickets by current status.
                        </p>
                    </div>

                    {totalTickets === 0 ? (
                        <div className="flex h-[300px] items-center justify-center text-sm text-slate-400">
                            No ticket data available.
                        </div>
                    ) : (
                        <div className="h-[300px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <PieChart>

                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={105}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {statusData.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={`cell-${entry.name}`}
                                                    fill={
                                                        statusColors[
                                                            index
                                                        ]
                                                    }
                                                />
                                            )
                                        )}
                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                </div>

                {/* Category Distribution */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Tickets by Category
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Number of tickets in each support category.
                        </p>
                    </div>

                    <div className="h-[300px]">
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <BarChart data={categoryData}>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="name"
                                    tick={{
                                        fontSize: 11,
                                    }}
                                />

                                <YAxis
                                    allowDecimals={false}
                                    tick={{
                                        fontSize: 11,
                                    }}
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="value"
                                    fill="#3b82f6"
                                    radius={[
                                        6,
                                        6,
                                        0,
                                        0,
                                    ]}
                                />

                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>

            </div>

            {/* Priority + System Overview */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* Priority */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Ticket Priority
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Distribution of tickets by priority level.
                        </p>
                    </div>

                    <div className="space-y-4">

                        {priorityData.map((item) => {

                            const percentage =
                                totalTickets > 0
                                    ? Math.round(
                                          (item.value /
                                              totalTickets) *
                                              100
                                      )
                                    : 0;

                            return (
                                <div key={item.name}>

                                    <div className="mb-1.5 flex items-center justify-between">

                                        <span className="text-sm font-medium text-slate-600">
                                            {item.name}
                                        </span>

                                        <span className="text-xs text-slate-400">
                                            {item.value}{" "}
                                            ({percentage}%)
                                        </span>

                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                                        <div
                                            className="h-full rounded-full bg-blue-500 transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </div>

                {/* System Overview */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-800">
                            System Overview
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Current helpdesk data summary.
                        </p>
                    </div>

                    <div className="space-y-4">

                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <Users className="h-5 w-5 text-blue-600" />
                                </div>

                                <span className="text-sm font-medium text-slate-600">
                                    Registered Students
                                </span>

                            </div>

                            <span className="text-lg font-bold text-slate-800">
                                {users.length}
                            </span>

                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <Ticket className="h-5 w-5 text-blue-600" />
                                </div>

                                <span className="text-sm font-medium text-slate-600">
                                    Total Tickets
                                </span>

                            </div>

                            <span className="text-lg font-bold text-slate-800">
                                {totalTickets}
                            </span>

                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                </div>

                                <span className="text-sm font-medium text-slate-600">
                                    Resolved Tickets
                                </span>

                            </div>

                            <span className="text-lg font-bold text-slate-800">
                                {resolvedTickets}
                            </span>

                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                    <AlertTriangle className="h-5 w-5 text-red-600" />
                                </div>

                                <span className="text-sm font-medium text-slate-600">
                                    Urgent Tickets
                                </span>

                            </div>

                            <span className="text-lg font-bold text-red-600">
                                {urgentTickets}
                            </span>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Analytics;