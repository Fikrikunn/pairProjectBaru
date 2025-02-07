const { where, Model } = require("sequelize")
const bcrypt = require(`bcryptjs`)
const { use } = require("../routers")
const {Symptom, User, DiseaseSymptom, Disease, Profile} = require(`../models/index`)
const nodemailer = require('nodemailer')

class Controller {

    static showHomePage(req, res){
        try {
            res.render(`home`)
        } catch (error) {
            res.send(error)
        }
    }

    static async showRegisterForm(req, res){
        try {
            res.render(`registerForm`)
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegisterForm(req, res){
        try {
            
            let {userName, email, password, role} = req.body
            await User.create({userName, email, password, role})

            res.redirect(`/login`)
        } catch (error) {
            res.send(error)
        }
    }

    static async showLobby(req, res) {
        try {
            let idUser = req.session.UserId;
            let role = req.session.role
    
            let dataProfile = await Profile.findAll({
                where: {UserId:idUser},
                include: {
                    model: User
                }
            })

            for (let profile of dataProfile) {
                profile.User.emailWithEmoji = await User.getEmailEmoji(profile.User);
            }

            res.render(`profile`, {dataProfile})
        } catch (error) {
            res.send(error)
        }
    }

    static async showLoginForm(req, res){
        try {
            let {error} = req.query
            res.render(`loginForm`, {error})
        } catch (error) {
            res.send(error)
        }
    }

    static async postLoginForm(req, res){
        try {
            let {email, password} = req.body

            if(!email || !password) throw `Invalid Email / Password, please Check your input 😊🙏🏼`
            
            let user = await User.findOne({
                where: {email : email}
            })
            
            if (user) {
                const isValidPassword = await bcrypt.compare(password, user.password);
                
                if (isValidPassword) {  

                    req.session.UserId = user.id
                    req.session.role = user.role
                    req.session.email = user.email
                    return res.redirect('/profile', req.session.UserId, req.session.role)
                }else{
                    const error = "Invalid Email / Password, please Check your input 😊🙏🏼"
                    return res.redirect(`/login?error=${error}`)
                }

            } 

        } catch (error) {
            if(error === 'Invalid Email / Password, please Check your input 😊🙏🏼'){
                res.redirect(`/login?error=${error}`)
            }else{
                res.send(error)
            }
        }
    }

     static async showAddSymptomForm(req, res) {
        try {
            let dataSymptom = await Symptom.findAll();
            res.render("addSymptom", { dataSymptom });
        } catch (error) {
            res.send(error);
        }
    }

    static async postAddSymptomForm(req, res) {
        try {
            let emailUser = req.session.email
            let { symptomIds } = req.body;

            const transporter = nodemailer.createTransport({
                service: "Gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: "almontimanuputty@gmail.com",
                  pass: "xvkz mqxr liga fmuk",
                },
              });
            
            //   xvkz mqxr liga fmuk <== passsword authen email terdaftar untuk nodemailer
              const mailOptions = {
                from: "almontimanuputty@gmail.com",
                to: emailUser,
                subject: "Hello from Alodok",
                text: "Terimakasih sudah menggunakan Alodok, jika berkenan untuk konsultasi lebih lanjut dengan Dokter Kami, mohon hubungi no berikut +6285882450419",
              };
            
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error("Error sending email: ", error);
                } else {
                  console.log("Email sent: ", info.response);
                }
              });
    
            if (!symptomIds || symptomIds.length === 0) {
                return res.redirect('/symptom/add'); // Jika tidak ada gejala yang dipilih
            }
    
            let diseases = await Disease.findAll({
                include: {
                    model: Symptom,
                    where: { id: symptomIds },
                    through: { attributes: [] } // Hilangkan data dari tabel perantara
                }
            });
    
            res.render('diseases', { diseases });
    
        } catch (error) {
            console.error(error)
            res.send(error)
        }
    }
    
    

    static async showEditForm(req, res){
        try {

            let {id} = req.params

            let dataProfile = await Profile.findOne({where: {id: id}})
            // res.send(dataProfile)
            res.render(`editProfile`, {dataProfile})
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditForm(req, res){
        try {
            let {id} = req.params
            // console.log(req.body);
            

            let {fullName, phone, address} = req.body

            await Profile.update({
                fullName: fullName,
                phone: phone,
                address: address
            }, {
                where: {id: id}
            }
        )
        res.redirect(`/profile`)
        } catch (error) {
            res.send(error)
        }
    }

    static async showProfileAdd(req, res){
        try {
            
            res.render(`addProfile`)
        } catch (error) {
            res.send(error)
        }
    }

    static async postProfileAdd(req, res){
        try {
            let idUser = req.session.UserId;

            let {fullName, phone, address} = req.body

            await Profile.create({fullName, phone, address, UserId : idUser})

            res.redirect(`/profile`)
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteProfile(req, res){
        try {
            let {id} = req.params
            await Profile.destroy(
                {where : {id: id}}
            )

            let dataProfile = await Profile.findOne({where: {id: id}})

            res.render('profile', {dataProfile})
        } catch (error) {
            res.send(error)
        }
    }

    static async showAllUsers(req, res){
        try {
            let allData = await Profile.findAll({
                include: {
                    model: User
                }
            }) 

           res.render(`halamanUsers`, {allData})
            
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteByAdmin(req, res){
        try {

            let {id} = req.params
            await Profile.destroy(
                {where : {id: id}}
            )
            
            let allData = await Profile.findAll({
                include: {
                    model: User
                }
            }) 
            res.render('halamanUsers', {allData})
        } catch (error) {
            res.render(error)
        }
    }


}

module.exports = Controller