<?session_start();?>
<?php
    if($_POST["protection"]!="ABNet") {die();}
    
    if(is_file("service.php")) {include("service.php");}
    if(is_file("library.php")) {include("library.php");}
    $_SESSION["SYSTEM_ROOT"]    = getSystemRoot();
    $_SESSION["PROJECT_INFO"]   = $_SESSION["SYSTEM_ROOT"]."/setsParam.php";
    if(is_file($_SESSION["PROJECT_INFO"])) {include($_SESSION["PROJECT_INFO"]);}    

    $db  = _constructClass("db");  

    $handle = fopen($_POST['filePathName'], 'r');
    $index  = 0;
    $record = false;
    $readKeys = true;
    $aValues = $aKeys = $aFirst = array();
    $comma = '';
    while(! feof($handle))
    {
        $line = fgets($handle);

        if(strPos('~'.$line, '}') && $record)   {   
            $eCode .= ');';
            eval($eCode);
            $eCode = '';
            $record = false; 
            $readKeys = false; 
        }
        
        if($record) {
            $aLine = explode(":", $line);
            if(strLen(Trim($eCode))==0) {$eCode = '$aValues[] = array(';}
            if($readKeys) {
                $start = strPos($aLine[0], '"')+1;
                $stop = strRPos($aLine[0], '"', );
                $aKeys[] = substr($_POST['tableName'],0,3).'_'.substr($aLine[0],$start,$stop-$start);
            }
            
            if(!strPos($aLine[1],'"')) {$value = '"'.trim(str_Replace(',', '', $aLine[1])).'"';} else {$value = trim(str_Replace(',', '', $aLine[1]));}
            if($readKeys) {
                $aFirst[] = str_replace('"', '', $value);
            }   
            
            $eCode .= $comma.'"'.$aKeys[$subIndex].'"=>'.$value; ++$subIndex;
            $comma = ', ';
        }
        
        if(strPos('~'.$line, '{') && !$record)  {$record = true; $subIndex = 0; $comma = ''; $eCode='';}        
        ++$index;
    }
    fclose($handle);

        
    $aStruct = array(); 
    $tableName = $_POST["tableName"];

    $index = 0;
    foreach($aKeys as $key) {
       if(is_numeric($aFirst[$index])) {$type = 'int'; } else {$type = 'varchar(300)'; }
        $eCode = '$aStruct[] = array("table"=>"'.$tableName.'", "name"=>"'.$key.'", "type"=>"'.$type.'");';
        eval($eCode);
        ++$index;
    }
    $db->drop($aStruct, false, __FILE__); $db->create($tableName, $aStruct, __FILE__);    
    $db->insert($aStruct, $aValues, true, __FILE__, __LINE__, true);

//temporary
function getSystemRoot() {
        
    $lastPath=getCWD();
    if(is_file("index.php")) {return(getCWD());}
    $aDir = explode("/",getCWD());
    $index = Count($aDir);   
    for($x=0;$x<10;++$x)    {
        if( is_file("index.php") )    {$lastSystemRoot=$systemRoot;}
        $systemRoot=""; for($i=1;$i<($index-1);++$i)  {$systemRoot.="/".$aDir[$i];    } --$index;
        if(!@chDir($systemRoot)) {break;} 
    }
    chDir($lastPath);
    return($lastSystemRoot);
}
?>

