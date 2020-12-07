import {useEffect} from "react";
import FHIR from "fhirclient";

function LaunchEHR()  {
    useEffect(() => {

        console.log("launch....")
        FHIR.oauth2.authorize({
            'client_id': 'CLIENT_ID',
            'scope': 'patient/*.read launch online_access openid profile',
            'redirectUri': '/Result'
        });
    }, [])

    return (
        <div>
            Launch...
        </div>
    );

}
export default LaunchEHR;
