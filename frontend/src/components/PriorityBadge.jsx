import {
    AlertCircle,
    ArrowDown,
    ArrowUp,
    Zap,
} from "lucide-react";

import { formatLabel } from "../utils/helpers";

const PRIORITY_CONFIG = {
    LOW: {
        icon: ArrowDown,
        className:
            "bg-slate-50 text-slate-600 border-slate-200",
    },

    MEDIUM: {
        icon: ArrowUp,
        className:
            "bg-blue-50 text-blue-700 border-blue-200",
    },

    HIGH: {
        icon: AlertCircle,
        className:
            "bg-orange-50 text-orange-700 border-orange-200",
    },

    URGENT: {
        icon: Zap,
        className:
            "bg-red-50 text-red-700 border-red-200",
    },
};

const PriorityBadge = ({ priority }) => {
    const config =
        PRIORITY_CONFIG[priority] ||
        {
            icon: AlertCircle,
            className:
                "bg-slate-100 text-slate-600 border-slate-200",
        };

    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
        >
            <Icon className="h-3.5 w-3.5" />

            {formatLabel(priority)}
        </span>
    );
};

export default PriorityBadge;