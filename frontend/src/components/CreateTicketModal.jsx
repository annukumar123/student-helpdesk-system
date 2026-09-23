import { useState } from "react";
import { X } from "lucide-react";

import {
    TICKET_CATEGORIES,
    TICKET_PRIORITIES,
} from "../utils/constants";

import { formatLabel } from "../utils/helpers";

const initialForm = {
    title: "",
    description: "",
    category: "GENERAL",
    priority: "MEDIUM",
    studentId: "",
    studentName: "",
    studentEmail: "",
};

const CreateTicketModal = ({
    isOpen,
    onClose,
    onSubmit,
}) => {

    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) {
        return null;
    }

    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (!form.title.trim()) {
            setError("Ticket title is required.");
            return;
        }

        if (!form.description.trim()) {
            setError("Ticket description is required.");
            return;
        }

        if (!form.studentName.trim()) {
            setError("Student name is required.");
            return;
        }

        if (!form.studentEmail.trim()) {
            setError("Student email is required.");
            return;
        }

        try {

            setSubmitting(true);

            const ticketData = {
                title: form.title.trim(),
                description: form.description.trim(),
                category: form.category,
                priority: form.priority,
                studentId: form.studentId
                    ? Number(form.studentId)
                    : null,
                studentName: form.studentName.trim(),
                studentEmail: form.studentEmail.trim(),
            };

            await onSubmit(ticketData);

            setForm(initialForm);

            onClose();

        } catch (err) {

            console.error("Failed to create ticket:", err);

            setError(
                "Unable to create ticket. Please try again."
            );

        } finally {

            setSubmitting(false);
        }
    };

    const handleClose = () => {

        if (submitting) {
            return;
        }

        setForm(initialForm);
        setError("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">

                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Create New Ticket
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Submit a new student support request.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={submitting}
                        className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X className="h-5 w-5" />
                    </button>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    {/* Error */}
                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Ticket title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                            Ticket Title
                        </label>

                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Example: Unable to login"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe the student's issue..."
                            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Category + Priority */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>
                            <label
                                htmlFor="category"
                                className="mb-1.5 block text-sm font-medium text-slate-700"
                            >
                                Category
                            </label>

                            <select
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                {TICKET_CATEGORIES.map((category) => (
                                    <option
                                        key={category}
                                        value={category}
                                    >
                                        {formatLabel(category)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="priority"
                                className="mb-1.5 block text-sm font-medium text-slate-700"
                            >
                                Priority
                            </label>

                            <select
                                id="priority"
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                {TICKET_PRIORITIES.map((priority) => (
                                    <option
                                        key={priority}
                                        value={priority}
                                    >
                                        {formatLabel(priority)}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* Student information */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                        <h3 className="mb-4 text-sm font-semibold text-slate-800">
                            Student Information
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* Student ID */}
                            <div>
                                <label
                                    htmlFor="studentId"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Student ID
                                </label>

                                <input
                                    id="studentId"
                                    name="studentId"
                                    type="number"
                                    min="1"
                                    value={form.studentId}
                                    onChange={handleChange}
                                    placeholder="Example: 1"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Student Name */}
                            <div>
                                <label
                                    htmlFor="studentName"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Student Name
                                </label>

                                <input
                                    id="studentName"
                                    name="studentName"
                                    type="text"
                                    value={form.studentName}
                                    onChange={handleChange}
                                    placeholder="Example: Raju"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Student Email */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="studentEmail"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Student Email
                                </label>

                                <input
                                    id="studentEmail"
                                    name="studentEmail"
                                    type="email"
                                    value={form.studentEmail}
                                    onChange={handleChange}
                                    placeholder="Example: raju@example.com"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={submitting}
                            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {submitting
                                ? "Creating..."
                                : "Create Ticket"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CreateTicketModal;