'use client'

import { ReactNode } from "react"
import { WebAppProvider, MainButton, BackButton } from '@vkruglikov/react-telegram-web-app';

interface Itemplate { children: ReactNode }

export default function template({ children }: Itemplate) {
    return (
        <WebAppProvider>{children}</WebAppProvider>
    )
}
