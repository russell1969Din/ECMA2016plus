import {DBMySQL} from "./mySQL.js";
import {DomLevels} from "./domLevels.js";
import {Home} from "../srcTemp/home/home.src.js";
import {Detail} from "../srcTemp/detail/detail.src.js";

$.getJSON("https://api.ipify.org?format=json", function(data) { 
    $("#json").html("/json/" + data.ip + ".json");
});

let domLevels = new DomLevels();
domLevels.loadTemplate(getFragmentPath(1), 'workSpace_general');

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




     
       