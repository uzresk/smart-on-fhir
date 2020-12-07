import {useEffect} from "react";
import FHIR from "fhirclient";

function LaunchStandalone()  {
    useEffect(() => {

        console.log("launch....")
        FHIR.oauth2.authorize({
            'fhirServiceUrl': 'https://launch.smarthealthit.org/v/r4/sim/eyJoIjoiMSIsImoiOiIxIn0/fhir',
            'patientId': '2cda5aad-e409-4070-9a15-e1c35c46ed5a',
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
export default LaunchStandalone;
