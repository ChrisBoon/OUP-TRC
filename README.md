# TRC

This repository contains the codebase for the OPD TRC design. We went straight from low-fidelity wireframes to building a prototype in code. This allowed us to do all design work in code, so everything was responsive and browser tested from the start. It also allowed us to hand over complete HTML structure and CSS to the developer so they only needed to rewrite the JS logic (this was one of my first Angular projects and wasn't going to be used in production so it was a bit hacked together) and add in features such as Authentication, database, etc.

I've since rebuilt the prototype in React to use as a basis for a new product we are prototyping.

## Build info

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.14.0.

### Build & development

Run `grunt` for building and `grunt serve` for preview.

### Testing

Running `grunt test` will run the unit tests with karma.
