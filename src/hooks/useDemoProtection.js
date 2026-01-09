// src/hooks/useDemoProtection.js
import { useCallback } from "react";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import { DEMO_CREDENTIALS, DEMO_RESTRICTION_MESSAGE } from "../config/demoCredentials";


const useDemoProtection = () => {
    const { user } = useAuth();

    // Check if current user is a demo account
    const isDemoAccount = useCallback(() => {
        if (!user?.email) return false;

        return Object.values(DEMO_CREDENTIALS).some(
            (cred) => cred.email === user.email
        );
    }, [user]);

    // Get demo account role
    const getDemoRole = useCallback(() => {
        if (!user?.email) return null;

        const demoEntry = Object.entries(DEMO_CREDENTIALS).find(
            ([_, cred]) => cred.email === user.email
        );

        return demoEntry ? demoEntry[0] : null;
    }, [user]);

    // Check if action is allowed and show toast if not
    const checkActionPermission = useCallback((actionType = "modify") => {
        if (!isDemoAccount()) {
            return true; // Real user, allow all actions
        }

        const role = getDemoRole();
        const message = DEMO_RESTRICTION_MESSAGE[role] ||
            "You are using a demo account. Please register with your own account to perform this action.";

        toast.error(message, {
            duration: 5000,
            icon: "🔒",
            style: {
                background: "#FEE2E2",
                color: "#991B1B",
                border: "1px solid #FCA5A5",
            },
        });

        return false;
    }, [isDemoAccount, getDemoRole]);

    // Wrapper function for protected actions
    const protectedAction = useCallback(async (action, actionType = "modify") => {
        if (!checkActionPermission(actionType)) {
            return null;
        }

        return await action();
    }, [checkActionPermission]);

    return {
        isDemoAccount: isDemoAccount(),
        demoRole: getDemoRole(),
        checkActionPermission,
        protectedAction,
    };
};

export default useDemoProtection;