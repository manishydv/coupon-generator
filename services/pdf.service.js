const pdf = require('pdf-creator-node');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const ejs = require('ejs');

const generatePdf = (inputs) => {
    return new Promise((resolve, reject) => {
        const {
            customer_no = '4099735563-D',
            order_no = '803261023-D',
            valid_date: validDateStr = new Date().toISOString(),
            coupon_code = 'GS070A021-D',
            amount = '500-D',
            template = 'default-coupon.ejs'
        } = inputs;

        const temp = new Date(validDateStr);
        const valid_date = temp.getDate() + '/' + (temp.getMonth() + 1) + '-' + temp.getFullYear();

        const imagePath = path.join(__dirname, '..', 'public', 'images', '1-bg.jpg');
        const base64Image = fs.readFileSync(imagePath).toString('base64');
        const dataUri = 'data:image/jpeg;base64,' + base64Image;

        const fontPath = (font) => `file:///${path.join(__dirname, '..', 'public', 'fonts', font)}`;

        const templatePath = path.join(__dirname, '..', 'templates', template);
        const templateContent = fs.readFileSync(templatePath, 'utf-8');

        const html = ejs.render(templateContent, {
            customer_no,
            order_no,
            valid_date,
            coupon_code,
            amount,
            dataUri,
            fontPath
        });

        const options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm"
        };
        const id = uuidv4();
        const fileName = id + '_file.pdf';
        const document = {
            html: html,
            data: {},
            path: './uploads/' + fileName,
            type: "",
        };

        pdf.create(document, options)
            .then(res => {
                resolve(fileName);
            })
            .catch(error => {
                reject(error);
            });
    });
};

module.exports = {
    generatePdf
};
