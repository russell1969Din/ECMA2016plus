
import {MenuControl} from "./menuControl.js";

import {DomLevels} from "./domLevels.js";
import {BasicMenu} from "../srcMenu/basicMenu/basicMenu.src.js";

$.getJSON("https://api.ipify.org?format=json", function(data) { 
    $("#json").html("/json/" + data.ip + ".json");
});


let domLevels = new DomLevels();


let basicMenu = new BasicMenu();
basicMenu.execRender();

domLevels.loadTemplate(getFragmentPath(1), 'workSpace_general');     

let menuControl = new MenuControl();
menuControl.call(getFragmentPath(1), getFragmentPath(2));

