import {
    useCallback,
    useEffect,
    useState,
} from "react";

import userService from "../services/userService";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data =
                await userService.getAllUsers();

            setUsers(
                Array.isArray(data)
                    ? data
                    : []
            );
        } catch (err) {
            console.error(
                "Failed to load users:",
                err
            );

            setError(
                "Unable to load students. Please check that the backend server is running."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const createUser = async (user) => {
        try {
            setError(null);

            const createdUser =
                await userService.createUser(
                    user
                );

            setUsers(
                (currentUsers) => [
                    ...currentUsers,
                    createdUser,
                ]
            );

            return createdUser;
        } catch (err) {
            console.error(
                "Failed to create user:",
                err
            );

            setError(
                "Unable to create student."
            );

            throw err;
        }
    };

    const updateUser = async (
        id,
        user
    ) => {
        try {
            setError(null);

            const updatedUser =
                await userService.updateUser(
                    id,
                    user
                );

            setUsers(
                (currentUsers) =>
                    currentUsers.map(
                        (item) =>
                            item.id === id
                                ? updatedUser
                                : item
                    )
            );

            return updatedUser;
        } catch (err) {
            console.error(
                "Failed to update user:",
                err
            );

            setError(
                "Unable to update student."
            );

            throw err;
        }
    };

    const deleteUser = async (id) => {
        try {
            setError(null);

            await userService.deleteUser(
                id
            );

            setUsers(
                (currentUsers) =>
                    currentUsers.filter(
                        (item) =>
                            item.id !== id
                    )
            );
        } catch (err) {
            console.error(
                "Failed to delete user:",
                err
            );

            setError(
                "Unable to delete student."
            );

            throw err;
        }
    };

    return {
        users,
        loading,
        error,

        fetchUsers,

        createUser,
        updateUser,
        deleteUser,
    };
};

export default useUsers;