import { Dispatch, SetStateAction } from "react";

type Props = {
    lastIncremented: Date,
    current: number,
    setCurrent: Dispatch<SetStateAction<{
        current: number;
        max: number;
        lastIncremented: Date;
    }>>,
    max: number
}

export default function useIncrement(props: Props): void {
    const interval = setInterval(() => {
        const start = props.lastIncremented.getTime();

        const now = new Date().getTime();
        const elapsedSeconds = Math.floor((now - start) / 3000);
        console.log(elapsedSeconds)
        console.log(props.lastIncremented)
        console.log(props.max)
        if (elapsedSeconds > 0) {
            const newCurrent = props.current + elapsedSeconds;
            props.setCurrent({ current: newCurrent > props.max ? props.max : newCurrent, max: props.max, lastIncremented: new Date() });
        }
    }, 3000)


}
