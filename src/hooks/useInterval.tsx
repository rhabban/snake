import {useEffect, useRef} from "react";

const useInterval = ({callback, delay}: { callback: Function, delay: number }) => {
    const savedCallback = useRef<Function>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback && savedCallback.current) {
                savedCallback.current();
            }
        }

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, []);
};

export default useInterval;