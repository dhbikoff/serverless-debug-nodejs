# Serverless Debug NodeJS POC
A proof of concept for attaching a debugger to a lambda running in AWS.

## How It Works
We use a custom Lambda runtime to open a tcp tunnel with ngrok and start nodejs with debugging enabled.

## Setup
* Register for a free ngrok account at https://dashboard.ngrok.com/signup
* Get your ngrok auth token here https://dashboard.ngrok.com/auth
* Add the ngrok config file to `./debug_layer/bin/ngrok.yaml`
  * See the example ngrok config file `./debug_layer/bin/ngrok.yaml.example` for formatting

## Deploy
`$ sls deploy`

## Execute and Debug
* `$ sls invoke -f runTest -d '{"foo": "bar"}'`
* Go to the ngrok dashboard and find your tunnel address https://dashboard.ngrok.com/status
* Open the chrome debugger [chrome://inspect/#devices](chrome://inspect/#devices "chrome://inspect/#devices")
* Click `Open dedicated DevTools for Node` and then `Add Connection`
  * Do not include the tcp protocol when pasting the connection, ex. `0.tcp.ngrok.io:18160`
* The debugger should connect automatically and hit the top level breakpoint
* Click the play button to move to the next breakpoint, which is preconfigured to stop when the handler file has been loaded
* Your lambda function package will be located under `file://var/task`

## Known Issues
* When you invoke your lambda the first time, the ngrok tunnel address may change a few times.
You should refresh the ngrok dashboard a few times until the address seems stable.
If you can't connect, go back to your dashboard and check if the address has changed.
* If the ngrok process dies, you'll have to redeploy to force the running lambda to stop or wait for AWS to kill it for you.

