import { LoaderCircle } from "lucide-react";

const LoadingSpinner = ({
    message = "Loading...",
}) => {
    return (
        <div className="flex min-h-[220px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                    <LoaderCircle className="h-7 w-7 animate-spin text-blue-600" />
                </div>
                <p className="text-sm font-medium text-slate-500">
                    {message}
                </p>
            </div>
        </div>
    );
};
export default LoadingSpinner;