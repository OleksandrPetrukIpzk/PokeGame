import Button from "@mui/joy/Button";
import React, {Dispatch, SetStateAction} from "react";

export const ControlButtons = ({previousUrl, setBaseUrl, setIsLoaded, nextUrl}: {previousUrl: string, setBaseUrl: Dispatch<SetStateAction<string>>,setIsLoaded: Dispatch<SetStateAction<boolean>>, nextUrl: string}) =>{

    return (<div className={'w-max flex gap-3 items-center m-auto'}>
        <Button
            color="success"
            loading={false}
            onClick={() => {
                setBaseUrl(previousUrl);
                setIsLoaded(false);
            }}
            size="md"
            variant="solid"
            disabled={!previousUrl}
        >Prev</Button>
        <Button
            color="success"
            loading={false}
            onClick={() => {
                setBaseUrl(nextUrl);
                setIsLoaded(false);
            }
            }
            size="md"
            variant="solid"
            disabled={!nextUrl}
        >Next</Button>
    </div>)
}
