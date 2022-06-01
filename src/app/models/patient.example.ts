export class PatientExample {

    public patientsJson(): any {
        return {
            "resourceType": "Bundle",
            "id": "0f6da1c0-9bc2-4abe-9d46-0755291ffed5",
            "meta": {
                "lastUpdated": "2022-05-27T00:21:43.527+00:00"
            },
            "type": "searchset",
            "total": 2,
            "link": [
                {
                    "relation": "self",
                    "url": "http://fhiraux.herokuapp.com/fhir//Patient"
                }
            ],
            "entry": [
                {
                    "fullUrl": "http://fhiraux.herokuapp.com/fhir/Patient/3",
                    "resource": {
                        "resourceType": "Patient",
                        "id": "3",
                        "meta": {
                            "versionId": "3",
                            "lastUpdated": "2022-05-27T17:15:38.615+00:00",
                            "source": "#2304059d-a095-44"
                        },
                        "text": {
                            "status": "generated",
                            "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div class=\"hapiHeaderText\">John Freddy <b>BUITRAGO Q </b></div><table class=\"hapiPropertyTable\"><tbody><tr><td>Date of birth</td><td><span>14 December 1989</span></td></tr></tbody></table></div>"
                        },
                        "name": [
                            {
                                "family": "Buitrago",
                                "given": [
                                    "John Freddy"
                                ]
                            }
                        ],
                        "gender": "male",
                        "birthDate": "1989-12-13",
                        "extension": [{
                            "url": "http://fhiraux.herokuapp.com/fhir/Patient/email",
                            "valueCodeableConcept": {
                                "text": "john.buitrago@gmail.com"
                            }
                        }]
                    },
                    "search": {
                        "mode": "match"
                    }
                },
                {
                    "fullUrl": "http://fhiraux.herokuapp.com/fhir/Patient/5",
                    "resource": {
                        "resourceType": "Patient",
                        "id": "5",
                        "meta": {
                            "versionId": "1",
                            "lastUpdated": "2022-05-27T16:29:40.788+00:00",
                            "source": "#c868757d-f051-4a"
                        },
                        "text": {
                            "status": "generated",
                            "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div class=\"hapiHeaderText\">Judith <b>BACHILLER </b></div><table class=\"hapiPropertyTable\"><tbody><tr><td>Date of birth</td><td><span>24 February 1990</span></td></tr></tbody></table></div>"
                        },
                        "name": [
                            {
                                "family": "Bachiller",
                                "given": [
                                    "Judith"
                                ]
                            }
                        ],
                        "gender": "female",
                        "birthDate": "1990-02-24",
                        "extension": [{
                            "url": "http://fhiraux.herokuapp.com/fhir/Patient/email",
                            "valueCodeableConcept": {
                                "text": "judith.bachiller@gmail.com"
                            }
                        }]
                    },
                    "search": {
                        "mode": "match"
                    }
                }
            ]
        }
    }

    public patientsXml(): ElementXml[] {
        const bodyXml = [];
        bodyXml.push({ value: '<Bundle xmlns="http://hl7.org/fhir">', margin: 0 });
        bodyXml.push({ value: '<id value="8dfcacb5-2963-4a86-a0de-6ff2e3927c57"/>', margin: 20 });
        bodyXml.push({ value: '<meta>', margin: 20 });
        bodyXml.push({ value: '<lastUpdated value="2022-05-27T23:16:27.889+00:00"/>', margin: 40 });
        bodyXml.push({ value: '</meta>', margin: 20 });
        bodyXml.push({ value: '<type value="searchset"/>', margin: 20 });
        bodyXml.push({ value: '<total value="14"/>', margin: 20 });
        bodyXml.push({ value: '<link>', margin: 20 });
        bodyXml.push({ value: '<relation value="self"/>', margin: 40 });
        bodyXml.push({ value: '<url value="http://fhiraux.herokuapp.com/fhir/Patient"/>', margin: 40 });
        bodyXml.push({ value: '</link>', margin: 20 });
        bodyXml.push({ value: '<entry>', margin: 20 });
        bodyXml.push({ value: '<fullUrl value="http://fhiraux.herokuapp.com/fhir/Patient/3"/>', margin: 40 });
        bodyXml.push({ value: '<resource>', margin: 40 });
        bodyXml.push({ value: '<Patient xmlns="http://hl7.org/fhir">', margin: 60 });
        bodyXml.push({ value: '<id value="3"/>', margin: 80 });
        bodyXml.push({ value: '<meta>', margin: 80 });
        bodyXml.push({ value: '<versionId value="3"/>', margin: 100 });
        bodyXml.push({ value: '<lastUpdated value="2022-05-27T17:15:38.615+00:00"/>', margin: 100 });
        bodyXml.push({ value: '<source value="#2304059d-a095-44"/>', margin: 100 });
        bodyXml.push({ value: '</meta>', margin: 80 });
        bodyXml.push({ value: '<text>', margin: 80 });
        bodyXml.push({ value: '<status value="generated"/>', margin: 100 });
        bodyXml.push({ value: '<div xmlns="http://www.w3.org/1999/xhtml">', margin: 100 });
        bodyXml.push({ value: '<div class="hapiHeaderText">John Freddy                      ', margin: 120 });
        bodyXml.push({ value: '<b>BUITRAGO Q </b>', margin: 140 });
        bodyXml.push({ value: '</div>', margin: 120 });
        bodyXml.push({ value: '<table class="hapiPropertyTable">', margin: 120 });
        bodyXml.push({ value: '<tbody>', margin: 140 });
        bodyXml.push({ value: '<tr>', margin: 160 });
        bodyXml.push({ value: '<td>Date of birth</td>', margin: 180 });
        bodyXml.push({ value: '<td>', margin: 180 });
        bodyXml.push({ value: '<span>14 December 1989</span>', margin: 200 });
        bodyXml.push({ value: '</td>', margin: 180 });
        bodyXml.push({ value: '</tr>', margin: 160 });
        bodyXml.push({ value: '</tbody>', margin: 140 });
        bodyXml.push({ value: '</table>', margin: 120 });
        bodyXml.push({ value: '</div>', margin: 100 });
        bodyXml.push({ value: '</text>', margin: 80 });
        bodyXml.push({ value: '<name>', margin: 80 });
        bodyXml.push({ value: '<family value="Buitrago"/>', margin: 100 });
        bodyXml.push({ value: '<given value="John Freddy"/>', margin: 100 });
        bodyXml.push({ value: '</name>', margin: 80 });
        bodyXml.push({ value: '<gender value="male"/>', margin: 80 });
        bodyXml.push({ value: '<birthDate value="1989-12-14"/>', margin: 80 });
        bodyXml.push({ value: '<extension url="http://fhiraux.herokuapp.com/fhir/Patient/email">', margin: 80 });
        bodyXml.push({ value: `<valueCodeableConcept>`, margin: 100 });
        bodyXml.push({ value: `<text value="john.buitrago@gmail.com"/>`, margin: 120 });
        bodyXml.push({ value: `</valueCodeableConcept>`, margin: 100 });
        bodyXml.push({ value: `</extension>`, margin: 80 });
        bodyXml.push({ value: '</Patient>', margin: 60 });
        bodyXml.push({ value: '</resource>', margin: 40 });
        bodyXml.push({ value: '<search>', margin: 40 });
        bodyXml.push({ value: '<mode value="match"/>', margin: 60 });
        bodyXml.push({ value: '</search>', margin: 40 });
        bodyXml.push({ value: '</entry>', margin: 20 });
        bodyXml.push({ value: '<entry>', margin: 20 });
        bodyXml.push({ value: '<fullUrl value="http://fhiraux.herokuapp.com/fhir/Patient/5"/>', margin: 40 });
        bodyXml.push({ value: '<resource>', margin: 40 });
        bodyXml.push({ value: '<Patient xmlns="http://hl7.org/fhir">', margin: 60 });
        bodyXml.push({ value: '<id value="5"/>', margin: 80 });
        bodyXml.push({ value: '<meta>', margin: 80 });
        bodyXml.push({ value: '<versionId value="1"/>', margin: 100 });
        bodyXml.push({ value: '<lastUpdated value="2022-05-27T16:29:40.788+00:00"/>', margin: 100 });
        bodyXml.push({ value: '<source value="#c868757d-f051-4a"/>', margin: 100 });
        bodyXml.push({ value: '</meta>', margin: 80 });
        bodyXml.push({ value: '<text>', margin: 80 });
        bodyXml.push({ value: '<status value="generated"/>', margin: 100 });
        bodyXml.push({ value: '<div xmlns="http://www.w3.org/1999/xhtml">', margin: 100 });
        bodyXml.push({ value: '<div class="hapiHeaderText">Judith ', margin: 120 });
        bodyXml.push({ value: '<b>BACHILLER </b>', margin: 140 });
        bodyXml.push({ value: '</div>', margin: 120 });
        bodyXml.push({ value: '<table class="hapiPropertyTable">', margin: 120 });
        bodyXml.push({ value: '<tbody>', margin: 140 });
        bodyXml.push({ value: '<tr>', margin: 160 });
        bodyXml.push({ value: '<td>Date of birth</td>', margin: 180 });
        bodyXml.push({ value: '<td>', margin: 180 });
        bodyXml.push({ value: '<span>24 February 1990</span>', margin: 200 });
        bodyXml.push({ value: '</td>', margin: 180 });
        bodyXml.push({ value: '</tr>', margin: 160 });
        bodyXml.push({ value: '</tbody>', margin: 140 });
        bodyXml.push({ value: '</table>', margin: 120 });
        bodyXml.push({ value: '</div>', margin: 100 });
        bodyXml.push({ value: '</text>', margin: 80 });
        bodyXml.push({ value: '<name>', margin: 80 });
        bodyXml.push({ value: '<family value="Bachiller"/>', margin: 100 });
        bodyXml.push({ value: '<given value="Judith"/>', margin: 100 });
        bodyXml.push({ value: '</name>', margin: 80 });
        bodyXml.push({ value: '<gender value="female"/>', margin: 80 });
        bodyXml.push({ value: '<birthDate value="1990-02-24"/>', margin: 80 });
        bodyXml.push({ value: '<extension url="http://fhiraux.herokuapp.com/fhir/Patient/email">', margin: 80 });
        bodyXml.push({ value: `<valueCodeableConcept>`, margin: 100 });
        bodyXml.push({ value: `<text value="judith.bachiller@gmail.com"/>`, margin: 120 });
        bodyXml.push({ value: `</valueCodeableConcept>`, margin: 100 });
        bodyXml.push({ value: `</extension>`, margin: 80 });
        bodyXml.push({ value: '</Patient>', margin: 60 });
        bodyXml.push({ value: '</resource>', margin: 40 });
        bodyXml.push({ value: '<search>', margin: 40 });
        bodyXml.push({ value: '<mode value="match"/>', margin: 60 });
        bodyXml.push({ value: '</search>', margin: 40 });
        bodyXml.push({ value: '</entry>', margin: 20 });
        bodyXml.push({ value: '</Bundle>', margin: 0 });
        return bodyXml;
    }
}

interface ElementXml {
    value: string;
    margin: number;
}
