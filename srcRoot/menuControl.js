
import {DomLevels} from "./domLevels.js";

import {Home} from "../srcTemp/home/home.src.js";
import {Detail} from "../srcTemp/detail/detail.src.js";
import {Ponuka} from "../srcTemp/ponuka/ponuka.src.js";
import {OSpolocnosti} from "../srcTemp/o-spolocnosti/o-spolocnosti.src.js";
import {Aktuality} from "../srcTemp/aktuality/aktuality.src.js";
import {Kontakt} from "../srcTemp/kontakt/kontakt.src.js";
import {VlozteDopyt} from "../srcTemp/vlozte-dopyt/vlozte-dopyt.src.js";

export class MenuControl {
    
    constructor() {}
    
    call(url='', path='') {
    
        if(url.trim().length==0) return  null;
        
        if(url.indexOf('/')>(-1)) {url = url.substr(0,url.indexOf('/'));}

        $(window).scrollTop(0); $('body').scrollTop(0);
        
        let domLevels = new DomLevels();   
        
        //console.log('LOAD TEMPLATE :: ' + url + ' :: ' + path);

        switch(url) {
            case 'home':    {
                //let home = ;
                domLevels.loadTemplate(url, 'workSpace_general', new Home());
                this.clickHierarchy(url, path);
                //home.controller();        
                break;
            }
            case 'ponuka':  {
                //let ponuka = new Ponuka();
                domLevels.loadTemplate(url, 'workSpace_general', new Ponuka());
                this.clickHierarchy(url, path);
                //ponuka.controller();        
                break;
            }
            case 'o-spolocnosti':    {
                //let oSpolocnosti = new OSpolocnosti();
                domLevels.loadTemplate(url, 'workSpace_general', new OSpolocnosti());
                this.clickHierarchy(url, path);
                //oSpolocnosti.controller();        
                break;
            }
            case 'aktuality':    {
                //let aktuality = new Aktuality();
                domLevels.loadTemplate(url, 'workSpace_general', new Aktuality());
                this.clickHierarchy(url, path);
                //aktuality.controller();        
                break;
            }
            case 'vlozte-dopyt':    {
                //let vlozteDopyt = new VlozteDopyt();
                domLevels.loadTemplate(url, 'workSpace_general', new VlozteDopyt());
                this.clickHierarchy(url, path);
                //vlozteDopyt.controller();        
                break;
            }
            case 'kontakt':    {
                //let kontakt = new Kontakt();
                //kontakt.controller();        
                domLevels.loadTemplate(url, 'workSpace_general', new Kontakt());
                this.clickHierarchy(url, path);
                break;
            }
            case 'detail':    {
                //let domLevels = new DomLevels();   
                domLevels.loadTemplate(url, 'workSpace_general', new Detail());
                this.clickHierarchy(url, path);
                //let detail = new Detail();
                //detail.controller();        
                break;
            }
        }    
    }
    
    clickHierarchy(url, path) {
        
        if(path.trim().length>0) url = url + '/' + path;
        
        $('#lastURL').html($('#currentURL').html());
        var stateObj = {foo:'bar'};
        history.pushState(stateObj, "page 2", "/" + url);    

        $('#lastURL').html($('#currentURL').html());
        $('#currentURL').html($('#webURL').html() + '/' + url);
        $('#current-site').html(url);
    }
    
    
    changeClass(dataItems) {
        let currentID;
        for(let item of Object.values(dataItems)) {
            currentID = item.url;
            if(!document.getElementById(currentID)) break;
            $('#'+currentID).removeClass('menu-item-current');
            if(item.url==$('#current-site').html()) {
                $('#'+currentID).addClass('menu-item-current');
            }
        }
    }    
}
