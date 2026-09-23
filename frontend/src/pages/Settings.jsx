import { useState } from "react";
import {
    Settings as SettingsIcon,
    Server,
    Database,
    Bell,
    Monitor,
    Ticket,
    Save,
    CheckCircle2,
} from "lucide-react";

import { API_BASE_URL } from "../utils/constants";

const Settings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        ticketNotifications: true,
        soundNotifications: false,
        compactMode: false,
        autoRefresh: true,
        autoRefreshInterval: "30",
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setSettings((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));

        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem(
            "studentHelpdeskSettings",
            JSON.stringify(settings)
        );

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 3000);
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200">
                    <SettingsIcon className="h-6 w-6 text-slate-700" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Settings
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Configure your Student Helpdesk System.
                    </p>
                </div>

            </div>

            {/* Saved message */}
            {saved && (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    <CheckCircle2 className="h-5 w-5" />
                    Settings saved successfully.
                </div>
            )}

            {/* System Information */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                            <Server className="h-5 w-5 text-blue-600" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-800">
                                System Information
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Current application configuration.
                            </p>
                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-400">
                            Application
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                            Student Helpdesk System
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-400">
                            Version
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                            1.0.0
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-400">
                            Frontend
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                            React + Vite
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-400">
                            Backend
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                            Spring Boot REST API
                        </p>
                    </div>

                </div>

            </section>

            {/* Backend / Database */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                            <Database className="h-5 w-5 text-purple-600" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-800">
                                Backend & Database
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Connection information for the application.
                            </p>
                        </div>

                    </div>

                </div>

                <div className="space-y-4 p-6">

                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-500">
                            API Base URL
                        </label>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
                            {API_BASE_URL}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div className="rounded-xl bg-slate-50 p-4">

                            <p className="text-xs font-medium text-slate-400">
                                API Status
                            </p>

                            <div className="mt-2 flex items-center gap-2">

                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                                <span className="text-sm font-semibold text-emerald-700">
                                    Connected
                                </span>

                            </div>

                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">

                            <p className="text-xs font-medium text-slate-400">
                                Database
                            </p>

                            <p className="mt-2 text-sm font-semibold text-slate-700">
                                H2 Database
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Notifications */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                            <Bell className="h-5 w-5 text-orange-600" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-800">
                                Notifications
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Control helpdesk notification preferences.
                            </p>
                        </div>

                    </div>

                </div>

                <div className="divide-y divide-slate-100">

                    {/* Email */}
                    <label className="flex cursor-pointer items-center justify-between gap-4 p-6">

                        <div>
                            <p className="text-sm font-medium text-slate-700">
                                Email Notifications
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Receive notifications through email.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={settings.emailNotifications}
                            onChange={handleChange}
                            className="h-5 w-5 accent-blue-600"
                        />

                    </label>

                    {/* Ticket */}
                    <label className="flex cursor-pointer items-center justify-between gap-4 p-6">

                        <div>
                            <p className="text-sm font-medium text-slate-700">
                                Ticket Notifications
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Show notifications when tickets change.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            name="ticketNotifications"
                            checked={settings.ticketNotifications}
                            onChange={handleChange}
                            className="h-5 w-5 accent-blue-600"
                        />

                    </label>

                    {/* Sound */}
                    <label className="flex cursor-pointer items-center justify-between gap-4 p-6">

                        <div>
                            <p className="text-sm font-medium text-slate-700">
                                Sound Notifications
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Play a sound for important notifications.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            name="soundNotifications"
                            checked={settings.soundNotifications}
                            onChange={handleChange}
                            className="h-5 w-5 accent-blue-600"
                        />

                    </label>

                </div>

            </section>

            {/* Display */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                            <Monitor className="h-5 w-5 text-indigo-600" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-800">
                                Display Preferences
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Customize how the dashboard behaves.
                            </p>
                        </div>

                    </div>

                </div>

                <div className="divide-y divide-slate-100">

                    {/* Compact Mode */}
                    <label className="flex cursor-pointer items-center justify-between gap-4 p-6">

                        <div>
                            <p className="text-sm font-medium text-slate-700">
                                Compact Mode
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Use a more compact layout for dashboard data.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            name="compactMode"
                            checked={settings.compactMode}
                            onChange={handleChange}
                            className="h-5 w-5 accent-blue-600"
                        />

                    </label>

                    {/* Auto Refresh */}
                    <label className="flex cursor-pointer items-center justify-between gap-4 p-6">

                        <div>
                            <p className="text-sm font-medium text-slate-700">
                                Auto Refresh
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Automatically refresh dashboard data.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            name="autoRefresh"
                            checked={settings.autoRefresh}
                            onChange={handleChange}
                            className="h-5 w-5 accent-blue-600"
                        />

                    </label>

                    {/* Refresh Interval */}
                    <div className="p-6">

                        <label
                            htmlFor="autoRefreshInterval"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Refresh Interval
                        </label>

                        <select
                            id="autoRefreshInterval"
                            name="autoRefreshInterval"
                            value={settings.autoRefreshInterval}
                            onChange={handleChange}
                            disabled={!settings.autoRefresh}
                            className="w-full max-w-xs rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                        >
                            <option value="15">
                                Every 15 seconds
                            </option>

                            <option value="30">
                                Every 30 seconds
                            </option>

                            <option value="60">
                                Every 1 minute
                            </option>

                            <option value="300">
                                Every 5 minutes
                            </option>
                        </select>

                    </div>

                </div>

            </section>

            {/* Ticket Configuration */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                            <Ticket className="h-5 w-5 text-emerald-600" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-800">
                                Ticket Configuration
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Current ticket workflow configuration.
                            </p>
                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-400">
                            Default Status
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                            OPEN
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-400">
                            Ticket Number Format
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                            T1001, T1002, T1003...
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-400">
                            Available Categories
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                            5 Categories
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-400">
                            Available Priorities
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                            4 Priority Levels
                        </p>
                    </div>

                </div>

            </section>

            {/* Save */}
            <div className="flex justify-end">

                <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                    <Save className="h-4 w-4" />
                    Save Settings
                </button>

            </div>

        </div>
    );
};

export default Settings;