var user1 = {
    "resource": {
        "sbrs": [ "Web Services", "JBoss Base AS" ]
    },
    "resourceReliability": "Fresh",
    "externalModelId": "01234567ABC"
};
var user2 = {
    "resource": {
        "sbrs": [ "Red Hat Enterprise Linux", "Gluster" ]
    },
    "resourceReliability": "Fresh",
    "externalModelId": "01234567ABC"
};
var instance = (
    <div>
        <Sbrs sbrs={user1.resource.sbrs}></Sbrs>
        <div className="clearfix"></div>
        <Sbrs sbrs={user2.resource.sbrs}></Sbrs>
    </div>
);

React.render(instance, mountNode);