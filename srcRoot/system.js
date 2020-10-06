import {DBMySQL} from "./mySQL.js";

export class System {
    constructor() {}
    
    loadTemplate(fileToLoad='', workSpace='') {
        if(fileToLoad.trim().length==0 || workSpace.trim().length==0) return null;
        $.ajax({
            url:'../templates/' + fileToLoad + '.php',
            method:'POST',
            data:{
                param:       0
            },
            success:function(data)  {
                $('#'+workSpace).html(data);
            }                                                       
        });
    }
}
