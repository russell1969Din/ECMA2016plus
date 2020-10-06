import {FillContainers} from "../srcContents/fillContainers.js";

export class DBMySQL {  
    constructor(dbTables, otherParams) {
        this.dbTables =  dbTables;  
        this.otherParams = otherParams;
        for(let param of Object.values(otherParams)) {
            this.methodName = param.methodName;
            this.pathJSON = param.pathJSON;
            this.noCache = param.methodName;
        }
                           

   }
    
    read(container, id=0, whereDb='') {
        this.createJSON(    id,   
                            whereDb,      
                            this.dbTables, 
                            this.methodName, 
                            container,
                            this.otherParams,
                            this.pathJSON,
                            this.noCache); 
    }
    
    createJSON( id, 
                whereDb,
                dbTables, 
                methodName, 
                container,
                otherParams,
                pathJSON,
                noCache) {
        /// to do: doriešiť no-cache pri aktualizácii tabuľky

        $.ajax({
            url:"../jsonReader.php",
            method:'POST',
            data:{
                protection:     "ABNet",
                dbTables:       this.dbTables,
                dbID:           id,
                dbWhere:        whereDb,
                pathJSON:       this.pathJSON
            },
            success:function(data)  {
                (async () => {  
                    let jsonPlusID = '';
                    if(id>0)  {jsonPlusID = '_' + id;}
                    let fileNameJSON =  '../'+pathJSON + dbTables + jsonPlusID + '.json';
                    let methods = {};
                    let methodsFetch = {};
                    if(this.noCache) { methodsFetch = {cache: "no-cache"};}
                    let response = await fetch(fileNameJSON); 

                    let jsonData = await response.json();
                    if(jsonData.length>0) {
                        let fillContainers = new FillContainers(jsonData, container, otherParams); 
                        eval('fillContainers.' + methodName + '();');
                    }
                })();
                   
            }                                                       
        });       
    }
}