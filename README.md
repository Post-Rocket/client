# PostRocket

(Github repo)[https://github.com/Post-Rocket/client]

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

## Tutorials

- https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html
- https://sudheer-baraker.medium.com/step-by-step-guide-hosting-a-static-website-on-aws-s3-660b81bea177
- https://dale-bingham-soteriasoftware.medium.com/creating-a-static-website-using-godaddy-github-aws-s3-codedeploy-and-aws-cloudfront-1990a8f4ddd8
- https://medium.com/@sbuckpesch/setup-aws-s3-static-website-hosting-using-ssl-acm-34d41d32e394
Endpoint: http://postrocket-website.s3-website.us-east-2.amazonaws.com
- https://medium.com/@Marklon/hosting-a-static-web-site-on-amazon-s3-a0f6888c8477
- https://jryancanty.medium.com/domain-by-godaddy-dns-by-route53-fc7acf2f5580


## AWS

[S3](https://us-east-2.console.aws.amazon.com/s3/buckets/postrocket-website)
[CloudFront](https://us-east-1.console.aws.amazon.com/cloudfront/v4/home?region=us-east-2#/distributions/EH9891BM3GXHI)
[ACM](https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/d56d20d1-1693-4e58-ae48-913023f4a661)
[Route 53](https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones?region=us-east-1#ListRecordSets/Z02022631HWUFQ8EW51A6)