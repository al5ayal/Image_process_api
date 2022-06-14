# Image Processing API

Upload and resize images.

## Installation

install using npm or yarn.

```bash
npm install
```

## Available Scripts
### Build and start server from the build directory
```bash
npm run start
```
### Starting dev server from src folder
```bash
npm run sev
```
### Build The project (default output build folder in the root directory)
```bash
npm run buil
```
### Unit Testing
```bash
npm run test
```

## Main End Points
### GET / End Point the project root URL
It has simple landing page allows you to upload your own images and
consume the project resize API.
### POST /api/images/upload Uploading images end Point
upload images and give you back the url to use for the original size.
### GET /api/images the Images End pint
which needs at least one get parameter (filename) to function file name is mandatory E.g. /api/images?filename=filename.jpg.
note that filename is available with or without extension (default is jpg for now)
### GET /api/images?filename=filename&width=number&height=number
is the resizing api end point

## Tests Avaiable
### Test All above end Points
#### Test/api/images?filename=filename&width=number&height=number end pint
different scenarios for this end point is already tested you can check it.
Validations tests such as testing whether width or height provided and each has valid value.
#### Test /api/images/upload endpoint
uploading file [uploadtest.jpg] which is available in the public/images folder

## Dependencies used
### expressjs
### ejs template parser
### Sharp for image processing
### multer for files upload
### supertest for testing end points
### jasmine for unit testing
### morgan for logging requested urls in console while server is running
### Others Included