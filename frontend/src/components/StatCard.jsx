import {
    ArrowDownRight,
    ArrowUpRight,
} from "lucide-react";

const StatCard = ({
    title,
    value,
    icon: Icon,
    description,
    trend,
    trendLabel,
    iconClassName = "bg-blue-100 text-blue-600",
}) => {
    const hasTrend =
        trend !== undefined &&
        trend !== null;

    const isPositive =
        Number(trend) >= 0;

    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
                        {value ?? 0}
                    </p>
                </div>

                {Icon && (
                    <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition duration-300 group-hover:scale-110 ${iconClassName}`}
                    >
                        <Icon className="h-6 w-6" />
                    </div>
                )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                {hasTrend && (
                    <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                            isPositive
                                ? "text-emerald-600"
                                : "text-red-600"
                        }`}
                    >
                        {isPositive ? (
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        ) : (
                            <ArrowDownRight className="h-3.5 w-3.5" />
                        )}

                        {Math.abs(Number(trend))}%
                    </span>
                )}

                {trendLabel && (
                    <span className="text-xs text-slate-400">
                        {trendLabel}
                    </span>
                )}

                {!trendLabel &&
                    description && (
                        <span className="text-xs text-slate-400">
                            {description}
                        </span>
                    )}
            </div>
        </div>
    );
};

export default StatCard;