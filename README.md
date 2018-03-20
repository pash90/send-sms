This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Please read the instructions there for how-tos and troubleshooting.

## Dependencies
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-redux](https://www.npmjs.com/package/react-redux)
- [react-router-redux](https://www.npmjs.com/package/react-router-redux)
- [redux](https://www.npmjs.com/package/redux)
- [react-scripts-ts](https://www.npmjs.com/package/react-scripts-ts)
- [history](https://www.npmjs.com/package/history)
- [redux-devtools-extension](https://www.npmjs.com/package/redux-devtools-extension)
- [axios](https://www.npmjs.com/package/axios)
- [node-sass-chokidar](https://www.npmjs.com/package/node-sass-chokidar) (_for SASS support_)
- [npm-run-all](https://www.npmjs.com/package/npm-run-all) (_for SASS support_)
- [normalize-url](https://www.npmjs.com/package/normalize-url)
- [string-url-extractor](https://www.npmjs.com/package/string-url-extractor)
- [react-spinners](https://www.npmjs.com/package/react-spinners)
- [redux-form](https://www.npmjs.com/package/redux-form)

## Get Started
1. Clone the repo
2. Go to `/node_modules/webpack-dev-server/ssl/`
    - Create a file `server.pem` or run `npm start` to have it auto generated.
    - Copy in the credentials from any valid SSL certificate and key. This step is important since all the APIs require HTTPS connections
    - Stop the local server
3. Go to `/.env`
    - Update all the tokens and parameters you wish. All of them are self explanatory
4. Run `npm start` to test it out!

## Important
This project uses Firebase Functions to get around the CORS for the BurstSMS API. Although not secure(_since a user can see the API tokens_), it satisfies the requirement of configurable tokens.

All the tokens required are set in the `.env` file and they are ones used for data. No token/parameter is hard coded in this project.

FYI : I could've added `.env` file to `.gitignore` but BurstSMS credentials are temporary and the Bitly Access Token is a generic token(and free)