//======    Importujeme triedu DomLevels s metódami pre prácu s HTML DOM levels  
import {DomLevels} from "../srcRoot/domLevels.js";

//======    Importujeme triedu System napríklad pre spracovanie dát viewFields z objektu container
import {System} from "../srcRoot/system.js";

import {MenuControl} from "../srcRoot/menuControl.js";


//======    Odkaz z každej položky zobrazenia kontajnera pomocou tohto objektu sa bude odvolávať na odkaz Detail 
import {Home} from "../srcTemp/home/home.src.js";

//======    Odkaz z každej položky zobrazenia kontajnera pomocou tohto objektu sa bude odvolávať na odkaz Detail 
import {Detail} from "../srcTemp/detail/detail.src.js";
  
//======    
import {ListItemsAdd} from "./listItemsAdd/listItems.add.js";  

//https://stackoverflow.com/questions/46071410/how-to-load-css-file-in-ecmascript-6 (render react)

//======    Nahráme príslušný CSS súbor s popisom nižšie
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../srcLibrary/listItems.css" />');     
    //  CSS current template
    //  .parent-title
    //  .parent-win 
    //  .child-win
    //  .child-image

//======    Deklarácia objektu triedy ListItems pre zobrazenie položiek ktoré Controller načítal cez JSON z databázy
export class ListItems {

    //======    Konštruktor vytvára lokálne premenné použiteľné v rámci aktuálnej triedy
    constructor(data, container, otherParams) {
        
        this.doConstruct(data, container, otherParams);
    
        /*
        //======    this.data v objekte triedy JSON sú načítané dáta potrebné pre zobrazovanie
        this.data = data;
        //======    Slučka pre načítanie hodnôt z objektu typu container

        //======    this.columns je nastavený počet položiek ako sa majú v riadku zobrazovať
        this.columns = container.columns;
        //======    this.iconTitle deklarácia ikonky v rámci Fontsameone ktorá sa má zobraziť pred value.title
        this.titleIcon = container.iconTitle;
        //======    this.columns je text v titulke ktorý sa má zobraziť v kontajnery s CSS tiedou parent-title
        this.title = container.title;
        //======    this.ID unikátne ID základného kotajnera 
        this.ID =  container.id;
        //======    this.ID unikátne ID rodičovského kotajnera do ktorého sa vyvorí celé zobrazenie
        this.containerParent =  container.parentId;
        //======    this.pathImage konštantná cesta ku zobrazovaným obrázkov
        this.pathImage =  container.pathImage;
        //======    this.tempate deklarácia šablóny pre vytvorenie href
        this.callTemplate =  container.callTemplate;
        //======    this.fadeIn Ak je viac ako 0 - parameter pre animáciu jednotlivých detských kontajnerov
        this.fadeIn = container.fadeIn;
        //======    this.viewFields Zoznam polí tabuľky databázy, s ktorými bude objekt pracovať
        this.viewFields = container.viewFields
        //======    this.structJSON názov súboru formátu JSON pre načítaie štruktúry s ktorou bude pracovať
        this.structJSON = container.structJSON;

        //======    Slučka pre načítanie hodnôt z objektu typu otherParams - ostatné parametre
        for(let param of Object.values(otherParams) ) {
            //======    názov aktuálnej metódy aktuálne sa v  tejto inštancií nepoužíva
            this.methodName = param.methodName;
            //======    this.tester pri testovaní je možné nastaviť aby sa zobrazovali identifikačné údaje k elementom
            this.tester = param.tester;
        }
        */
    }
    
