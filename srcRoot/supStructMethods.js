export class SupStructMethods {

    constructor() {}
    
    ajaxJSON(filePathName, tableName) {
        $.ajax({
            url:"../jsonOutSideReader.php",
            method:'POST',
            data:{
                protection:     'ABNet',
                filePathName:   filePathName,
                tableName:      tableName
            },
            success:function(data)  {
                console.log(data);
            }
        });        
    }
}

//import {SupStructMethods} from "./supStructMethods.js";
//let superStru = new SupStructMethods();
//superStru.ajaxJSON(    'outsideJSON/obce.json',
//                        'villages');

//superStru.ajaxJSON(    'outsideJSON/kraje.json',
//                        'regions');

//superStru.ajaxJSON(    'outsideJSON/okresy.json',
//                        'districts');




