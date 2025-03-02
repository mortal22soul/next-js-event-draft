'use server';

import { User } from "@/models/user.model";

export const checkGoogleSignIn = async (email) => {
    try {
        const user = await User.findOne({ email }).select("provider");
        if (user?.provider === "google") {
            throw new Error("Please sign in with Google.");
        }

        return true;
    } catch (error) {
        throw new Error("Failed to Check Google Email")
    }
}