"use client"
import {persistor, store} from './store'
import { Provider } from 'react-redux'
import React from "react";
import {PersistGate} from "redux-persist/integration/react";
export function ReduxProvider ({children} : {children: React.ReactNode}) {
    // @ts-ignore
    return <Provider store={store}>
        <PersistGate persistor={persistor}>
        {children}
        </PersistGate>
    </Provider>
}

