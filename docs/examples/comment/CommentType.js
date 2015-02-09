var commentResource=
    {
            "text": "It seems working ok on limited testing",
            "createdBy": {
                "resource": {
                    "fullName": "User, Test"
                },
                "resourceReliability": "Fresh"
            },
            "lastModifiedBy": {
                "resource": {
                    "fullName": "User, Test"
                },
                "resourceReliability": "Fresh"
            },
            "created": "2014-09-15T11:30:44.000Z",
            "lastModified": "2014-09-15T11:30:44.000Z",
            "public": true,
            "sbt": 21599
        };



var instance = (
    <div>
        <CommentType resource={commentResource}></CommentType>;
    </div>
);

React.render(instance, mountNode);