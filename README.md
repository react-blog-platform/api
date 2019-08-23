React-blog-Api
==================================
[![Build Status](https://travis-ci.org/react-blog-platform/api.svg?branch=master)](https://travis-ci.org/react-blog-platform/api)
[![GitHub issues](https://img.shields.io/github/issues/react-blog-platform/api)](https://github.com/react-blog-platform/api/issues)
[![GitHub license](https://img.shields.io/github/license/react-blog-platform/api)](https://github.com/react-blog-platform/api/blob/master/LICENSE)
[![Build Status](https://img.shields.io/badge/blog-open--source-brightgreen)](https://travis-ci.org/react-blog-platform/api)

Support By:
---------------

- ES6 support via [babel](https://babeljs.io)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)


Getting Started
---------------

```sh
# clone it
git clone git@github.com:react-blog-platform/api.git
cd api

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start
```
Docker Support
------
```sh
cd express-es6-rest-api

# Build your docker
docker build -t es6/api-service .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 es6/api-service
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   

```

License
-------

MIT
