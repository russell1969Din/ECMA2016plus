import {DBMySQL} from "./mySQL.js";
import {System} from "./system.js";
import {Home} from "../srcTemp/home.js";
import {Detail} from "../srcTemp/detail.js";

$.getJSON("https://api.ipify.org?format=json", function(data) { 
    $("#json").html("/json/" + data.ip + ".json");
});

let system = new System();
system.loadTemplate(getFragmentPath(1), 'workSpace_general');

switch(getFragmentPath(1)) {
    case 'home':    {
        let home = new Home();
        home.controller();        
        break;
    }
    case 'detail':    {
        let detail = new Detail();
        detail.controller();        
        break;
    }
}




     
       