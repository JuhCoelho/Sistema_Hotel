var pool = require("../../config/pool_conexoes");

const usuariosModel = {

   //metodo para retornar todo os registros da entidade usuario
   findAll: async () => {
        
    try {
        const [linhas] = await
            pool.query("SELECT * FROM usuario WHERE status_usuario = 1");
    
        console.log(linhas);
        return linhas;
    } catch (error) {
        console.log(error);
        return null;
    }

},


   

    create: async (dadosForm) => {
        try {
            const [linhas, campos] = await pool.query('INSERT INTO usuario SET ?', [dadosForm])
            console.log(linhas);
            console.log(campos);
            
            return linhas;
        } catch (error) {
            console.log(error);
            return null;
        }  
    },


    delete: async (id) => {
        try {
            const [linhas,campos] = await pool.query('UPDATE usuario SET status_usuario = 0  WHERE id_usuario = ?', [id])
            return linhas;
          
        } catch (error) {
            console.log(error);
            return error;
            
        }  
    },

    
    findId: async (id) => {
        try {
            const [linhas,campos] = await pool.query('SELECT * FROM usuario WHERE status_usuario = 1 and id_usuario = ?',[id] )
            return linhas;
        } catch (error) {
            console.log(error);
            return error;
        }
    },


    update: async (dadosForm, id) => {
        try {
            const [linhas] = await pool.query('UPDATE usuario SET ? WHERE id_usuario = ?', [dadosForm, id])
            return linhas;
        } catch (error) {
            console.log(error)
            return error;
        }  
    },



    
   
};
    

module.exports = usuariosModel;