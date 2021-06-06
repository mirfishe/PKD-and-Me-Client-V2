<?php


// Set Up Database Connection Variables
$servername = "mrfisher3.db.8328930.hostedresource.com";
$username = "mrfisher3";
$password = "Trustno1";
$dbname = "mrfisher3";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Set Up RSS Feed
$rss = simplexml_load_file('https://www.google.com/alerts/feeds/17849810695950872924/2465476321108416249');


//Delete Old Records
$deleteSQL = "DELETE FROM homeopapeRSSimport";

if ($conn->query($deleteSQL) === TRUE) {
	$connectionError = $conn->error;
    $resultsql = "INSERT INTO homeopapeRSSimportLog
    (sqlStatement, sqlResult, sqlErrorSuccess)
    VALUES ('$deleteSQL', '$connectionError', 'success')";
    if ($conn->query($resultsql) === TRUE) {
        echo "All records deleted successfully";
    } else {
        echo "Error: " . $resultsql . "<br>" . $conn->error;
    }
} else {
	$connectionError = $conn->error;
    $resultsql = "INSERT INTO homeopapeRSSimportLog
    (sqlStatement, sqlResult, sqlErrorSuccess)
    VALUES ('$deleteSQL', '$connectionError', 'error')";
    if ($conn->query($resultsql) === TRUE) {
        echo "Error: " . $deleteSQL . "<br>" . $conn->error;
    } else {
        echo "Error: " . $resultsql . "<br>" . $conn->error;
    }
}

foreach ($rss->entry as $rssEntry) {


// Set Variables Inside foreach loop
$entryID = $rssEntry->id;
$entryTitle = $rssEntry->title;
$entryLink = $rssEntry->link['href'];
$entryPublishDate = $rssEntry->published;
$entryUpdatedDate = $rssEntry->updated;
$entryContent = $rssEntry->content;


// Create SQL statement
$readSQL = addslashes("INSERT INTO homeopapeRSSimport
(entryID, entryTitle, entryLink, entryPublishDate, entryUpdatedDate, entryContent)
VALUES ('$entryID', '$entryTitle', '$entryLink', '$entryPublishDate', '$entryUpdatedDate', '$entryContent')");

if ($conn->query($readSQL) === TRUE) {
	$connectionError = addslashes($conn->error);
    $resultsql = "INSERT INTO homeopapeRSSimportLog
    (sqlStatement, sqlResult, sqlErrorSuccess)
    VALUES ('$readSQL', '$connectionError', 'success')";
//    (sqlResult, sqlErrorSuccess)
//    VALUES ('$connectionError', 'success')";
    if ($conn->query($resultsql) === TRUE) {
        echo "All records imported successfully";
    } else {
        echo "Error: " . $resultsql . "<br>" . $conn->error;
    }
} else {
	$connectionError = addslashes($conn->error);
    $resultsql = "INSERT INTO homeopapeRSSimportLog
    (sqlStatement, sqlResult, sqlErrorSuccess)
    VALUES ('$readSQL', 'addslashes($connectionError)', 'error')";
//    (sqlResult, sqlErrorSuccess)
//    VALUES ('$connectionError', 'success')";
    if ($conn->query($resultsql) === TRUE) {
        echo "Error: " . $readSQL . "<br>" . $conn->error;
    } else {
        echo "Error: " . $resultsql . "<br>" . $conn->error;
    }
}

}

//Insert New Records
$insertSQL = addslashes("INSERT INTO homeopapeRSS
(entryID, entryTitle, entryLink, entryPublishDate, entryUpdatedDate, entryContent)
SELECT entryID, entryTitle, entryLink, entryPublishDate, entryUpdatedDate, entryContent FROM homeopapeRSSimport
WHERE  homeopapeRSSimport.entryID NOT IN (SELECT entryID FROM homeopapeRSS)");

if ($conn->query($insertSQL) === TRUE) {
	$connectionError = addslashes($conn->error);
    $resultsql = "INSERT INTO homeopapeRSSimportLog
    (sqlStatement, sqlResult, sqlErrorSuccess)
    VALUES ('addslashes($insertSQL)', 'addslashes($connectionError)', 'success')";
//    (sqlResult, sqlErrorSuccess)
//    VALUES ('$connectionError', 'success')";
    if ($conn->query($resultsql) === TRUE) {
        echo "All records copied over successfully";
    } else {
        echo "Error: " . $resultsql . "<br>" . $conn->error;
    }
} else {
	$connectionError = addslashes($conn->error);
    $resultsql = "INSERT INTO homeopapeRSSimportLog
    (sqlStatement, sqlResult, sqlErrorSuccess)
    VALUES ('addslashes($insertSQL)', 'addslashes($connectionError)', 'error')";
//    (sqlResult, sqlErrorSuccess)
//    VALUES ('$connectionError', 'success')";
    if ($conn->query($resultsql) === TRUE) {
        echo "Error: " . $insertSQL . "<br>" . $conn->error;
    } else {
        echo "Error: " . $resultsql . "<br>" . $conn->error;
    }
}


$conn->close();

?> 







