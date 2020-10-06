import {System} from "./system.js";

export class DomLevels {
    //======    Konštruktor nevytvára žiadne lokálne premenné
    constructor() {}
    
    //======    Funkcia vytvárajúca nový HTML element do akuálneho DOM
    //======    parent = ID rodičovského elementu, do ktorého má byť element vložený
    //======    type = typ vytváraného elementu
    //======    id = unikátne ID noovytváraného elementu
    //======    ak tester = true do titulky elementu vloží identidikáčne informácie (napr. ID)
    createElement(parent, type='div', id, tester = false) {
        var cnt = document.createElement(type); 
        document.getElementById(parent).appendChild(cnt); 
        cnt.setAttribute("id", id); 
        if(tester) cnt.setAttribute("title", id);
        
        // Vrati objekt typu element pre prípadne ďalšie použitie
        return cnt;
    }
    
    linkTemplate(hrefLink='', WEBPath='') {
        //======    Do kontajnera pre predchádzajuce URL adresy sa načíta aktuálne adresa   
        $('#lastURL').html($('#currentURL').html());
        //======    Ak niektorý z parametrov nie je riadne definovaný, metóda sa predčasne ukončí    
        if(hrefLink.trim().length==0 || WEBPath.trim().length==0) return null;
        //======    Appka nastaví nové URL
        var stateObj = {foo:'bar'};
        history.pushState(stateObj, "page 2", "/" + hrefLink);
        //======    Nastaví zobrazenie šablón na úplný vrch hore
        $(window).scrollTop(0); $('body').scrollTop(0);
        //======    Do kontajnera pre aktuálne URL adresy sa načíta adresa vyskladaná z parametrov metódy
        $('#currentURL').html(WEBPath + '/' + hrefLink);
        //======    Zavolá konštruktor triedy System
        let system = new System();      
        //======    Resetne posledne načítanú šablónu z generálneho kontajnera 
        $('#workSpace_general').html('');  
        //======    Do geerálneho kontajnera načíta šablónu prevzatú z parametra #currentURL / funkciou getFragmentPath(1) 
        system.loadTemplate(getFragmentPath(1), 'workSpace_general');
    }
}


