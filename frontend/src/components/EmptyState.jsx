import { Inbox } from "lucide-react";

const EmptyState = ({
    title = "No data found",
    message = "There is nothing to display here yet.",
    actionLabel,
    onAction,
}) => {
    return (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Inbox className="h-7 w-7 text-slate-400" />
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
                {title}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {message}
            </p>

            {actionLabel && onAction && (
                <button
                    type="button"
                    onClick={onAction}
                    className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-md"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;