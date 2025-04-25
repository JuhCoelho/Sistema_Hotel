const usuariosModel = require("../models/usuariosModel");
const { body, validationResult } = require("express-validator");
const moment = require("moment");
const usuariosController = {

//validação do formulário
  regrasValidacao: [


   
    body("nome").isLength({ min: 3, max: 45 })
        .withMessage("O nome deve conter no mínimo 3 a no máximo 70 caracteres!"),
    body("email").isEmail()
        .withMessage("Insira um email válido!"),
    body("senha").isStrongPassword()
        .withMessage("A senha deve ter letras maiúsculas e minúsculas, números e caracter especial, e no mínimo 8 caracteres!"),
    body("consenha").custom((value, {req})=> {
        if(value == req.body.senha) {
            return true;
        }else {
            throw new Error("As senhas são diferentes!");
        }
    })
  ],

  validacoesAdmUsuario: [
    body("nome")
      .isLength({min: 3, max: 100}).withMessage("O nome é obrigatório"),
  
    body("cep")
      .notEmpty().withMessage("O CEP é obrigatório")
      .isLength(8).withMessage("O CEP deve ser válido"),
  
    body("nomeUsuario")
      .notEmpty().withMessage("O nome de usuário é obrigatório"),
  
    body("email")
      .notEmpty().withMessage("O e-mail é obrigatório")
      .isEmail().withMessage("Digite um e-mail válido"),
  
    body("senha")
      .notEmpty().withMessage("A senha é obrigatória")
      .isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
  
    body("tipo")
      .notEmpty().withMessage("O tipo de usuário é obrigatório")
      .isIn(["1", "2"]).withMessage("Tipo de usuário inválido"),
  
    body("status")
      .notEmpty().withMessage("O status é obrigatório")
      .isIn(["0", "1"]).withMessage("Status inválido")
  ],
  

//métodos

     listarUsuarios: async (req, res) => {
   
       try {
        results = await usuariosModel.findAll();
        res.render("pages/adm-cliente", { usuarios: results});
         } catch (e) {
        console.log(e); // exibir os erros no console do vs code
         res.json({ erro: "Falha ao acessar dados" });
         }
     },




    cadastrarUsuario: async (req, res) => {
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){

            console.log(errors);
            return res.render("pages/cadastro", {
                dados: req.body,
                listaErros: errors,
            });
        }
    
   
        var dadosForm = {
            nome_usuario: req.body.nome,
            email_usuario: req.body.email,
            senha_usuario: req.body.senha,
            user_usuario: req.body.nome,
             
        }; 
        
        try {
           
                results = await usuariosModel.create(dadosForm);
               
                res.redirect("/");

        } catch (error) {
            console.log(error);
            res.json({ erro: "Falha ao acessar dados" });
           
        }
          

    },

    criarUsuarioAdm: async (req, res) => {
      const errors = validationResult(req);
  
     
      if (!errors.isEmpty()) {
          console.log(errors);
          return res.render("pages/cliente-novo", {
              dados: req.body,
              listaErros: errors,
          });
      }
  
      // Dados do formulário
      let dadosForm = {
          nome_usuario: req.body.nome,
          cep_usuario: req.body.cep,
          email_usuario: req.body.email,
          senha_usuario: req.body.senha,
          user_usuario: req.body.nomeUsuario,
          tipo_usuario: req.body.tipo,
          status_usuario: req.body.status,
          // imagem_usuario: req.file.filename, // caso use upload de imagem
      };
  
      let id_usuario = req.body.id_usuario; 

      try {
          if (!id_usuario || id_usuario === "") {
           
              await usuariosModel.create(dadosForm);
              console.log("Usuário criado com sucesso.");
          } else {
              
              dadosForm.id_usuario = id_usuario;  
              await usuariosModel.update(dadosForm, id_usuario);
              console.log("Usuário atualizado com sucesso.");
          }
          res.redirect("/adm/adm-cliente"); 
      } catch (error) {
          console.log(error);
          res.json({ erro: "Erro ao cadastrar cliente pelo admin" });
      }
  },
  
  

    
  deletarUsuario: async (req, res) => {
    let {id} = req.query;
    
    try {
      results = await usuariosModel.delete(id);
      res.redirect("/adm/adm-cliente");
      console.log("Usuario " + id + " excluído com sucesso.")
     
    } catch (e) {
      console.log(e);
      res.json({ erro: "Falha ao acessar dados" });
    }
  },


  

  exibirUsuarioId: async (req, res) => {
    let { id } = req.query; 
    console.log(id); 
  
    try {
      let resultado = await usuariosModel.findId(id); 
      let usuario = resultado[0]; 
  
      res.render("pages/adm-cliente-del", {
        usuarios: usuario, 
        listaErros: null,
      });
    } catch (e) {
      console.log(e);
      res.json({ erro: "Falha ao acessar dados" });
    }
  },

  
  exibirUsuarioIdDet: async (req, res) => {
    let { id } = req.query; 
    console.log(id); 
  
    try {
      let resultado = await usuariosModel.findId(id); 
      let usuario = resultado[0]; 
  
      res.render("pages/adm-cliente-list", {
        usuarios: usuario, 
        listaErros: null,
      });
    } catch (e) {
      console.log(e);
      res.json({ erro: "Falha ao acessar dados" });
    }
  },

   
  exibirUsuarioIdEdit: async (req, res) => {
    let { id } = req.query; 
    console.log(id); 
  
    try {
      let resultado = await usuariosModel.findId(id); 
      let usuario = resultado[0]; 
  
      res.render("pages/adm-cliente-edit", {
        usuarios: usuario, 
        listaErros: null,
      });
    } catch (e) {
      console.log(e);
      res.json({ erro: "Falha ao acessar dados" });
    }
  }


    
  


};

module.exports = usuariosController;
           

    