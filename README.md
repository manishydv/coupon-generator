# Coupon Generator

General Information
[Coupon Generator] The Coupon Generator is node js project which build static coupon.

### Version info
node    : v14.18.1
npm     : 6.14.15
eslint  : 8.0.1
express : 4.16.1

### To install dependencies
```sh
$ npm install
```

### To start server in dev mode
```sh
$ npm run dev
```
### To stop server in dev mode
```sh
$ Ctrl + c
```

### To start server in prod mode
Login to hosted server and navigate to project path.
CMD: cd /var/www/loanquoPortal
then run hit the shell CMD to run server in background.
```sh
$ NODE_ENV=production forever start bin/www
```

### To stop server in prod mode
```sh
$ forever stop 0
```

### Additional code-format with eslint setup

1) Add extension on IDE (VS-Code) first.
   Name         :  ESLint -- publisher:"Dirk Baeumer"
   extension ID :  dbaeumer.vscode-eslint

2) install dev dependencies
```sh
$  npm install --only=dev
```

-----------------------------------------------------------------------------------------------------------------------------------------------

## input Form
![image](https://github.com/manishydv/coupon-generator/assets/51132893/489a696f-9f27-49d7-b1f2-9508b99917cc)

## Output PDF
![image](https://github.com/manishydv/coupon-generator/assets/51132893/8be1c2f5-2fd4-43a5-845e-ddca83ee0e98)


## Overview

The Coupon Generator is a versatile tool for creating coupon. 
This project simplifies the process of generating static unique coupon codes, customizing their attributes, and tracking their usage. Whether you're a business owner, marketer, or developer, this tool can be a valuable addition to your coupon management toolkit.

## Features

- Generate unique coupon codes with customizable patterns and formats.
- Specify coupon attributes, such as discount percentages, expiration dates, and usage limits.
- Export coupons to various formats (PDF) for easy distribution.
- Track and analyze coupon usage to evaluate the success of your campaigns.
- Secure and reliable coupon code generation to prevent fraud.

## Getting Started

To get started with the Coupon Generator, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/coupon-generator.git
