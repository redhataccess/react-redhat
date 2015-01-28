var owner= {
    "resource": {
        "fullName": "Test User",
        "email": [
            {
                "address": "test@test.com",
                "addressType": "PRIMARY"
            },
            {
                "address": "test1@test.com  ",
                "addressType": "OTHER"
            },
            {
                "address": "test2@test.com",
                "addressType": "OTHER"
            }
        ],
        "sso": [
            "test1@test.com",
            "test1"
        ],
        "gss": true,
        "superRegion": "EMEA",
        "timezone": "Europe/London",
        "title": "Technical Support Engineer",
        "firstName": "User",
        "lastName": "Test",
        "aliasName": "Test",
        "kerberos": "Test",
        "salesforce": "test@test.com",
        "bugzilla": "test@test.com",
        "manager": {
            "resourceReliability": "Fresh",
            "externalModelId": "005A000000NLIA2"
        },
        "isManager": false,
        "active": true,
        "country": "Test",
        "city": "test city",
        "street": "65 test Avenue",
        "postalCode": "544333",
        "created": "2013-02-05T17:04:48.000-05:00",
        "lastLogin": "2015-01-23T00:54:57.000-05:00",
        "lastModified": "2015-01-05T01:10:59.000-05:00",
        "costCenter": {
            "resource": {
                "name": "104"
            },
            "resourceReliability": "Fresh",
            "externalModelId": 104
        },
        "outOfOffice": false,
        "roles": [
            {
                "resource": {
                    "name": "test",
                    "description": "Technical Support Engineer",
                    "parentUser": {
                        "resourceReliability": "Fresh",
                        "externalModelId": "005A00000036NNLIA2"
                    },
                    "parentRole": {
                        "resource": {
                            "name": "test-manager",
                            "description": "People Manager"
                        },
                        "resourceReliability": "Fresh",
                        "externalModelId": 27
                    },
                    "superRegion": "EMEA"
                },
                "resourceReliability": "Fresh",
                "externalModelId": 29
            },
            {
                "resource": {
                    "name": "test-fl",
                    "description": "Front Line Support",
                    "parentUser": {
                        "resourceReliability": "Fresh",
                        "externalModelId": "005A00000036NNLIA2"
                    },
                    "superRegion": "EMEA"
                },
                "resourceReliability": "Fresh",
                "externalModelId": 18
            }
        ],
        "skillMatrixId": 3621
    },
    "resourceReliability": "Fresh",
    "externalModelId": "005A0000003Vlkl"
};

