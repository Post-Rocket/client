# PostRocket

## Add/Update utilities submodule

See [utilities repo README.md](https://github.com/Post-Rocket/utilities?tab=readme-ov-file#instaling-as-a-github-submodule).

## Launch Chrome without CORS check

On Mac:

    open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

On Linux:

    google-chrome --disable-web-security --allow-file-access-from-files

On Windows:

    chrome.exe --disable-web-security

## Webpack

    npx webpack --config webpack.config.js

Note: you may need to sudo the command line.

## S3

Tutorials:
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html
- https://sudheer-baraker.medium.com/step-by-step-guide-hosting-a-static-website-on-aws-s3-660b81bea177
- https://medium.com/@sbuckpesch/setup-aws-s3-static-website-hosting-using-ssl-acm-34d41d32e394
Endpoint: http://postrocket-website.s3-website.us-east-2.amazonaws.com 
