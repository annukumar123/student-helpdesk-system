import {
    CheckCircle,
    X,
    XCircle,
} from "lucide-react";

const Toast = ({
    message,
    type = "success",
    onClose,
}) => {
    if (!message) {
        return null;
    }

    const isSuccess =
        type === "success";

    return (
        <div className="fixed right-4 top-4 z-[60] w-[calc(100%-2rem)] max-w-sm animate-[slideIn_0.3s_ease-out]">
            <div
                className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-xl ${
                    isSuccess
                        ? "border-emerald-200"
                        : "border-red-200"
                }`}
            >
                {/* Icon */}
                <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        isSuccess
                            ? "bg-emerald-100"
                            : "bg-red-100"
                    }`}
                >
                    {isSuccess ? (
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                    ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                    )}
                </div>

                {/* Message */}
                <div className="flex-1 pt-1">
                    <p
                        className={`text-sm font-medium ${
                            isSuccess
                                ? "text-emerald-800"
                                : "text-red-800"
                        }`}
                    >
                        {message}
                    </p>
                </div>

                {/* Close */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close notification"
                    className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;