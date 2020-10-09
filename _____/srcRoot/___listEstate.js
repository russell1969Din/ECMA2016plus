export class DBMySQL {
    constructor(divID, dbTables, noCache=false) {
        this.divID = divID;
        this.dbTables =  dbTables;     
        this.noCache = noCache;
    }
    
    read(id=0) {
        console.log(this.createJSON(id, this.dbTables, this.noCache));
        const containerID = document.querySelector(this.divID);
    }
    
    createJSON(id, dbTables, noCache) {
        $.ajax({
            url:"../jsonReader.php",
            method:'POST',
            data:{
                protection:     "ABNet",
                dbTables:       this.dbTables,
                dbID:           id
            },
            success:function(data)  {
                (async () => {  
                    let jsonPlusID = '';
                    if(id>0)  {jsonPlusID = '_' + id;}
                    let fileNameJSON = 'json/' + dbTables + jsonPlusID + '.json';
                    let methods = {};
                    if(noCache) {let methods = {cache: "no-cache"};}
                    let response = await fetch(fileNameJSON, methods); 
                    //let estate = new Estate(await response.json(), ul); 
                })();                   
            }                                                       
        });
        return("AJAX");
    }
    
}