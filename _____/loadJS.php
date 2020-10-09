<?session_start();?>
<?
    if($_POST["protection"]!="ABNet") {die();}

    $handle = fopen('js/main.js', 'r');
    $jsCode = fread($handle, fileSize('js/main.js'));
    fclose($handle);
    
    echo $jsCode;
?>