var caseAssociates=   [
    {
        "resource": {
            "role": "Observer",
            "associate": {
                "resource": {
                    "fullName": "Associate, test",
                    "email": [
                        {
                            "address": "associate@test.com",
                            "addressType": "PRIMARY"
                        },
                        {
                            "address": "associate@test.com",
                            "addressType": "OTHER"
                        }
                    ],
                    "sso": [
                        "rhn-test-user"
                    ],
                    "gss": true,
                    "superRegion": "NA",
                    "timezone": "America/New_York",
                    "title": "Senior Technical Support Engineer",
                    "firstName": "Associate",
                    "lastName": "Test",
                    "aliasName": "Test1",
                    "kerberos": "test1",
                    "salesforce": "test@test.com",
                    "bugzilla": "test@test.com",
                    "manager": {
                        "resourceReliability": "Fresh",
                        "externalModelId": "005A0000000gcA"
                    },
                    "isManager": false,
                    "active": true,
                    "created": "2011-12-15T01:20:32.000-05:00",
                    "lastLogin": "2015-01-23T21:08:35.000-05:00",
                    "lastModified": "2015-01-05T08:40:23.000-05:00",
                    "costCenter": {
                        "resource": {
                            "name": "104"
                        },
                        "resourceReliability": "Fresh",
                        "externalModelId": 104
                    },
                    "outOfOffice": false,
                    "roles": [
                        {
                            "resource": {
                                "name": "test",
                                "description": "test",
                                "sbrs": [
                                    "test"
                                ],
                                "superRegion": "NA"
                            },
                            "resourceReliability": "Fresh",
                            "externalModelId": 21
                        },
                        {
                            "resource": {
                                "name": "test-stse",
                                "description": "Senior Technical Support Engineer",
                                "parentUser": {
                                    "resourceReliability": "Fresh",
                                    "externalModelId": "005A0000000gciyIAA"
                                },
                                "parentRole": {
                                    "resource": {
                                        "name": "test-manager",
                                        "description": "People Manager"
                                    },
                                    "resourceReliability": "Fresh",
                                    "externalModelId": 27
                                },
                                "superRegion": "NA"
                            },
                            "resourceReliability": "Fresh",
                            "externalModelId": 30
                        },
                        {
                            "resource": {
                                "name": "test-fl",
                                "description": "Front Line Support",
                                "parentUser": {
                                    "resourceReliability": "Fresh",
                                    "externalModelId": "005A0000gciyIAA"
                                },
                                "superRegion": "NA"
                            },
                            "resourceReliability": "Fresh",
                            "externalModelId": 18
                        }
                    ],
                    "skillMatrixId": 6883
                },
                "resourceReliability": "Fresh",
                "externalModelId": "005A00002Za0fIAC"
            }
        },
        "resourceReliability": "Fresh"
    },
    {
        "resource": {
            "role": "Observer",
            "associate": {
                "resource": {
                    "fullName": "User, Observer",
                    "email": [
                        {
                            "address": "observer@test.com",
                            "addressType": "PRIMARY"
                        },
                        {
                            "address": "observer@test.com",
                            "addressType": "OTHER"
                        }
                    ],
                    "sso": [
                        "observer"
                    ],
                    "gss": true,
                    "superRegion": "LATAM",
                    "timezone": "America/Sao_Paulo",
                    "title": "Senior Technical Support Engineer",
                    "firstName": "test",
                    "lastName": "Observer",
                    "aliasName": "testtt",
                    "kerberos": "testtt",
                    "salesforce": "observer@test.com",
                    "bugzilla": "observer@test.com",
                    "manager": {
                        "resourceReliability": "Fresh",
                        "externalModelId": "005A0000gclEIAQ"
                    },
                    "isManager": false,
                    "active": true,
                    "country": "test",
                    "city": "test city",
                    "created": "2011-04-12T08:43:08.000-04:00",
                    "lastLogin": "2015-01-23T03:09:20.000-05:00",
                    "lastModified": "2015-01-05T04:08:38.000-05:00",
                    "costCenter": {
                        "resource": {
                            "name": "104"
                        },
                        "resourceReliability": "Fresh",
                        "externalModelId": 104
                    },
                    "outOfOffice": false,
                    "roles": [
                        {
                            "resource": {
                                "name": "test-stse",
                                "description": "Senior Technical Support Engineer",
                                "parentUser": {
                                    "resourceReliability": "Fresh",
                                    "externalModelId": "005A00gclEIAQ"
                                },
                                "parentRole": {
                                    "resource": {
                                        "name": "unified-manager",
                                        "description": "People Manager"
                                    },
                                    "resourceReliability": "Fresh",
                                    "externalModelId": 27
                                },
                                "superRegion": "LATAM"
                            },
                            "resourceReliability": "Fresh",
                            "externalModelId": 30
                        },
                        {
                            "resource": {
                                "name": "test-fl",
                                "description": "Front Line Support",
                                "parentUser": {
                                    "resourceReliability": "Fresh",
                                    "externalModelId": "005A00gclEIAQ"
                                },
                                "superRegion": "LATAM"
                            },
                            "resourceReliability": "Fresh",
                            "externalModelId": 18
                        }
                    ],
                    "skillMatrixId": 6863
                },
                "resourceReliability": "Fresh",
                "externalModelId": "005A0000001qAbU"
            }
        },
        "resourceReliability": "Fresh"
    }

];


var instance = (
    <div>
        <CaseAssociates owner={owner} associates={caseAssociates}></CaseAssociates>
        
    </div>
);

React.render(instance, mountNode);