var caseInstance= {
    "resource": {
        "caseNumber": "01339953",
        "status": "Waiting on Red Hat",
        "internalStatus": "Waiting on QA",
        "severity": "2 (High)",
        "internalPriority": "3 (Normal)",
        "sbrs": [
            "testxyz"
        ],
        "subject": "testing this",
        "description": "Test Description",
        "summary": "Test Summary",
        "sbt": 13098,
        "created": "2014-05-06T11:08:52.000Z",
        "lastModified": "2015-01-27T00:32:26.000Z",
        "account": {
            "resource": {
                "accountNumber": 1381777,
                "accountName": "dvdfd",
                "superRegion": "fdfds",
                "isActive": true,
                "strategic": false,
                "hasSRM": false,
                "hasTAM": false,
                "specialHandlingRequired": false
            },
            "resourceReliability": "Fresh",
            "externalModelId": "001A000000SPOIzIAP"
        },
        "product": {
            "resource": {
                "line": {
                    "resource": {
                        "name": "Test Product",
                        "family": "PLATFORM"
                    },
                    "resourceReliability": "Fresh",
                    "externalModelId": 265
                },
                "version": {
                    "resource": {
                        "name": "7.0"
                    },
                    "resourceReliability": "Fresh",
                    "externalModelId": 11848
                }
            },
            "resourceReliability": "Fresh"
        },
        "isTAMCase": false,
        "isFTSCase": false,
        "isCustomerEscalation": false,
        "tags": [
            "memory"
        ],
        "owner": {
            "resource": {
                "fullName": "User, Test",
                "email": [
                    {
                        "address": "test@redhat.com",
                        "addressType": "PRIMARY"
                    },
                    {
                        "address": "test@redhat.com",
                        "addressType": "OTHER"
                    },
                    {
                        "address": "test@redhat.com",
                        "addressType": "OTHER"
                    }
                ],
                "sso": [
                    "test@redhat.com",
                    "test"
                ],
                "gss": true,
                "superRegion": "EMEA",
                "timezone": "Europe/London",
                "title": "Technical Support Engineer",
                "firstName": "test",
                "lastName": "user",
                "aliasName": "test",
                "kerberos": "test",
                "salesforce": "test@redhat.com",
                "bugzilla": "test@redhat.com",
                "manager": {
                    "resourceReliability": "Fresh",
                    "externalModelId": "005A0036NNLIA2"
                },
                "isManager": false,
                "active": true,
                "country": "United Kingdom",
                "city": "test city",
                "street": "123 test avenue",
                "postalCode": "G5433",
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
                            "name": "test-tse",
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
            "externalModelId": "005A0000003VlklIAC"
        },
        "caseAssociates": [
            {
                "resource": {
                    "role": "Observer",
                    "associate": {
                        "resource": {
                            "fullName": "Associate Test",
                            "email": [
                                {
                                    "address": "associate@redhat.com",
                                    "addressType": "PRIMARY"
                                },
                                {
                                    "address": "associate@redhat.com",
                                    "addressType": "OTHER"
                                }
                            ],
                            "sso": [
                                "associate"
                            ],
                            "gss": true,
                            "superRegion": "NA",
                            "timezone": "America/New_York",
                            "title": "Senior Technical Support Engineer",
                            "firstName": "ASsocaite",
                            "lastName": "User",
                            "aliasName": "associate",
                            "kerberos": "associate",
                            "salesforce": "associate@redhat.com",
                            "bugzilla": "associagte@redhat.com",
                            "manager": {
                                "resourceReliability": "Fresh",
                                "externalModelId": "005A0000000gciyIAA"
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
                                        "name": "rerwe",
                                        "description": "Primary SBR Coach",
                                        "sbrs": [
                                            "Webservers"
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
                                                "name": "trest-manager",
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
                                            "externalModelId": "005A0000000gciyIAA"
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
                        "externalModelId": "005A0000002Za0fIAC"
                    }
                },
                "resourceReliability": "Fresh"
            },
            {
                "resource": {
                    "role": "Observer",
                    "associate": {
                        "resource": {
                            "fullName": "User, Associate1",
                            "email": [
                                {
                                    "address": "associate1@redhat.com",
                                    "addressType": "PRIMARY"
                                },
                                {
                                    "address": "associate1@redhat.com",
                                    "addressType": "OTHER"
                                }
                            ],
                            "sso": [
                                "associate1"
                            ],
                            "gss": true,
                            "superRegion": "LATAM",
                            "timezone": "America/Sao_Paulo",
                            "title": "Senior Technical Support Engineer",
                            "firstName": "Associate1",
                            "lastName": "test",
                            "aliasName": "test",
                            "kerberos": "test",
                            "salesforce": "test@redhat.com",
                            "bugzilla": "test@redhat.com",
                            "manager": {
                                "resourceReliability": "Fresh",
                                "externalModelId": "005A0000000gclEIAQ"
                            },
                            "isManager": false,
                            "active": true,
                            "country": "Brazil",
                            "city": "test",
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
                                        "name": "unified-stse",
                                        "description": "Senior Technical Support Engineer",
                                        "parentUser": {
                                            "resourceReliability": "Fresh",
                                            "externalModelId": "005A0000000gclEIAQ"
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
                                        "name": "unified-fl",
                                        "description": "Front Line Support",
                                        "parentUser": {
                                            "resourceReliability": "Fresh",
                                            "externalModelId": "005A0000000gclEIAQ"
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
                        "externalModelId": "005A0000001qAbRIAU"
                    }
                },
                "resourceReliability": "Fresh"
            }
        ],
        "resourceLinks": [
            {
                "resource": {
                    "resourceId": 4027734,
                    "resourceType": "KnowledgeBaseSolution",
                    "attached": "2014-05-06T14:02:21.000Z",
                    "resourceStatus": "Proposed",
                    "title": "test"
                },
                "resourceReliability": "Fresh"
            },
            {
                "resource": {
                    "resourceId": 36817763,
                    "resourceType": "KnowledgeBaseSolution",
                    "attached": "2014-05-06T11:08:53.000Z",
                    "resourceStatus": "Proposed",
                    "title": "test 456"
                },
                "resourceReliability": "Fresh"
            },
            {
                "resource": {
                    "resourceId": 2555010,
                    "resourceType": "KnowledgeBaseSolution",
                    "attached": "2014-05-06T14:02:26.000Z",
                    "resourceStatus": "Proposed",
                    "title": "test 34"
                },
                "resourceReliability": "Fresh"
            },
            {
                "resource": {
                    "resourceId": 6255296,
                    "resourceType": "KnowledgeBaseSolution",
                    "attached": "2014-05-06T11:08:53.000Z",
                    "resourceStatus": "Proposed",
                    "title": "test 65444'"
                },
                "resourceReliability": "Fresh"
            },
            {
                "resource": {
                    "resourceId": 283123,
                    "resourceType": "KnowledgeBaseSolution",
                    "attached": "2014-05-06T11:08:53.000Z",
                    "resourceStatus": "Proposed",
                    "title": "test 5432"
                },
                "resourceReliability": "Fresh"
            }
        ],
        "issueLinks": [
            {
                "resource": {
                    "issueNumber": "1059143",
                    "source": "Bugzilla",
                    "summary": "Feature request: update",
                    "description": "test"
                },
                "resourceReliability": "Fresh"
            }
        ],
        "collaborationScore": 1176,
        "hoursSinceLastPublicComment": 141
    },
    "resourceReliability": "Fresh",
    "externalModelId": "500A000J6beAIAR"
};

var instance = (
    <div>
        <CaseHeader case={caseInstance} key='caseHeader'></CaseHeader>
        
    </div>
);

React.render(instance, mountNode);