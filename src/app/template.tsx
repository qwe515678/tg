'use client'

import { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function Page({ children }: { children: ReactNode }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {children}
        </motion.div>
    )
}