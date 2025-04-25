const express = require("express");
const router = express.Router();
const moment = require("moment");
const usuariosController = require("../controllers/usuariosController");

router.get("/", (req, res)=>{
    res.render("pages/index-adm");
});

router.get("/adm-cliente", (req, res)=>{
    usuariosController.listarUsuarios(req, res);
    // res.render("pages/adm-cliente");
   
});



router.get("/cliente-novo", function (req, res) {
    res.render("pages/cliente-novo", { dados: null, listaErros: null });
  });

  
router.post("/cliente-novo", usuariosController.validacoesAdmUsuario, function (req, res) {
  usuariosController.criarUsuarioAdm(req, res);
   
}
);


router.get("/adm-cliente-del", (req, res)=>{  
   usuariosController.exibirUsuarioId(req, res);
});


router.post("/adm-cliente-del", function (req, res) {
    usuariosController.deletarUsuario(req, res);
 });

 
router.get("/adm-cliente-list", (req, res)=>{  
  usuariosController.exibirUsuarioIdDet(req, res);
});

router.get("/adm-cliente-edit", function (req, res) {
  usuariosController.exibirUsuarioIdEdit(req, res);
});

  
router.post("/adm-cliente-edit", usuariosController.validacoesAdmUsuario, function (req, res) {
  usuariosController.criarUsuarioAdm(req, res);
   
}
);


module.exports = router

// usuariosController.listarUsuarios(req, res);