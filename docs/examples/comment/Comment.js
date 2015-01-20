var commentResource=[
{
    "resource": {
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
  },
    "resourceReliability": "Fresh",
    "externalModelId": "a0aA000000CZco6IAD"
}];
var comment=[];
comment.resource=commentResource[0].resource;
var instance = (
    <div>
        <Comment id="a0aA000000CZco6IAD" key="a0aA000000CZco6IAD" comment={comment}></Comment>
    </div>
);

React.render(instance, mountNode);