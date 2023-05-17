import { useEffect, useRef, useState } from "react";


const useDebounce = (value: string, delay: number)=>{
    const [debounceValue, setDebounceValue] = useState<string>(value),
    timerId = useRef<NodeJS.Timeout | null>(null);

    useEffect(()=>{
        timerId.current = setTimeout(()=> setDebounceValue(value),delay);

        return ()=>{
            if(timerId.current) clearTimeout(timerId.current);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value]);

    return debounceValue;
};



export {useDebounce};