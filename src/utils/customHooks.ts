/* eslint-disable prefer-spread */
import { useEffect, useRef, useState,DependencyList } from "react";


function useDebounce (value: string, delay: number){
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
}

function useDebounceEffect(fnc:()=> void, delay: number, deps: any){
    const timerId = useRef<NodeJS.Timeout | null>(null);
    useEffect(()=>{
        timerId.current = setTimeout(()=>fnc.apply(undefined, deps), delay);

        return ()=>{
            if(timerId.current) clearTimeout(timerId.current);
        }
    },[deps])
}



export {useDebounce,useDebounceEffect};