'use client';
import { createContext, useContext, useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';

// Create Context
const GlobalContext = createContext();

// Created Provider
export function GlobeProvider({children}) {
    const [unreadCount, setUnreadCount] = useState(0);

    const { data: session } = useSession();

    useEffect(() => {
        if (session && session.user ) {
            getUnreadMessageCount().then((res) => {
                if (res.count) setUnreadCount(res.count);
            });
        }
    }, [getUnreadMessageCount, session]);

    return (
        <GlobalContext.Provider value={{
            unreadCount,
            setUnreadCount
        }}>
            { children }
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}