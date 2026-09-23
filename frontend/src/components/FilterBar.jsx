import { Filter, RotateCcw } from "lucide-react";

import {
    TICKET_STATUSES,
    TICKET_CATEGORIES,
    TICKET_PRIORITIES,
} from "../utils/constants";

import { formatLabel } from "../utils/helpers";

const FilterBar = ({
    filters,
    onFilterChange,
    onClear,
}) => {
    const handleChange = (event) => {
        const { name, value } =
            event.target;

        onFilterChange(
            name,
            value
        );
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                        <Filter className="h-4 w-4 text-blue-600" />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">
                            Filters
                        </h3>

                        <p className="text-xs text-slate-500">
                            Narrow down your results
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClear}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Clear Filters
                </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {/* Status */}
                <div>
                    <label
                        htmlFor="status"
                        className="mb-1.5 block text-xs font-medium text-slate-600"
                    >
                        Status
                    </label>

                    <select
                        id="status"
                        name="status"
                        value={
                            filters.status
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="">
                            All Statuses
                        </option>

                        {TICKET_STATUSES.map(
                            (status) => (
                                <option
                                    key={status}
                                    value={
                                        status
                                    }
                                >
                                    {formatLabel(
                                        status
                                    )}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label
                        htmlFor="category"
                        className="mb-1.5 block text-xs font-medium text-slate-600"
                    >
                        Category
                    </label>

                    <select
                        id="category"
                        name="category"
                        value={
                            filters.category
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="">
                            All Categories
                        </option>

                        {TICKET_CATEGORIES.map(
                            (category) => (
                                <option
                                    key={
                                        category
                                    }
                                    value={
                                        category
                                    }
                                >
                                    {formatLabel(
                                        category
                                    )}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* Priority */}
                <div>
                    <label
                        htmlFor="priority"
                        className="mb-1.5 block text-xs font-medium text-slate-600"
                    >
                        Priority
                    </label>

                    <select
                        id="priority"
                        name="priority"
                        value={
                            filters.priority
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="">
                            All Priorities
                        </option>

                        {TICKET_PRIORITIES.map(
                            (priority) => (
                                <option
                                    key={
                                        priority
                                    }
                                    value={
                                        priority
                                    }
                                >
                                    {formatLabel(
                                        priority
                                    )}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;