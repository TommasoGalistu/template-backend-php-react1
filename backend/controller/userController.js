require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const Todo = require('../model/toDoModel')

const TIME_TO_REPEAT = 15

const userController = {
    register: async (req, res) =>{
        try{
            const existingUser = await User.findOne({email: req.body.email})

            if(existingUser){
                return res.status(400).json({error: "Email già presente"})
            }

            const passwordBcrypt = await bcrypt.hash(req.body.password, TIME_TO_REPEAT);
            const user = new User({...req.body, password: passwordBcrypt});
            await user.save();

            return res.status(200).json({user: user, message: "La registrazione ha avuto successo!"});
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    },
    login: async (req, res) =>{
        try{
            const {email, password} = req.body
            const user = await User.findOne({email: email})

            if(!user){
                res.status(400).json({error: "Emeail o password errata"})
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                res.status(400).json({error: "Email o password errata"})
            }


            const token = jwt.sign(
                {id: user._id, email: user.email, ip: req.ip},
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )

            res.cookie('token', token, {
                httpOnly: true,  // Protegge il token da JavaScript (XSS)
                // // secure: process.env.NODE_ENV === "production", // Solo HTTPS in produzione
                // sameSite: "None", // Previene attacchi CSRF
                // secure: false, //Richiede HTTPS (NON funziona su localhost)
                maxAge: 24 * 60 * 60 * 1000, // Scadenza: 1 giorno
                // path: "/", // Disponibile su tutto il sito
                // domain: "tuodominio.com" // (Opzionale) Disponibile solo su questo dominio
            })

            res.status(200).json({message: "Login riuscito!!", email, token: token})
        }catch(error){
            res.status(400).json({error: error.message})
        }
    },
    logout: async (req,res) => {

        try{
            const token = req.cookies.token; 

            if(!token){
                return res.status(400).json({error: "Errore nel logout, riprovare"})
            }
            res.clearCookie("token", {
                httpOnly: true
            });
            return res.status(200).json({message: "Logout effettuato con successo"})
        }catch(error){
            return res.status(400).json({error: error.message})
        }
        

        
    },
    checkToken: async (req, res) =>{
        try{
            const token = req.cookies.token; 
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 
            
            if(!decoded){
                return res.status(401).json({ error: "Non sei loggato, vai nella pagina login per loggarti!!" });
            }
            
            return res.status(200).json({message: "Puoi accedere all'area privata", user: decoded.email})
        }catch(error){
            return res.status(400).json({ error: "Non sei loggato, vai nella pagina login per loggarti!!" })
        }
    },
    
}

module.exports = userController;