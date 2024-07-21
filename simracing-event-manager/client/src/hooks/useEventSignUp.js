import { useState } from 'react';
import { update } from '../services/eventService';

export default function useEventSignUp(event, userId) {

    const [isLoading, setIsLoading] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);

    const signUpHandler = async () => {

        setIsLoading(true);

        try {
            const eventSubs = event.subscribers;
            eventSubs.push({_id: userId});
            await update(event._id, {...event, subscribers: eventSubs});
            setIsLoading(false);
            setIsSignedUp(true);
        } catch (err) {
            console.log('error from custom hook: ', err);
            setIsLoading(false);
        }
    }

    const signOutHandler = async () => {
        setIsLoading(true);

        try {
            const eventSubs = event.subscribers;
            const subscription = eventSubs.findIndex(s => s._id == userId);
            eventSubs.splice(subscription, 1);
            await update(event._id, {...event, subscribers: eventSubs});
            setIsLoading(false);
            setIsSignedUp(false);

        } catch (err) {
            console.log('error from custom hook sign out handler', err);
            setIsLoading(false);
        }
    }


    return [
        isLoading, isSignedUp, setIsSignedUp, signUpHandler, signOutHandler
    ]
}