const bcrypt = require('bcryptjs');
const appJson = require('./app_config.json');
const db = require('../models/db');
const UserModal = db.user;


const email = appJson.admin_email.toLowerCase();
const pwd = appJson.admin_pwd;

if(appJson && email!='' && pwd!=''){ 
    UserModal.findOne({email: email},function(err, user) {
        if(!user){
            try {
                bcrypt.hash(pwd, 10, (err, hash) => {
                    if (err) {
                        return res.status(400).json({ message: 'Error hashing password' });
                    }
                    const body = {
                        firstName: "SUPER",
                        lastName: "ADMIN",
                        email: email,
                        password: hash,
                        role: "SUPER_ADMIN"
                    };
                   console.log("-create admin-", body);
                    UserModal.create(body).then(user => {
                        console.log('user',user);
                        if (user) {
                            console.log("SUCCESSFULLY CREATED SUPER ADMIN");
                            console.log(` ${email} - ${pwd}`); 
                        } else {
                           console.log("FAIL TO CREATE SUPER ADMIN");
                        }
                    }).catch(() => {
                        return res.status(500).json({ message: 'Error occured' });
                    });
        
                });
            } catch (e) {
                console.log("err..! error on creatingadmin");
                console.log(e);
            }
        }
    });
}