    doConstruct(data={}, container={}, otherParams={}) {
        this.data = data;
        if( Object.keys(container).length > 0) {
            for(let key of Object.keys(container)) eval('this.' + key + ' = container.' + key + ';');
        }

        if( Object.keys(otherParams).length > 0) {
            for(let key of Object.keys(otherParams)) eval('this.' + key + ' = otherParams.' + key + ';');
        }
    }
    
    
    execRender(data={}, container={}, otherParams={}) {
        
        this.doConstruct(data, container, otherParams);

        //======    Vytváram konštruktor triedy DomLevels pre prácu s metódami HTML DOM-levels (createDivElement)
        let domLevels = new DomLevels();
        let system = new System();
        let listItemsAdd = new ListItemsAdd(data, container, otherParams);

        //======    Vytváram kontajner pre zobrazenie zoznamu nehnuteľností do rodičovského kontajnera
        
        let cnt = domLevels.createDivElement(   this.parentID,
                                                this.ID, 
                                                this.tester);
        $('#'+this.ID).addClass('parent-win container '); // 
        //d-flex justify-content-center

        //======    Pridávam kontajner a naplním ho titulkou ku aktuálne zobrazenému  zoznamu
        $('#' + this.ID).append('<div id="' + this.ID + '_title"></div>');


        //$('#'+this.ID).append('<div class="border parent-title" id="'+this.ID + '_title" ></div>')
        $('#'+this.ID + '_title').addClass('border parent-title row ');
        
        let titleHTML = '';
        titleHTML += '&nbsp;&nbsp;<i class="iconTitle far fa-star"></i>&nbsp;&nbsp;&nbsp;';
        titleHTML += this.title;           
        $('#'+this.ID + '_title').html(titleHTML);
        
        //======    Inicialujem index ktorý sa bude inkrementovať pre každé vkladané okno nehnuteľnosti
        //          Spolu s názvom ID vytvára unikátny identifikátor detského kontajnera
        let index = 1;
        
        //====== Ak je fadeIn v objekte container viac ako nula inicializuje sa lokálna premenná fadeDelay 
        let fadeDelay = 0;
        if(this.fadeIn>0) {fadeDelay = this.fadeIn;}

        //======    Inicializujem ďalšie premenné row - objekt detského kontajnera, 
        //          lineRow - číslo riadku v zobrazení
        //          lineRow - číslo riadku v aktuálnom zobrazení
        //          inLineRow - číslo detského kontajnera v rámci konkrétneho riadku 
        let row = null
        let lineRow = 1;
        let inLineRow = 1;
        
        //======    Výpočet hodnoty pre Bootstrap podľa počtu položiek zobrazených v riadku, ak vlastnosť columns je viac ako 0
        //======    Vlastnosť columns nesmie mať hodnotu päť a ak je viac ako šesť, rovná sa šesť
        let col_sm = 0
        if(this.columns == 5 || this.columns > 6) {this.columns = 6;}
        if(this.columns > 0) col_sm = 12 / this.columns;
        
        //======    Pridanie interného kontajnera (row) pre zobrazenie počtu položiek v jednom riadku
        //          Počet položiek v radku sa nastavuje vo vlastnostiach objektu container (columns) v parametry konštruktora
        //          Vlastnosť columns by nemala obsahovať vyššiu hotnotu ako štyri 
        $('#'+this.ID).append('<div class="row row-win" id="' + this.ID + 'Row_'+lineRow + '"></div>')

        //======    Slučka na vkladanie detských objektov - this.data je výsledok ktorý vrátil controller
        //======    Výsledok je načítaný z databázy cez dátový objekt formátu JSON
        
        for(let data of this.data) {
            //======    Inicializácia premenných v rámci aktuálnej slučky    
            //          childId = unikátne ID detského kontajnera
            //          imgId = unikátne ID obrázku ak bude vložený 
            //          imgSrc = Zdroj obrázku ak bude vložený - názov súboru s cestou
            let childId = this.ID + "_" + index;   
            let imgId = this.ID +'_img_' + index;
            let imgSrc =  this.pathImage + data.images['image0'+data.gen_firstImage].padStart(2,'0');

            //======    Vytvára sa ďalší detský kontajner v rámci slučky - počet podľa počtu záznamov v objekte this.data
            let child = domLevels.createDivElement( this.ID + 'Row_'+lineRow,
                                                    childId,
                                                    this.tester);
            //======    Do vytvoreného detského kontajtera zobrazenej položky vložím príslušnú triedu CSS + Bootstrap
            $('#'+childId).addClass('child-win col-sm-' + col_sm + ' '); 

            //======    Ak parater zdrojového súboru obrázku obsahuje názov súboru pridá element typu IMG s obrázkom
            let hrefLink = this.callTemplate + '/' + data.gen_unique;
            let callTemplate = this.callTemplate;
            let gen_unique =  data.gen_unique;
            if(imgSrc != this.pathImage) {
                let title = '';
                
                if(this.tester) {title = 'title="IDdb: ' + data.gen_id + ' :: imgID: ' + imgId + ' :: dbID:' + data.gen_id + ' :: href: ' + hrefLink + ' :: ' + this.ID + ' :: ' + imgSrc + ' :: ' + lineRow + ' / ' + inLineRow + '"';}
                //Vloženie aktuálneho obrázku k aktuálnej položke
                $('#'+childId).append('<img src="' + imgSrc + '" ' + title + ' id="' + imgId + '" class="child-image" />');
                //======            
                $('#'+imgId).unbind(); 
                $('#'+imgId).click(function() {
                    let menuControl = new MenuControl();
                    //menuControl.clickHierarchy(callTemplate, gen_unique)
                    menuControl.call(callTemplate, gen_unique);
                    /*

                    let detail = new Detail();
                    detail.controller();
                    */
                    
/*
                    let domLevels = new DomLevels();   
                    domLevels.loadTemplate(url, 'workSpace_general');
                    console.log($('#webURL').html() + ' :: '  + hrefLink);  
                    domLevels.linkTemplate(hrefLink, $('#webURL').html());
                    let detail = new Detail();
                    detail.controller();
*/                  

                });
            }

            listItemsAdd.fetchDataEstate(   data,
                                            childId, 
                                            this.ID + '_icon_' + index, 
                                            this.structJSON.json1,
                                            this.tester,
                                            this.callTemplate);
            
            //=======   Vytvorím pole fromDB podľa parametra this.viewFields (container) s dátami prenesenými zo slučky (data)
            //let fromDB = system.getArrayFromData(this.viewFields, data);
            
            //=======   Po každom vložení detského kontajnera inkrementujem jedinečný index, 
            //          a interný index inLineRow platný v konkrétnom riadku
            ++index; ++inLineRow;
            
            //=======   Ak je this.fadeIn pre animáciu nastavený viac ako 0, zavolám animáciu 
            //          a inkrementujem parameter o svoju hodnotu
            //          Animácie je možné nastaviť aj v príslušnom kaskádovom štýle objektu tejto triedy
            if(this.fadeIn > 0) {
                $('#'+childId).fadeIn(fadeDelay);
                fadeDelay += this.fadeIn;
            }

            //=======   Ak interný inLineRow index vkladaných detských kontajnerov v rámci riadku dosiahol nastavenie max. this.columns...
            if(inLineRow>this.columns) {
                //======    Inicializuj interný inLineRow index na hodnotu jeden
                inLineRow = 1;
                //======    Inkrementuj index lineRow označujúci číslo riadku
                ++lineRow;

                //======    Pridá interný kontajner (row) pre zobrazenie počtu ďalších položiek v jednom riadku
                $('#'+this.ID).append('<div class="row row-win" id="' + this.ID + 'Row_'+lineRow + '"></div>')
                
                /*
                row = domLevels.createDivElement(  this.ID,
                                                this.ID + 'Row_'+lineRow, 
                                                this.tester);
                */
                //======    Do vytvoreného kontajtera riadku vložím príslušnú triedu Bootstrap
                $('#'+this.ID + 'Row_'+lineRow).addClass('row  row-win ');
            }
        }
        
        if((inLineRow-1) < this.columns && document.getElementById(this.ID + 'Row_'+lineRow)) {
            for(let i=(inLineRow);i<=this.columns;++i) {
                //======    dodatočne sa vytvára prázdny detský kontajner v rámci slučky - do počtu záznamov nastavených v this.columns
                $('#'+this.ID + 'Row_'+lineRow).append('<div class="col-sm-' + col_sm + '"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></div>');
            }
        }
    }
}


