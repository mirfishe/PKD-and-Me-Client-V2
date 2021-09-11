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


foreach ($rss->entry as $rssEntry) {

//echo $rssEntry->link['href'] . '</p>';

echo '<p>' . $rssEntry->id . '<br>';
echo '<a href=' . $rssEntry->link['href'] . '>' . $rssEntry->title . '</a><br>';
echo $rssEntry->published . '<br>';
echo $rssEntry->updated . '<br>';
echo $rssEntry->content . '</p>';

//->getElementsByTagName( "Date" ); //WRONG
//echo $xml->book[0]['category'] . "<br>";

//echo '<p>' . $rss->entry[0]->id . '</p>';
//echo '<p>' . $rss->entry[0]->title . '</p>';
//echo '<p>' . $rss->entry[0]->link['href'] . '</p>';
//echo '<p>' . $rss->entry[0]->published . '</p>';
//echo '<p>' . $rss->entry[0]->updated . '</p>';
//echo '<p>' . $rss->entry[0]->content . '</p>';

//echo '<p>' . $rss->entry[0]->id . '<br>';
//echo '<a href=' . $rss->entry[0]->link['href'] . '>' . $rss->entry[0]->title . '</a><br>';
//echo $rss->entry[0]->published . '<br>';
//echo $rss->entry[0]->updated . '<br>';
//echo $rss->entry[0]->content . '</p>';

//$entryID = $rss->entry[0]->id;
//$entryTitle = $rss->entry[0]->title;
//$entryLink = $rss->entry[0]->link['href'];
//$entryPublishDate = $rss->entry[0]->published;
//$entryUpdatedDate = $rss->entry[0]->updated;
//$entryContent = $rss->entry[0]->content;

$entryID = $rssEntry->id;
$entryTitle = $rssEntry->title;
$entryLink = $rssEntry->link['href'];
$entryPublishDate = $rssEntry->published;
$entryUpdatedDate = $rssEntry->updated;
$entryContent = $rssEntry->content;


//INSERT INTO homeopapeRSSimport
//(recordID, enteredRecord, entryID , entryTitle, entryLink, entryPublishDate , entryUpdatedDate, entryContent, display)
//(entryID , entryTitle, entryLink, entryPublishDate , entryUpdatedDate, entryContent)
//VALUES ($rssEntry[0]->id, $rssEntry[0]->title, $rssEntry[0]->link['href'], $rssEntry[0]->published, $rssEntry[0]->updated, $rssEntry[0]->content)


//delete all rows in homeopapeRSSimport [??????]
//import RSS feed
//insert new records by entryID and check entryUpdatedDate
//WHERE '$entryID' NOT IN (SELECT entryID FROM `homeopapeRSSimport`)


$sql = "INSERT INTO homeopapeRSSimport
(entryID, entryTitle, entryLink, entryPublishDate, entryUpdatedDate, entryContent)
VALUES ('$entryID', '$entryTitle', '$entryLink', '$entryPublishDate', '$entryUpdatedDate', '$entryContent')";
//WHERE '$entryID' NOT IN (SELECT entryID FROM `homeopapeRSSimport`)

echo '<p>||' . $sql . '||</p>';

//if ($conn->query($sql) === TRUE) {
//    echo "New record created successfully";
//} else {
//    echo "Error: " . $sql . "<br>" . $conn->error;
//}

} 


$conn->close();

?> 







