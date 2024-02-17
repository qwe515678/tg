'use client'

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const ProgressBar = ({ progress }: { progress: number }) => {
    // Create a motion value that will control the width of the progress bar
    const progressValue = useMotionValue(progress);

    // Use the progressValue to create a transform that will map the progress value to a width percentage
    const width = useTransform(progressValue, [0,  1], ['0%', '100%']);

    // Use the useEffect hook to update the progressValue when the progress prop changes
    useEffect(() => {
        progressValue.set(progress);
    }, [progress, progressValue]);

    // Define the animation to animate the width of the progress bar
    const animation = {
        width: width,
        height: '20px',
        backgroundColor: 'red',
        // backgroundColor: 'linear-gradient(28deg, rgba(0,255,124,1)  0%, rgba(134,255,0,1)  100%)',
    };

    return (
        <motion.div
            style={animation}
            transition={{ duration:  0.5, ease: "easeInOut" }} // Define the transition for the animation
        />
    );
};

export default ProgressBar;
