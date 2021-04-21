const prodData = require("../data/ProdIteracao");
const userData = require("../data/UserInteracao");

exports.existsEntityByEmail = async function(email){

    try {

       
        if(await prodData.getProdutorByEmail(email) === null){

            if(await userData.getUserByEmail(email) === null){
                return false
            }
            else{
                return true
            }
            
        }

        else{
            return true
        }
        
    } catch (error) {
        return(error);
    }
}