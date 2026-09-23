import {
    Bell,
    Check,
    Menu,
    Moon,
    Settings,
    Sun,
    X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { NAV_ITEMS } from "../utils/constants";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false);

    const [notificationsOpen, setNotificationsOpen] =
        useState(false);

    const [notifications, setNotifications] =
        useState([
            {
                id: 1,
                title: "New ticket created",
                message:
                    "A new student support ticket has been submitted.",
                time: "Just now",
                unread: true,
            },
            {
                id: 2,
                title: "Ticket requires attention",
                message:
                    "Ticket T1001 is currently open.",
                time: "5 minutes ago",
                unread: true,
            },
        ]);

    const [darkMode, setDarkMode] =
        useState(() => {
            return (
                localStorage.getItem(
                    "helpdesk-theme"
                ) === "dark"
            );
        });

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            darkMode
        );

        localStorage.setItem(
            "helpdesk-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(
            (currentMode) => !currentMode
        );
    };

    const toggleNotifications = () => {
        setNotificationsOpen(
            (currentValue) => !currentValue
        );
    };

    const markAllNotificationsRead = () => {
        setNotifications(
            (currentNotifications) =>
                currentNotifications.map(
                    (notification) => ({
                        ...notification,
                        unread: false,
                    })
                )
        );
    };

    const unreadCount = notifications.filter(
        (notification) =>
            notification.unread
    ).length;

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <NavLink
                    to="/"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                        <span className="text-lg font-bold">
                            SH
                        </span>
                    </div>

                    <div className="hidden sm:block">
                        <h1 className="text-sm font-bold text-slate-800 dark:text-white">
                            Student Helpdesk
                        </h1>

                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            Support Management
                        </p>
                    </div>
                </NavLink>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1 lg:flex">
                    {NAV_ITEMS.map(
                        (item) => (
                            <NavLink
                                key={
                                    item.path
                                }
                                to={
                                    item.path
                                }
                                className={({
                                    isActive,
                                }) =>
                                    `rounded-xl px-4 py-2 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        )
                    )}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-1.5">

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            type="button"
                            title="Notifications"
                            onClick={
                                toggleNotifications
                            }
                            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                            <Bell className="h-5 w-5" />

                            {unreadCount >
                                0 && (
                                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notification Panel */}
                        {notificationsOpen && (
                            <div className="absolute right-0 top-12 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

                                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                                            Notifications
                                        </h3>

                                        <p className="text-xs text-slate-400">
                                            {unreadCount}{" "}
                                            unread
                                        </p>
                                    </div>

                                    {unreadCount >
                                        0 && (
                                        <button
                                            type="button"
                                            onClick={
                                                markAllNotificationsRead
                                            }
                                            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                        >
                                            <Check className="h-3.5 w-3.5" />
                                            Mark all read
                                        </button>
                                    )}
                                </div>

                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.length ===
                                    0 ? (
                                        <div className="px-4 py-8 text-center">
                                            <Bell className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />

                                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                                No notifications
                                            </p>
                                        </div>
                                    ) : (
                                        notifications.map(
                                            (
                                                notification
                                            ) => (
                                                <div
                                                    key={
                                                        notification.id
                                                    }
                                                    className={`border-b border-slate-100 px-4 py-3 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 ${
                                                        notification.unread
                                                            ? "bg-blue-50/50 dark:bg-blue-500/5"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="flex gap-3">
                                                        <div
                                                            className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                                                                notification.unread
                                                                    ? "bg-blue-500"
                                                                    : "bg-slate-300 dark:bg-slate-600"
                                                            }`}
                                                        />

                                                        <div className="min-w-0">
                                                            <p className="text-sm font-medium text-slate-800 dark:text-white">
                                                                {
                                                                    notification.title
                                                                }
                                                            </p>

                                                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                                {
                                                                    notification.message
                                                                }
                                                            </p>

                                                            <p className="mt-1 text-[11px] text-slate-400">
                                                                {
                                                                    notification.time
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Theme */}
                    <button
                        type="button"
                        title={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        onClick={
                            toggleDarkMode
                        }
                        className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                        {darkMode ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>

                    {/* Settings */}
                    <NavLink
                        to="/settings"
                        title="Settings"
                        className="hidden rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white sm:block"
                    >
                        <Settings className="h-5 w-5" />
                    </NavLink>

                    {/* Mobile Menu */}
                    <button
                        type="button"
                        title="Open navigation menu"
                        onClick={() =>
                            setMobileMenuOpen(
                                (value) =>
                                    !value
                            )
                        }
                        className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900 lg:hidden">
                    <nav className="mx-auto flex max-w-7xl flex-col gap-1">
                        {NAV_ITEMS.map(
                            (item) => (
                                <NavLink
                                    key={
                                        item.path
                                    }
                                    to={
                                        item.path
                                    }
                                    onClick={
                                        closeMobileMenu
                                    }
                                    className={({
                                        isActive,
                                    }) =>
                                        `rounded-xl px-4 py-3 text-sm font-medium transition ${
                                            isActive
                                                ? "bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    {
                                        item.label
                                    }
                                </NavLink>
                            )
                        )}

                        <button
                            type="button"
                            onClick={
                                toggleDarkMode
                            }
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                        >
                            {darkMode ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}

                            {darkMode
                                ? "Light Mode"
                                : "Dark Mode"}
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;