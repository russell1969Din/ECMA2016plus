<?session_start();?>

<script>
    if(window.location.href.indexOf('https://')==(-1)) {
        window.location.href = window.location.href.replace('http://', 'https://');
    }
    
    let aPath = window.location.href.split('/');
    if((window.location.href.match(/\//g) || []).length<4 && aPath[3].length==0) {
        window.location.href += 'home';
    }
    

    
</script>

<!DOCTYPE html>
<html>

<head>
    <meta http-equiv='cache-control' content='no-cache, no-store, must-revalidate'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>

    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <link rel="shortcut icon" type="image/x-icon" href="icon.jpg" />
    <!--<link rel="stylesheet" href="css/listEstate.css">-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Property - responzívna šablóna</title>
<?
    if(is_file("service.php")) {include("service.php");}
    if(is_file("library.php")) {include("library.php");}    

    $_SESSION["SYSTEM_ROOT"]    = getSystemRoot();
    $_SESSION["PROJECT_INFO"]   = $_SESSION["SYSTEM_ROOT"]."/setsParam.php";
    if(is_file($_SESSION["PROJECT_INFO"])) {include($_SESSION["PROJECT_INFO"]);}
    
    $json = "json/".$_SERVER['REMOTE_ADDR'].".json";
    
?>    
</head>

<body>
    <span id="lastURL" style="display:none;"></span>
    <span id="currentURL" style="display:none;"></span>
    <span id="webURL" style="display:none;"></span>
    
    <span id="json" style="display:none;"></span>
    <span id="existJSON" style="display:none;"></span>
    
    <div id="workSpace_general"></div>
    <script id="main"  src="/srcRoot/main.js" type="module"></script>
     
</body>

<script>

$('#lastURL').html(window.location.href);
$('#currentURL').html(window.location.href);
$('#webURL').html(getWEBPath());
  

function getWEBPath() {
    let aPath = $('#currentURL').html().split('/');
    return aPath[0] + '//' +  aPath[2];
}

function getFragmentPath(locHref) {
    let aPath = $('#currentURL').html().split('/');
    let index = 1; 
    let after = false;
    let retHref=1;
    for(let fragment of aPath) {
        if(index==4) {after=!after;}
        if(locHref == retHref && after) return fragment;
        if(after) ++retHref; 
        ++index;
    }
}

function getAllPath() {
    let aPath = $('#currentURL').html().split('/');
    let index = 1; 
    let after = false;
    let retHref=1;
    let allPath = '';
    for(let fragment of aPath) {
        if(index==4) {after=true;}  
        console.log(after);
        if(after) allPath += '/' + fragment;
        ++index;
    }
    return allPath;
}

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function getSumAscii(string) {
    let count = 0;
    for(let i=0;i<string.length;i++) {
        count += string.charCodeAt(i);
    }
    return count;
}


</script>


<?
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