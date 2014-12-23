var udsUser = {
    "resource": {
        "fullName": "Smith, John",
        "email": [
            {
                "address": "jsmith@redhat.com",
                "addressType": "PRIMARY"
            },
            {
                "address": "jsmith@redhat.com",
                "addressType": "OTHER"
            }
        ],
        "sso": [
            "rhn-support-jsmith"
        ],
        "gss": true,
        "superRegion": "NA",
        "timezone": "America/New_York",
        "title": "Senior Software Maintenance Engineer",
        "firstName": "John",
        "lastName": "Smith",
        "aliasName": "JSmith",
        "kerberos": "jsmith",
        "salesforce": "jsmith@redhat.com",
        "bugzilla": "jsmith@redhat.com",
        "manager": {
            "resourceReliability": "Fresh",
            "externalModelId": "2345677BCD"
        },
        "isManager": false,
        "active": true,
        "created": "2011-02-16T18:49:57.000-05:00",
        "lastLogin": "2014-12-18T22:13:10.000-05:00",
        "lastModified": "2014-12-08T17:17:31.000-05:00",
        "outOfOffice": false,
        "roles": [
            {
                "resource": {
                    "name": "unified-sbr-coach-primary",
                    "description": "Primary SBR Coach",
                    "sbrs": [
                        "Web Services"
                    ]
                },
                "resourceReliability": "Fresh",
                "externalModelId": 21
            },
            {
                "resource": {
                    "name": "unified-sbr-coach-primary",
                    "description": "Primary SBR Coach",
                    "sbrs": [
                        "Web Services"
                    ],
                    "superRegion": "EMEA"
                },
                "resourceReliability": "Fresh",
                "externalModelId": 21
            }
            //{
            //    "resource": {
            //        "name": "unified-ssme",
            //        "description": "Senior Software Maintenance Engineer",
            //        "parentUser": {
            //            "resourceReliability": "Fresh",
            //            "externalModelId": "2345677BCD"
            //        },
            //        "parentRole": {
            //            "resource": {
            //                "name": "unified-manager",
            //                "description": "People Manager"
            //            },
            //            "resourceReliability": "Fresh",
            //            "externalModelId": 27
            //        },
            //        "superRegion": "NA"
            //    },
            //    "resourceReliability": "Fresh",
            //    "externalModelId": 34
            //}
        ],
        "sbrs": [
            "Web Services",
            "JBoss Base AS"
        ],
        "skillMatrixId": 7097
    },
    "resourceReliability": "Fresh",
    "externalModelId": "01234567ABC"
};

var userInstance = (
    <User resource={udsUser}></User>
);

React.render(userInstance, mountNode);