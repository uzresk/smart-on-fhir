import {useEffect, useState} from "react";
import FHIR from 'fhirclient';
import {byCodes} from "fhirclient/lib/lib";

function Result() {

    // const {control, handleSubmit, errors} = useForm();

    const [age, setAge] = useState<string>();
    const [gender, setGender] = useState<string>();
    const [height, setHeight] = useState<string>();
    const [weight, setWeight] = useState<string>();

    useEffect(() => {
        FHIR.oauth2.ready().then((client) => {
            console.log("ready....")

            // 選択したユーザの情報を取得する
            client.request(`/Patient/${client.patient.id}`)
                .then(p => {
                    console.log(p);
                    setGender(p.gender);
                    setAge(calcAge(p.birthDate).toString(10));
                });
            // 身長・体重
            console.log(`patientid:${client.patient.id}`)
            client.request(`/Observation?subject=Patient/${client.patient.id}&code=http://loinc.org|8302-2,http://loinc.org|29463-7,http://loinc.org/52508-9`)
                .then(o => {
                    if (typeof o.entry != 'undefined') {
                        const observations = new Array(o.entry.length)
                        o.entry.forEach((ob: { resource: any; }) => observations.push(ob.resource));
                        const map = byCodes(observations, "code")
                        // console.log(map("8302-2"));
                        // console.log(map("29463-7"));
                        // console.log(map("52508-9")); // 握力
                        const height = getQuantityValueAndUnit(map("8302-2")[0]);
                        const weight = getQuantityValueAndUnit(map("29463-7")[0]);
                        setHeight(height);
                        setWeight(weight);
                    }
                });
        })
    }, [])

    return (
        <div>
            <ul>
                <li>Age: {age}</li>
                <li>Gender: {gender}</li>
                <li>{height}</li>
                <li>{weight}</li>
            </ul>
        </div>
    );

}

// Get numerical value and unit of observations
function getQuantityValueAndUnit(ob: any) {

    if (typeof ob != 'undefined' &&
        typeof ob.valueQuantity != 'undefined' &&
        typeof ob.valueQuantity.value != 'undefined' &&
        typeof ob.valueQuantity.unit != 'undefined') {

        return ob.valueQuantity.value.toFixed(1) + ' ' + ob.valueQuantity.unit;

    } else {
        return undefined;
    }
}

function calcAge(birthDay: string) {
    const birthDate = new Date(birthDay);
    // 文字列に分解
    const y2 = birthDate.getFullYear().toString().padStart(4, '0');
    const m2 = (birthDate.getMonth() + 1).toString().padStart(2, '0');
    const d2 = birthDate.getDate().toString().padStart(2, '0');

    // 今日の日付
    const today = new Date();
    const y1 = today.getFullYear().toString().padStart(4, '0');
    const m1 = (today.getMonth() + 1).toString().padStart(2, '0');
    const d1 = today.getDate().toString().padStart(2, '0');

    return Math.floor((Number(y1 + m1 + d1) - Number(y2 + m2 + d2)) / 10000);
}

export default Result;
