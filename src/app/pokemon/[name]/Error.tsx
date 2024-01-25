import React from "react";

export const Error = ({name}: {name: string}) =>{

    return <div>
        <p>Error 404 </p>
        <p>the {name} is no include in our website</p>
    </div>
}
