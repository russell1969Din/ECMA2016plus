//======    Importujeme triedu DomLevels s metódami pre prácu s HTML DOM levels  
import {DomLevels} from "../srcRoot/domLevels.js";
//======    Odkaz z každej položky zobrazenia kontajnera pomocou tohto objektu sa bude odvolávať na odkaz Detail 
import {Detail} from "../srcTemp/detail/detail.src.js";


//https://stackoverflow.com/questions/46071410/how-to-load-css-file-in-ecmascript-6 (render react)

//======    Nahráme príslušný CSS súbor s popisom nižšie
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../css/listItems.css" />');
    //  CSS current template
    //  .parent-title
    //  .parent-win 
    //  .child-win
    //  .child-image

//======    Deklarácia objektu triedy ListItems pre zobrazenie položiek ktoré Controller načítal cez JSON z databázy
export class ListItems {

    //======    Konštruktor vytvára lokálne premenné použiteľné v rámci aktuálnej triedy
    constructor(data, container, otherParams) {
        //======    this.data v objekte triedy JSON sú načítané dáta potrebné pre zobrazovanie
        this.data = data;
        //======    Slučka pre načítanie hodnôt z objektu typu container
        for(let value of Object.values(container) ) {
            //======    this.columns je nastavený počet položiek ako sa majú v riadku zobrazovať
            this.columns = value.columns;
            //======    this.iconTitle deklarácia ikonky v rámci Fontsameone ktorá sa má zobraziť pred value.title
            this.titleIcon = value.iconTitle;
            //======    this.columns je text v titulke ktorý sa má zobraziť v kontajnery s CSS tiedou parent-title
            this.title = value.title;
            //======    this.containerType typ elementu základného kotajnera s ID this.containerID
            this.containerType =  value.type;
            //======    this.containerID unikátne ID základného kotajnera 
            this.containerID =  value.id;
            //======    this.containerID unikátne ID rodičovského kotajnera do ktorého sa vyvorí celé zobrazenie
            this.containerParent =  value.parentId;
            //======    this.pathImage konštantná cesta ku zobrazovaným obrázkov
            this.pathImage =  value.pathImage;
            //======    this.tempate deklarácia šablóny pre vytvorenie href
            this.callTemplate =  value.callTemplate;
            //======    this.fadeIn Ak je viac ako 0 - parameter pre animáciu jednotlivých detských kontajnerov
            this.fadeIn = value.fadeIn;

        }
        //======    Slučka pre načítanie hodnôt z objektu typu otherParams - ostatné parametre
        for(let param of Object.values(otherParams) ) {
            //======    názov aktuálnej metódy aktuálne sa v  tejto inštancií nepoužíva
            this.methodName = param.methodName;
            //======    this.tester pri testovaní je možné nastaviť aby sa zobrazovali identifikačné údaje k elementom
            this.tester = param.tester;
        }
    }
    
    execRender() {

        //======    Vytváram konštruktor triedy DomLevels pre prácu s metódami HTML DOM-levels (createElement)
        let domLevels = new DomLevels();

        //======    Vytváram kontajner pre zobrazenie zoznamu nehnuteľností do rodičovského kontajnera
        
        let cnt = domLevels.createElement(  this.containerParent,
                                            this.containerType,
                                            this.containerID, 
                                            this.tester);
        
        //======    Pridávam kontajner a naplním ho titulkou ku aktuálne zobrazenému  zoznamu
        $('#'+this.containerID).addClass('parent-win');
        let ttl = domLevels.createElement(  this.containerID,
                                            this.containerType,
                                            this.containerID + '_title',
                                            this.tester);
        $('#'+this.containerID + '_title').addClass('parent-title');
        let titleHTML = '';
        titleHTML += '<i class="far fa-star"></i>&nbsp;&nbsp;&nbsp;';
        titleHTML += this.title;
        $('#'+this.containerID + '_title').html(titleHTML);
        
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
        row = domLevels.createElement(  this.containerID,
                                        'div',
                                        this.containerID + 'Row_'+lineRow,
                                        this.tester);
        //======    Do vytvoreného kontajtera riadku vložím príslušnú triedu Bootstrap
        $('#' + this.containerID + 'Row_'+lineRow).addClass('row');
        
        //======    Slučka na vkladanie detských objektov - this.data je výsledok ktorý vrátil controller
        //======    Výsledok je načítaný z databázy cez dátový objekt formátu JSON
        
        for(let data of this.data) {
            //======    Inicializácia premenných v rámci aktuálnej slučky    
            //          childId = unikátne ID detského kontajnera
            //          imgId = unikátne ID obrázku ak bude vložený 
            //          imgSrc = Zdroj obrázku ak bude vložený - názov súboru s cestou
            let childId = this.containerID + "_" + index;   
            let imgId = this.containerID +'_img_' + index;
            let imgSrc =  this.pathImage + data.images['image0'+data.gen_firstImage].padStart(2,'0');

            //======    Vytvára sa ďalší detský kontajner v rámci slučky - počet podľa počtu záznamov v objekte this.data
            let child = domLevels.createElement(    this.containerID + 'Row_'+lineRow,
                                                    'div',
                                                    childId,
                                                    this.tester);
            //======    Do vytvoreného detského kontajtera zobrazenej položky vložím príslušnú triedu CSS + Bootstrap
            $('#'+childId).addClass('child-win col-sm-' + col_sm + ' '); 

            //======    Ak parater zdrojového súboru obrázku obsahuje názov súboru pridá element typu IMG s obrázkom
           if(imgSrc != this.pathImage) {
                let title = '';
                let hrefLink = this.callTemplate + '/' + data.gen_unique;   // + '/' + 
                if(this.tester) {title = 'title="imgID: ' + imgId + ' :: dbID:' + data.gen_id + ' :: href: ' + hrefLink + ' :: ' + this.containerID + ' :: ' + imgSrc + ' :: ' + lineRow + ' / ' + inLineRow + '"';}
                //Vloženie aktuálneho obrázku k aktuálnej položke
                $('#'+childId).append('<img src="' + imgSrc + '" ' + title + ' id="' + imgId + '" class="child-image" />');
                //======        
                $('#'+imgId).unbind(); 
                $('#'+imgId).click(function() {
                    domLevels.linkTemplate(hrefLink, $('#webURL').html());
                    let detail = new Detail();
                    detail.controller();
                });
                
                //$('#'+imgId).addClass('child-image');
            }
                     
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
                row = domLevels.createElement(  this.containerID,
                                                'div',
                                                this.containerID + 'Row_'+lineRow, 
                                                this.tester);
                //======    Do vytvoreného kontajtera riadku vložím príslušnú triedu Bootstrap
                $('#'+this.containerID + 'Row_'+lineRow).addClass('row');
            }
        }
        
        if((inLineRow-1) < this.columns && document.getElementById(this.containerID + 'Row_'+lineRow)) {
            for(let i=(inLineRow);i<=this.columns;++i) {
                //======    dodatočne sa vytvára prázdny detský kontajner v rámci slučky - do počtu záznamov nastavených v this.columns
                $('#'+this.containerID + 'Row_'+lineRow).append('<div class="col-sm-' + col_sm + '"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></div>');
            }
        }
    }
}


