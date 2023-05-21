/* eslint-disable prefer-spread */
import { useEffect, useRef, useState,DependencyList } from "react";


function useDebounce (value: string, delay: number) : string{
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

function useMediaQuery(maxWidth:number): boolean{
    const [isMobile, setIsMobile] = useState(false);

    useEffect(()=>{
        const mediaQuery = window.matchMedia(`(max-width:${maxWidth}px)`);
        setIsMobile(mediaQuery.matches);
        const handleMediaQueryChange = (event: MediaQueryListEvent)=> setIsMobile(event.matches);
        mediaQuery.addEventListener('change', handleMediaQueryChange);
        return ()=>{
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        }
    },[]);

    return isMobile;
}



export {useDebounce,useDebounceEffect, useMediaQuery};