var express = require('express');
var router = express.Router();
const path = require('path');
var fs = require('fs');
var pdf = require('html-pdf');
const { v4: uuidv4 } = require('uuid');

var config = require('../config/app_config.json');


//  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
//  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
//  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/test', function(req, res, next) {
    res.render('test');
});

// dev test
router.get('/gentest', function(req, res, next) {
    var html = getPDFHTMLContent("test");
    var options = { format: 'A4' };

    var id = uuidv4();
    var fileName = id + '_file.pdf';

    pdf.create(html, options).toFile('./uploads/' + fileName, function(err, response) {
        if (err) return res.send({ status: 300, msg: 'something went wrong.' });
        res.send({ status: 200, file: fileName });
    });
});

router.post('/api/v1/generatepdf', function(req, res, next) {
    console.log('request for genrate coupon pdf:: ', req.body);
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
    } else if (inputs.amount == undefined || inputs.amount == "") {
        return res.status(300).json({ status: 300, message: 'amount is required' });
    }



    var html = getPDFHTMLContent(inputs);
    var options = { format: 'A4' };

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
    if (filename == undefined || filename == "") {
        return res.status(300).json({ status: 300, message: 'invaild request' });
    }
    var appDir = path.dirname(require.main.path.replace(/\bin/g, ""));
    console.log(`${appDir}/uploads/${filename}`);
    res.download(`${appDir}/uploads/${filename}`, filename);

});

module.exports = router;


function getPDFHTMLContent(inputs) {
    var customer_no = inputs.customer_no ? inputs.customer_no : '4099735563-D';
    var order_no = inputs.order_no ? inputs.order_no : '803261023-D';;
    var temp = inputs.valid_date ? new Date(inputs.valid_date) : new Date();
    var valid_date = temp.getDate() + '/' + temp.getMonth() + '-' + temp.getFullYear();
    var coupon_code = inputs.coupon_code ? inputs.coupon_code : 'GS070A021-D'
    var amount = inputs.amount ? inputs.amount : '500-D'


    var css = `
    @font-face {
        font-family: 'MyriadPro';
        src: url('./public/fonts/MyriadPro-Regular.eot');
        src: url('./public/fonts/MyriadPro-Regular.woff') format('woff'), url('./public/fonts/MyriadPro-Regular.ttf') format('truetype'), url('./public/fonts/MyriadPro-Regular.svg') format('svg');
        font-weight: 400;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'MyriadPro';
        src: url('./public/fonts/MyriadPro-Bold.eot');
        src: url('./public/fonts/MyriadPro-Bold.woff') format('woff'), url('./public/fonts/MyriadPro-Bold.ttf') format('truetype'), url('./public/fonts/MyriadPro-Bold.svg') format('svg');
        font-weight: 700;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'MyriadPro';
        src: url('./public/fonts/MyriadPro-Semibold.eot');
        src: url('./public/fonts/MyriadPro-Semibold.woff') format('woff'), url('./public/fonts/MyriadPro-Semibold.ttf') format('truetype'), url('./public/fonts/MyriadPro-Semibold.svg') format('svg');
        font-weight: 600;
        font-style: normal;
    }

    html {
        height: 100%;
    }
    
    body {
        margin-left: auto;
        margin-right: auto;
        font-family: 'MyriadPro', 'arial' !important;
        padding: 10px;
        height: 100%;
        font-weight: 400;
    }
    
    *,
    *::after {
        box-sizing: border-box;
        margin: 0;
    }
    
    .hr-text {
        position: relative;
        outline: 0;
        border: 0;
        color: #484747;
        text-align: center;
        height: 1.5em;
    }
    
    .hr-text:before {
        content: "";
        background-color: #a98465;
        position: absolute;
        left: 12%;
        top: 50%;
        width: 78%;
        height: 2px;
    }
    
    .hr-text:after {
        content: attr(data-content);
        position: relative;
        display: inline-block;
        padding: 0 0.5em;
        line-height: 1.5em;
        color: #484747;
        font-weight: 400;
        background-color: white
    }
    
    table.upper-ticket {
        background-image: url(${config.defaultbg1});
        background-size: cover;
        margin: 20px auto;
        height: 330px;
        width: 740px;
    }
    
    table.lower-ticket {
        background-image: url(${config.defaultbg2});
        background-size: cover;
        margin: 20px auto;
        height: 330px;
        width: 740px;
    }`;

    var html = `<div class="main-wrapper">
    <!-- upper ticket -->
    <table class="upper-ticket">
        <tbody>
            <tr>
                <td style="text-align: center;vertical-align: bottom;">
                    <table style="height: 100%;width: 100%;">
                        <tbody>
                            <tr>
                                <th>
                                    <hr class="hr-text" data-content="">
                                    <h1 style="font-size: 2.6rem;font-weight: 400;line-height: 1.2;letter-spacing: 18px;">MYRONJA</h1>
                                    <h5 style="font-size: 1.1rem;font-weight: 400;line-height: 1.2;letter-spacing: 7px;color: #6f6f6f;">ELEGANEWITHAGLOW</h5>
                                    <hr class="hr-text" data-content="">
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <h5 style="font-size: 2.2rem;font-weight: 700;line-height: 1.2;">Gavekort</h5>
                                    <p style="font-size: 1.5em;font-weight: 400;">${amount} kr.</p>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <hr class="hr-text" data-content="Now, go get your glow">
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width: 30%;text-align: center;">
                    <div class="cont_wrp" style="width: 55%;margin: 0 auto;text-align: center;">
                        <div style="margin-bottom: 12px;">
                            <p style="padding: 5px;">Kundeservice:</p>
                            <p>${customer_no}</p>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <p style="padding: 5px;">Gyldigt indtil:</p>
                            <p>${valid_date}</p>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <p style="padding: 5px;">Ordre nummer:</p>
                            <p>${order_no}</p>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- lower ticket -->
    <table class="lower-ticket">
        <tbody>
            <tr>
                <td>
                    <table style="height: 100%;width: 100%;">
                        <tbody>
                            <tr>
                                <th>
                                    <h5 style="font-size: 1.5rem;font-weight: 600;line-height: 1.2;text-align: left;padding-left: 12%;color: #424242;">Sådan gør du</h5>
                                    <hr class="hr-text">
                                </th>
                            </tr>
                            <tr style="vertical-align: initial;">
                                <th>
                                    <div class="notes-wrapper" style="padding-left: 12%;padding-right: 12%;text-align: left;">
                                        <p style="font-size: 1.08rem;font-weight: 400;line-height: 1.2;margin-bottom: 5px;">1. Gå ind på myronja.com
                                        </p>
                                        <p style="font-size: 1.08rem;font-weight: 400;line-height: 1.2;margin-bottom: 5px;">2. Lig de produkter du ønsker dig i kurven og tilfo gavekørts koden
                                        </p>
                                        <p style="font-size: 1.08rem;font-weight: 400;line-height: 1.2;margin-bottom: 5px;">3. Nyd produkterne dagen efter.</p>
                                    </div>
                                </th>
                            </tr>
                            <tr style="vertical-align: initial;">
                                <th>
                                    <hr class="hr-text">
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width: 30%;text-align: center;padding: 49px 0;vertical-align: text-top;">
                    <div class="cont_wrp" style="width: 78%;margin: 0 auto;text-align:center;">
                        <div>
                            <h5 style="padding: 5px;font-size: 1.4em;font-weight: 400;">Gavekorts kode</h5>
                            <p style="font-size: 1.3em;font-weight: 400;">${coupon_code}</p>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>`;


    //   RETUREN STATEMENT
    return htmlContent = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`;
}