var commentResource=[
{
    "resource": {
    "text": "It seems working ok on limited testing:\n\nuid=1000(test) gid=1000(test) groups=1000(test) context=system_u:system_r:httpd_t:s0\n\nwhen running shell_exec('id') from PHP with mpm-itk and \"AssignUserID test test\" @ virtualhost definition. Need to do wider feature/load -testing but looks good so far.",
        "createdBy": {
        "resource": {
            "fullName": "Mattila, Toni"
        },
        "resourceReliability": "Fresh"
    },
    "lastModifiedBy": {
        "resource": {
            "fullName": "Mattila, Toni"
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