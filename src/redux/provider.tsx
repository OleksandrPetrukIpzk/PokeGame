"use client"
import { store } from './store'
import { Provider } from 'react-redux'
import React from "react";
export function ReduxProvider ({children} : {children: React.ReactNode}) {
    // @ts-ignore
    return <Provider store={store}>{children}</Provider>
}