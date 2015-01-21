var openUser = function(user) {
  alert("You clicked on " + user.resource.fullName + "!");
};

var userSearchInstance = (
    <UserSearch openUser={openUser}></UserSearch>
);

React.render(userSearchInstance, mountNode);