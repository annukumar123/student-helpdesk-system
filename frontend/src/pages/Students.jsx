import { useMemo, useState } from "react";
import {
    UserPlus,
    Search,
    Pencil,
    Trash2,
    Mail,
    Users,
} from "lucide-react";

import { useAppContext } from "../context/AppContext";
import { getInitials } from "../utils/helpers";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";

const Students = () => {
    const {
        users,
        loading,
        error,
        createUser,
        updateUser,
        deleteUser,
    } = useAppContext();

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    const [confirmDelete, setConfirmDelete] = useState(null);

    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    const filteredUsers = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        if (!searchValue) {
            return users;
        }

        return users.filter(
            (user) =>
                user.name?.toLowerCase().includes(searchValue) ||
                user.email?.toLowerCase().includes(searchValue) ||
                String(user.id).includes(searchValue)
        );
    }, [users, search]);

    const openCreateModal = () => {
        setEditingUser(null);

        setForm({
            name: "",
            email: "",
        });

        setShowModal(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);

        setForm({
            name: user.name || "",
            email: user.email || "",
        });

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingUser(null);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const showToast = (message, type = "success") => {
        setToast({
            message,
            type,
        });

        setTimeout(() => {
            setToast({
                message: "",
                type: "success",
            });
        }, 3000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.name.trim()) {
            showToast("Student name is required.", "error");
            return;
        }

        if (!form.email.trim()) {
            showToast("Student email is required.", "error");
            return;
        }

        try {
            if (editingUser) {
                await updateUser(editingUser.id, {
                    name: form.name.trim(),
                    email: form.email.trim(),
                });

                showToast("Student updated successfully.");
            } else {
                await createUser({
                    name: form.name.trim(),
                    email: form.email.trim(),
                });

                showToast("Student created successfully.");
            }

            closeModal();
        } catch (err) {
            showToast(
                editingUser
                    ? "Unable to update student."
                    : "Unable to create student.",
                "error"
            );
        }
    };

    const handleDelete = async () => {
        if (!confirmDelete) {
            return;
        }

        try {
            await deleteUser(confirmDelete.id);

            showToast("Student deleted successfully.");
        } catch (err) {
            showToast("Unable to delete student.", "error");
        } finally {
            setConfirmDelete(null);
        }
    };

    return (
        <div className="space-y-6">

            {/* Toast */}
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() =>
                    setToast({
                        message: "",
                        type: "success",
                    })
                }
            />

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={Boolean(confirmDelete)}
                title="Delete Student?"
                message={
                    confirmDelete
                        ? `Are you sure you want to delete ${confirmDelete.name}? This action cannot be undone.`
                        : ""
                }
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
                danger
            />

            {/* Create / Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-slate-800">
                                {editingUser
                                    ? "Edit Student"
                                    : "Add Student"}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {editingUser
                                    ? "Update student information."
                                    : "Add a new student to the helpdesk system."}
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Student Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter student name"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="student@example.com"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    {editingUser
                                        ? "Update Student"
                                        : "Add Student"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                Students
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage students registered with the helpdesk.
                            </p>
                        </div>

                    </div>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                    <UserPlus className="h-5 w-5" />
                    Add Student
                </button>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Total Students
                            </p>

                            <p className="mt-2 text-3xl font-bold text-slate-800">
                                {users.length}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                            <Users className="h-5 w-5 text-blue-600" />
                        </div>

                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Search Results
                            </p>

                            <p className="mt-2 text-3xl font-bold text-slate-800">
                                {filteredUsers.length}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
                            <Search className="h-5 w-5 text-purple-600" />
                        </div>

                    </div>
                </div>

            </div>

            {/* Search */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                <div className="relative">

                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search by student name, email or ID..."
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                </div>

            </div>

            {/* Error */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Students */}
            {loading ? (
                <LoadingSpinner message="Loading students..." />
            ) : filteredUsers.length === 0 ? (
                <EmptyState
                    title={
                        search
                            ? "No students found"
                            : "No students yet"
                    }
                    message={
                        search
                            ? "Try a different name, email or student ID."
                            : "Add your first student to start managing helpdesk users."
                    }
                />
            ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >

                            {/* Student Header */}
                            <div className="flex items-start justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                                        {getInitials(user.name)}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-slate-800">
                                            {user.name}
                                        </h3>

                                        <p className="mt-0.5 text-xs text-slate-400">
                                            Student #{user.id}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex gap-1 opacity-100 transition lg:opacity-0 lg:group-hover:opacity-100">

                                    <button
                                        type="button"
                                        title="Edit student"
                                        onClick={() =>
                                            openEditModal(user)
                                        }
                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>

                                    <button
                                        type="button"
                                        title="Delete student"
                                        onClick={() =>
                                            setConfirmDelete(user)
                                        }
                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>

                                </div>

                            </div>

                            {/* Student Email */}
                            <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                                    <Mail className="h-4 w-4 text-blue-600" />
                                </div>

                                <p className="min-w-0 break-all text-sm text-slate-600">
                                    {user.email}
                                </p>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default Students;