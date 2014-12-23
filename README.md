# react-redhat

React components for various web applications within Red Hat.  

[Bootstrap 3](http://getbootstrap.com) components built with [React](http://facebook.github.io/react/)

Under active development - APIs will change.

## Authors

- [Samuel Mendenhall](https://github.com/engineersamuel)

## Related modules

- [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)

## Contributions

For rapid development I recommend having the test-watch and docs/ start npm actions running

- Run `npm install`, `npm run test-watch` to run tests while you develop (however this hides any build errors, you can see these with `grunt build`)
- In the docs directory run `npm run start` to run the components site which will be reloaded whenver the react-redhat code changes.  This will help in visually verifying behavior.  You can locally see changes @ [http://localhost:4000/components.html](http://localhost:4000/components.html)
- Add tests for any new or changed functionality
- Follow existing style
