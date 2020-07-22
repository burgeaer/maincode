<?php
require_once("inc_OnlineStoreDB.php");
require_once("class_OnlineStore.php");
if (class_exists("OnlineStore")) {
     $Store = new OnlineStore();
}
else {
     $ErrorMsgs[] = "The OnlineStore class is not available!";
     $Store = NULL;
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Gosselin's Gourmet Coffee</title>
</head>
<body>
<h1>Gosselin's Gourmet Coffee</h1>
<h2>Description goes here</h2>
<p>Welcome message goes here</p>
<?php
if (count($ErrorMsgs)==0) {
     $SQLstring = "SELECT * FROM inventory " .
                    "WHERE storeID='COFFEE'";
     $QueryResult = $DBConnect->query($SQLstring);
     if ($QueryResult === FALSE)
          $ErrorMsgs[] = "<p>Unable to perform the query. " .
                    "<p>Error code " . $DBConnect->errno .
                    ": " . $DBConnect->error . "</p>\n";
}

if (count($ErrorMsgs)) {
     foreach ($ErrorMsgs as $Msg) 
          echo "<p>" . $Msg . "</p>\n";
}
else {
     echo "<table width='100%'>\n";
     echo "<tr><th>Product</th><th>Description</th>" .
          "<th>Price Each</th></tr>\n";
     while (($Row = $QueryResult->fetch_assoc()) !== NULL) {
          echo "<tr><td>" . htmlentities($Row['name']) . 
               "</td>\n";
          echo "<td>" . htmlentities($Row['description']) . 
               "</td>\n";
          printf("<td>$%.2f</td></tr>\n", $Row['price']);
     }
     echo "</table>";
}
?>
</body>
</html>
<?php
if (!$DBConnect->connect_error)
     $DBConnect->close();
?>
