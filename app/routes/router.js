const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

const {body, validationResult} = require("express-validator");



router.get("/", (req, res)=>{
    res.render("pages/index");
});

router.get("/login", (req, res)=>{
    res.render("pages/login");
});

router.get("/cadastro", (req, res)=>{
    res.render("pages/cadastro", { dados: null, listaErros: null })
});


router.post("/cadastro", usuariosController.regrasValidacao, function (req, res) {
    usuariosController.cadastrarUsuario(req, res);
     
  }
);


router.get("/perfil", (req, res)=>{
    res.render("pages/perfil")
});


module.exports = router