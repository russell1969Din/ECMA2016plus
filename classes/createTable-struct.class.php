<?php
class struct extends db {

        function __construct() {
        
        } 
        
        public function typesCreateStructureTable() {
            $aStruct    = array(); $tableName = "types";
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"typ_id",    "type"=>"int" );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"typ_note", "type"=>"varchar(30)"   );
            
            $this->drop($aStruct, false, __FILE__); $this->create($tableName, $aStruct, __FILE__);

            $aValues    = array();
            $aValues[]  = array("typ_note"=>"Garzónka");            //id = 1
            $aValues[]  = array("typ_note"=>"Jednoizbový byt");     //id = 2
            $aValues[]  = array("typ_note"=>"Dvojizbový byt");      //id = 3
            $aValues[]  = array("typ_note"=>"Štvorizbový byt");      //id = 4
            $this->insert($aStruct, $aValues, true, __FILE__, __LINE__, true);
        }        
        
        public function categoryCreateStructureTable() {
            $aStruct    = array(); $tableName = "category";
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"cat_id",    "type"=>"int" );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"cat_note", "type"=>"varchar(30)"   );
            
            $this->drop($aStruct, false, __FILE__); $this->create($tableName, $aStruct, __FILE__);

            $aValues    = array();
            $aValues[]  = array(
                "cat_note"=>"Byty"             //id = 1
            );
            $this->insert($aStruct, $aValues, true, __FILE__, __LINE__, true);
        }
        
        public function generalCreateStructureTable() {
            $aStruct    = array(); $tableName = "general";
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_id",    "type"=>"bigint"        );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_unique", "type"=>"varchar(20)"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_title", "type"=>"varchar(500)"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_firstImage", "type"=>"smallint"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_price", "type"=>"varchar(50)"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_category", "type"=>"int"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_type", "type"=>"int"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_upstair", "type"=>"float"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_note", "type"=>"varchar(5000)"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_area", "type"=>"varchar(5000)"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_virtualVideo", "type"=>"varchar(100)"   );
            
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_top", "type"=>"boolean"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_new", "type"=>"boolean"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_exclusiv", "type"=>"boolean"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_discount", "type"=>"boolean"   );
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_reserve", "type"=>"boolean"   );
            
            $aStruct[]  = array(  "table"=>$tableName, "name"=>"gen_centre", "type"=>"boolean"   );
            
            $this->drop($aStruct, false, __FILE__); $this->create($tableName, $aStruct, __FILE__);
            
            $aValues    = array();
            $aValues[]  = array(
                "gen_title"=>"REZERVOVANÉ -360° NA PREDAJ pekný 3 izbový byt na dobrej adrese neďaleko Ekonomickej univerzity",
                "gen_unique"=>randomString(20),
                "gen_firstImage"=>3,
                "gen_price"=>"12345 €",
                "gen_category"=>1,
                "gen_type"=>1,
                "gen_upstair"=>6,
                "gen_note"=>"Na predaj pekný 3 izbový byt o celkovej podlahovej ploche 69 m2 + lodžia má výmeru 4 m2. Byt sa nachádza na 1. poschodí z 12-tich. Byt má 2 samostatné izby a prechodnú obávaciu izbu. Vo vstupnej chodbe sa nachádza klimatizácia ako aj dve vstavané skrine. Byt prešiel čiastočnou rekonštrukciou - plávajúca podlaha, dlažba, plastové okná, vchodové bezpečnostné dvere, interierové dvere, stierky. Taktiež bytový dom je po rekonštrukcii - komplet zateplený, nová strecha, vstupná brána a schránky, nové výťahy - osobný a nákladný. Byt je bez tiarch.",
                "gen_area"=>"V blízkom okolí bytového domu sa nachádzajú rôzne stupne základných škôl, viacero škôlok ale aj Ekonomická univerzita, potraviny LIDL, zastávka MHD ako aj ľadový štadioń, či obľúbená hrádza pre športovcov s lesíkom pri ramene Dunaja.",
                "gen_virtualVideo"=>"https://my.matterport.com/show/?m=cNgPZsa3VX2",
                "gen_top"=>true,
                "gen_new"=>true,
                "gen_exclusiv"=>true,
                "gen_discount"=>true,
                "gen_reserve"=>true,
                "gen_centre"=>true
                
            );
            $aValues[]  = array(
                "gen_title"=>"360° NA PREDAJ 2 izbový byt v centre Stupavy",
                "gen_unique"=>randomString(20),
                "gen_firstImage"=>1,
                "gen_price"=>"92.500 €",
                "gen_category"=>1,
                "gen_type"=>2,
                "gen_upstair"=>6,
                "gen_note"=>"Na predaj 2 izbový byt v slušnom pôvodnom stavena 6 poschodí o celkovej výmere 50 m2. Byt má murované jadro, oddelenú kúpeľňu a toaletu. V byte sa nachádzajú plastové okná a plávajúca podlaha. Možnosť prerobenia podľa vlastných predstáv. K bytu prináleží okrem latkovej pivnice na prízemí aj zatvárací balkónik o výmere cca 3 m2 na medziposchodí, ktorý užíva aj susedný jeden byt. Bytový dom má vlastnú kotoľňu, čím náklady na kúrenie sú podstatne nižšie voči podobným domom a bytom v nich. Zálohový predpis pre 1 osobu je len 92 500 € za mesiac. Bytový dom prešiel rozsiahlou rekonštrukciou a je zateplený. Byt je bez tiarch a je kúpou voľný.",
                "gen_area"=>"V tesnej blízkosti bytového domu sa nachádza materská škola, nákupné centrum BILLA, potraviny CBA, cukráreň ale aj miestna riečka s menom Mláka. Pri bytovom dome je možné bez problémov parkovať.",
                "gen_virtualVideo"=>"https://my.matterport.com/show/?m=DCFoEXwzLZm",
                "gen_top"=>true,
                "gen_new"=>false,
                "gen_exclusiv"=>false,
                "gen_discount"=>true,
                "gen_reserve"=>false,
                "gen_centre"=>false
            );
            $aValues[]  = array(
                "gen_title"=>"360° NA PREDAJ 3 izbový mezonetový byt v 15 ročnom bytovom dome s vlastným parkovaním a klimatizáciou",
                "gen_unique"=>randomString(20),                
                "gen_firstImage"=>3,
                "gen_price"=>"149.000 €",
                "gen_category"=>1,
                "gen_type"=>3,
                "gen_upstair"=>3,
                "gen_note"=>"Na predaj 3 izbový mezonetový byt o výmere 81,5 m2 na 3. podlaží v 15 ročnom bytovom dome. Byt má 3,73 m2 lodžiu a 1,5 m2 murovanú pivnicu. K bytu prináleží 1 parkovacie státie v uzavretom dvore. Byt je rozdelený na spodnú časť, kde je obývacia izba spojená s kuchyňou, kúpeľňa spojená s toaletou, ďalej spálňou a vrchnú časť, ktorá je otvorená a môže slúžiť ako pracovňa, hosťovská izba, sklad, šatník, prípadne aj ako ďaľšia izba. V byte sa nachádza klimatizácia, v kúpeľni je podlahové kúrenie. Bytový dom má vlastný kotol a nemá výťah. Byt je kúpou ihneď voľný.",
                "gen_area"=>"V okolí bytového domu sa nachádzajú rodinné domy, škôlka, základná škola, súkromé slovenské gymnázium a súkromá ZŠ, zdravotné stredisko, TESCO Expres, zastávky MHD pre autobusy č. 65, 67, 75 a 79 a pre trolejbusy č. 201 a 202. Taktiež neďaleko sa nachádza aj obľúbená rekreačná zóna s parkom pri rieke Malý Dunaj.",
                "gen_virtualVideo"=>"https://my.matterport.com/show/?m=pvNcy8DzoJT",
                "gen_top"=>false,
                "gen_new"=>true,
                "gen_exclusiv"=>false,
                "gen_discount"=>true,
                "gen_reserve"=>false,
                "gen_centre"=>true
            );
            $aValues[]  = array(
                "gen_title"=>"NA PRENÁJOM 2 i byt v tichej časti Ružinova - bez provízie pre RK",
                "gen_unique"=>randomString(20),
                "gen_firstImage"=>2,
                "gen_price"=>"500,00 €/mesiac",
                "gen_category"=>1,
                "gen_type"=>4,
                "gen_upstair"=>3,
                "gen_note"=>"Na prenájom veľký 2 izbový byt na 3. podlaží, komplet zariadený - práčka, chladnička, plazmová TV, rádio, vysávač, veľký rolldor. Byt má balkón a je voľný ihneď k nasťahovaniu. Vhdoný pre pár alebo mladú rodinu. Cena nájmu pre 1 osobu vrátane základného TV súboru UPC je 500 EUR + záloha na energie pre 1 osobu je vo výške 90 EUR a cena nájmu vrátane základného TV súboru UPC je 520 EUR pre 2 osoby a záloha na energie je vo výške 100 EUR. Byt je k dispozícii ihneď.",
                "gen_area"=>"V okolí bytového domu sa nachádza veľa zelene, potraviny SAMOŠKA ako aj LIDL, výborné spojenie MHD - električky 8,9 a 17 a autobusy 67, 78 a 87.",
                "gen_virtualVideo"=>"",
                "gen_top"=>false,
                "gen_new"=>false,
                "gen_exclusiv"=>true,
                "gen_discount"=>true,
                "gen_reserve"=>true,
                "gen_centre"=>false
            );
            $aValues[]  = array(
                "gen_title"=>"NA PRENÁJOM nádherný, moderný 3 i byt s garážou v úplnom centre - províziu pre RK neplatíte",
                "gen_unique"=>randomString(20),
                "gen_firstImage"=>3,
                "gen_price"=>"980,00 €/mesiac",
                "gen_category"=>1,
                "gen_type"=>1,
                "gen_upstair"=>4,
                "gen_note"=>"Na prenájom nádherný, zrekonštruovaný a kompletne zariadený 3 izbový byt o výmere 102 m2. Byt ma 3 samostatné, nepriechodné izby, halu, kuchyňu so špajzou a samostatnú kúpeľňu s vaňou a toaletou. V kuchyni sa nachádza elektrická varná platňa, elektrická rúra, umývačka riadov, chladnička ako aj mikrovlná rúra. V každej izbe je klimatizácia a buď francúzsky balkón alebo loggia s obývacej izby. K bytu prináleží aj pivnica. Byt je vhodný pre manažéra alebo rodinu, ktorá preferuje priamo centrum mesta. Byt má nové zariadenie a nik v ňom zatiaľ nebýval. Cena nájmu je 980 EUR + záloha na energie vo výške 150 EUR. V prípade záujmu o prenájom garáže je cena zvýšená o 200 EUR. Byt je voľný ihneď a neplatíte žiadnu sprostredkovateľskú províziu pre RK. Byt je voľný ihneď.",
                "gen_area"=>"Bytový dom sa nachádza v absolútnom centre mesta s výbornou občianskou vybavenosťou BILLA, TESCO, rôzne banky a služby, MHD ako aj rýchlym dosahom k rieke Dunaj.",
                "gen_virtualVideo"=>"", 
                "gen_top"=>false,
                "gen_new"=>false,
                "gen_exclusiv"=>false,
                "gen_discount"=>true,
                "gen_reserve"=>true,
                "gen_centre"=>false

            );
             /*

            $aValues[]  = array(
                "gen_title"=>"",
                "gen_firstImage"=>,
                "gen_price"=>,
                "gen_upstair"=>,
                "gen_note"=>"",
                "gen_area"=>"",
                "gen_virtualVideo"=>""
                "gen_top"=>false,
                "gen_new"=>false,
                "gen_exclusiv"=>false,
                "gen_centre"=>true

            );
            */                
                
            $this->insert($aStruct, $aValues, true, __FILE__, __LINE__, true);                
        }
}


?>