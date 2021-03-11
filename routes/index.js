var express = require('express');
var router = express.Router();
const path = require('path');
var fs = require('fs');
var pdf = require('html-pdf');
const { v4: uuidv4 } = require('uuid');


//  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
//  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
//  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
    res.render('test', { title: 'Express' });
});

router.post('/api/v1/generatepdf', function(req, res, next) {
    console.log('request for genrate coupon pdf');
    var inputs = req.body;
    // {customer_no: '11129744', order_no: '14515781', date: '03/13/2021', valid_date: '2021-03-12T18:30:00.000Z', coupon_code: 'GS7CTYE3'}
    if (inputs.customer_no == undefined || inputs.customer_no == "") {
        return res.status(300).json({ status: 300, message: 'customer no is required' });
    } else if (inputs.order_no == undefined || inputs.order_no == "") {
        return res.status(300).json({ status: 300, message: 'order no is required' });
    } else if (inputs.valid_date == undefined || inputs.valid_date == "") {
        return res.status(300).json({ status: 300, message: 'valid until date is required' });
    } else if (inputs.coupon_code == undefined || inputs.coupon_code == "") {
        return res.status(300).json({ status: 300, message: 'coupon code is required' });
    }

    var html = getPDFHTMLContent(inputs);
    var options = { format: 'A4' };

    var appDir = path.dirname(require.main.path.replace(/\bin/g, ""));
    var id = uuidv4();
    var fileName = id + '_file.pdf';

    pdf.create(html, options).toFile('./uploads/' + fileName, function(err, response) {
        if (err) return res.send({ status: 300, msg: 'something went wrong.' });
        res.send({ status: 200, file: fileName });
    });
});

router.get('/api/v1/download', function(req, res, next) {
    console.log('request for download coupon pdf');
    var filename = req.url.split('?')[1].split('=')[1];
    // var filename = 'test123.pdf';
    if (filename == undefined || filename == "") {
        return res.status(300).json({ status: 300, message: 'invaild request' });
    }
    var appDir = path.dirname(require.main.path.replace(/\bin/g, ""));
    console.log(`${appDir}/uploads/${filename}`);
    res.download(`${appDir}/uploads/${filename}`, filename);

});

module.exports = router;


function getPDFHTMLContent(inputs) {
    var customer_no = inputs.customer_no;
    var order_no = inputs.order_no;
    var customer_no = inputs.customer_no;
    var temp = new Date(inputs.valid_date);
    var valid_date = temp.getDate() + '/' + temp.getMonth() + '-' + temp.getFullYear();
    var coupon_code = inputs.coupon_code;

    var css = `html {
        height: 100%;
    }
    
    body {
        /* to centre page on screen*/
        margin-left: auto;
        margin-right: auto;
        font-family: 'Lato' !important;
        padding: 10px;
        height: 100%;
        overflow: hidden;
    }
    
    *,
    *::after {
        box-sizing: border-box;
        margin: 0;
    }
    
    body {
        color: #454f54;
        background-color: #f4f5f6;
        background-image: linear-gradient(to bottom left, #abb5ba, #d5dadd);
    }
    
    .ticket {
        display: grid;
        grid-template-rows: auto 1fr auto;
        max-width: 24rem;
    }
    
    .ticket__header,
    .ticket__body,
    .ticket__footer {
        padding: 1.25rem;
        background-color: white;
        border: 1px solid #abb5ba;
        box-shadow: 0 2px 4px rgba(41, 54, 61, 0.25);
    }
    
    .ticket__header {
        font-size: 1.5rem;
        border-top: 0.25rem solid #dc143c;
        border-bottom: none;
        box-shadow: none;
    }
    
    .ticket__wrapper {
        box-shadow: 0 2px 4px rgba(41, 54, 61, 0.25);
        border-radius: 0.375em 0.375em 0 0;
        overflow: hidden;
    }
    
    .ticket__divider {
        position: relative;
        height: 1rem;
        background-color: white;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
    
    .ticket__divider::after {
        content: "";
        position: absolute;
        height: 50%;
        width: 100%;
        top: 0;
        border-bottom: 2px dashed #e9ebed;
    }
    
    .ticket__notch {
        position: absolute;
        left: -0.5rem;
        width: 1rem;
        height: 1rem;
        overflow: hidden;
    }
    
    .ticket__notch::after {
        content: "";
        position: relative;
        display: block;
        width: 2rem;
        height: 2rem;
        right: 100%;
        top: -50%;
        border: 0.5rem solid white;
        border-radius: 50%;
        box-shadow: inset 0 2px 4px rgba(41, 54, 61, 0.25);
    }
    
    .ticket__notch--right {
        left: auto;
        right: -0.5rem;
    }
    
    .ticket__notch--right::after {
        right: 0;
    }
    
    .ticket__body {
        border-bottom: none;
        border-top: none;
    }
    
    .ticket__body>*+* {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid #e9ebed;
    }
    
    .ticket__section>*+* {
        margin-top: 0.25rem;
    }
    
    .ticket__section>h3 {
        font-size: 1.125rem;
        margin-bottom: 0.5rem;
    }
    
    .ticket__header,
    .ticket__footer {
        font-weight: bold;
        font-size: 1.25rem;
        display: flex;
        justify-content: space-between;
    }
    
    .ticket__footer {
        border-top: 2px dashed #e9ebed;
        border-radius: 0 0 0.325rem 0.325rem;
    }`;
    var html = `<article class="ticket">
    <header class="ticket__wrapper">
        <div class="ticket__header">
        <h1 class="display-4 ls-15 text-upper" style="text-transform: uppercase;font-size: 3.5rem;font-weight: 300;line-height: 1.2;">MYRONJA</h1>
        <p class="text-muted ls-5 text-upper" style="text-transform: uppercase;letter-spacing: 5px;color: #6c757d;">ELEGANEWITHAGLOW</p>
        </div>
    </header>
    <div class="ticket__divider">
        <div class="ticket__notch"></div>
        <div class="ticket__notch ticket__notch--right"></div>
    </div>
    <div class="ticket__body">
        <section class="ticket__section">
            <p>Customer No : ${customer_no}</p>
            <p>Order No : ${order_no}</p>
            <p>Valid Until : ${valid_date}</p>
            <p>Gift Code : ${coupon_code}</p>
            <p>Your seats are together</p>
        </section>
    </div>
    <footer class="ticket__footer">
        <span>____Now, go get your glow____</span>
    </footer>
</article>`;


    //   RETUREN STATEMENT
    return htmlContent = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`;
}