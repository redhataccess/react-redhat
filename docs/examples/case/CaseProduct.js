var input={
    "caseNumber": 1090296,

    "subject": "Test Subject",


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
    }

};


var instance = (
    <div>
        <CaseProduct case={input} key='product'></CaseProduct>
        
    </div>
);

React.render(instance, mountNode);