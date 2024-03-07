import { db } from "./db";
import { headers } from 'next/headers';

const Log = db.Log

export async function logUserActivity(user, action, details = {}) {
    try {
        // console.log
        const logEntry = await Log.create({
            user,
            action,
            details,
        });
        logEntry.save()
    } catch (e) {
        throw e
    }
}


export async function getUserActivity() {
    try {

        const currentUserId = headers().get('userId');
        // Retrieve user's activities from the logs collection
        const activities = await Log.find({ user: currentUserId }).sort({ timestamp: -1 });

        // Check if activities exist
        if (!activities.length) throw "No activities found for this user";

        // Respond with the user's activities
        return {
            success: true,
            count: activities.length,
            data: activities
        };
    } catch (e) {
        throw e
    }
}