import {FillContainers} from "../srcLibrary/fillContainers.js";

export class DBMySQL {  
    constructor(dbTables, otherParams, joinDbTables='') {
        
        this.dbTables =  dbTables;  
        this.otherParams = otherParams;
        this.joinDbTables = joinDbTables;
        for(let param of Object.values(otherParams)) {
            this.pathJSON = param.pathJSON;
            this.noCache = param.methodName;
        }
   }
    
    read(container, id=0, whereDb='') {
        
        for(let item of Object.values(container)) this.methodName = item.methodName;
        this.createJSON(    id,   
                            whereDb,      
                            this.dbTables, 
                            this.methodName, 
                            container,
                            this.otherParams,
                            this.pathJSON,
                            this.joinDbTables,
                            this.noCache); 
    }
    
    createJSON( id, 
                whereDb,
                dbTables, 
                methodName, 
                container,
                otherParams,
                pathJSON,
                joinDbTables,
                noCache) {
        /// to do: doriešiť no-cache pri aktualizácii tabuľky

        $.ajax({
            url:"../jsonReader.php",
            method:'POST',
            data:{
                protection:     "ABNet",
                dbTables:       this.dbTables,
                dbJoin:         joinDbTables,
                dbID:           id,
                dbWhere:        whereDb,
                pathJSON:       this.pathJSON
            },
            success:function(data)  {
                //console.log(data);
                (async () => {  
                    let jsonPlusID = '';
                    if(id>0 && whereDb.length==0)  {jsonPlusID = '_' + id;}
                    if(whereDb.length>0) {
                        let asc = getSumAscii(whereDb);
                        jsonPlusID = '_ASC_' + asc;
                    }
                    let fileNameJSON =  '../'+pathJSON + dbTables + jsonPlusID + '.json';   
                    let methods = {};
                    let methodsFetch = {};
                    if(this.noCache) { methodsFetch = {cache: "no-cache"};}
                    let response = await fetch(fileNameJSON, methodsFetch); 

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