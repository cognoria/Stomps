import { headers } from 'next/headers';
import { db } from './db';

const Log = db.Log

export const activityRepo = {
    logActivity,
    getActivities
}

async function logActivity(action, details = {}){
    try{
        const currentUserId = headers().get('userId');
        return await Log.create({userId: currentUserId, action, details})
    }catch (e){
        throw 'Could not create activity log';
    }
}

async function getActivities(){
    const currentUserId = headers().get('userId');
    return await Log.find({ userId: currentUserId}).sort({ timestamp: -1 });
}