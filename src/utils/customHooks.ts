/* eslint-disable react-hooks/exhaustive-deps */
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
    },[...deps])
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function usePrevState (value: any): any{
	const ref = useRef(value);
	useEffect(()=>{
		ref.current = value;
	},[value]);

	return ref.current;
}

function useTextSelection (){
    const [selectionText, setSelectionText] = useState('');
    const [range, setRange] = useState<Range | null>(null);
    const [isSelecting, setIsSelecting] = useState<boolean>(false);

    useEffect(()=>{
        const handleGetSelection = ()=>{
            const selection = window.getSelection();
            
            if(selection && selection.toString().trim()){
                setSelectionText(JSON.parse(JSON.stringify(selection.toString().trim())));
                setRange(selection.getRangeAt(0));
            }else{
                setSelectionText('');
                setRange(null);
            }
        }

        const handleMouseDown = ()=> setIsSelecting(true);
        const handleMouseUp = ()=> setIsSelecting(false);

        document.addEventListener('selectionchange',handleGetSelection);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return ()=> {
            document.removeEventListener('selectionchange',handleGetSelection);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    },[]);

    return {
        selectionText,
        isSelecting,
        range
    }
}



export {useDebounce,useDebounceEffect, useMediaQuery, usePrevState, useTextSelection};