import React, { useEffect, useContext, useState } from "react";
import { AccountContext } from "./Account";
import ChangePassword from "./ChangePassword";
// import ChangeEmail from "./ChangeEmail";

export default () => {
    const [loggedIn, setLoggedIn] = useState(false);
    
    const { getSession } = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(() => {
                setLoggedIn(true);
        });
    }, []);

    return (
        <div>
            {loggedIn && (
                <>
                    <h2>Settings</h2>
                    <ChangePassword />
                    {/* <ChangeEmail /> */}
                </>
            )}
        </div>
    );
};