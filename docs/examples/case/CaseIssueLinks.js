var issueLinks=[
    {
        "resource": {
            "issueNumber": "10591431",
            "source": "Bugzilla",
            "summary": "Test Feature 1",
            "description": "Test Description"
        },
        "resourceReliability": "Fresh"
    }
];



var instance = (
    <div>
        <CaseIssueLinks issueLinks={issueLinks}></CaseIssueLinks>
        
    </div>
);

React.render(instance, mountNode);