import {
    CheckCircle2,
    Circle,
    Clock3,
    Lock,
} from "lucide-react";

import { formatLabel } from "../utils/helpers";

const STATUS_CONFIG = {
    OPEN: {
        icon: Circle,
        className:
            "bg-blue-50 text-blue-700 border-blue-200",
    },

    IN_PROGRESS: {
        icon: Clock3,
        className:
            "bg-amber-50 text-amber-700 border-amber-200",
    },

    RESOLVED: {
        icon: CheckCircle2,
        className:
            "bg-emerald-50 text-emerald-700 border-emerald-200",
    },

    CLOSED: {
        icon: Lock,
        className:
            "bg-slate-100 text-slate-600 border-slate-200",
    },
};

const StatusBadge = ({ status }) => {
    const config =
        STATUS_CONFIG[status] ||
        {
            icon: Circle,
            className:
                "bg-slate-100 text-slate-600 border-slate-200",
        };

    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
        >
            <Icon className="h-3.5 w-3.5" />

            {formatLabel(status)}
        </span>
    );
};

export default StatusBadge;