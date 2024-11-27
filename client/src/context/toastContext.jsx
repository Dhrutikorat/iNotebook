import React from 'react'
import { useContext } from 'react';
import { useRef } from 'react';
const ToastContext = createContext(undefined);

export default function ToastContextProvider() {
    const toastRef = useRef(null);

    const showToast = (options) => {
        if (!toastRef.current) return;
        toastRef.current.show(options);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            <Toast ref={toastRef} />
            <div>{children}</div>
        </ToastContext.Provider>
    );
}

export const useToastContext = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToastContext have to be used within ToastContextProvider"
        );
    }

    return context;
};

