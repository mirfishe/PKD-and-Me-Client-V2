<?php

 echo '<p>testBEGIN</p>';

$rss = simplexml_load_file('https://www.google.com/alerts/feeds/17849810695950872924/2465476321108416249');

echo '<p>' . $rss->entry[0]->id . '</p>';
echo '<p>' . $rss->entry[0]->title . '</p>';
//echo '<p>' . $rss->entry[0]->link . '</p>';
echo '<p>' . $rss->entry[0]->published . '</p>';
echo '<p>' . $rss->entry[0]->updated . '</p>';

echo '<p>' . $rss->entry[1]->id . '</p>';
echo '<p>' . $rss->entry[1]->title . '</p>';
//echo '<p>' . $rss->entry[1]->link . '</p>';
echo '<p>' . $rss->entry[1]->published . '</p>';
echo '<p>' . $rss->entry[1]->updated . '</p>';



echo '<p>' . $rss->entry[0]->id . '<br>';
echo '<a href=' . $rss->entry[0]->link . '>' . $rss->entry[0]->title . '</a><br>';
echo $rss->entry[0]->published . '<br>';
echo $rss->entry[0]->updated . '<br>';


foreach ($rss->entry as $rssEntry) {

echo '<p>' . $rssEntry->id . '<br>';
echo '<a href=' . $rssEntry->link . '>' . $rssEntry->title . '</a><br>';
echo $rssEntry->published . '<br>';
echo $rssEntry->updated . '<br>';

//   echo '<h2><a href="'. $item->link .'">' . $item->title . "</a></h2>";
//   echo "<p>" . $item->updated . "</p>";
 echo '<p>test</p>';
} 



//###############################

//echo '<h1>'. $rss->channel->title . '</h1>';

foreach ($rss->id as $id) {
//   echo '<h2><a href="'. $item->link .'">' . $item->title . "</a></h2>";
//   echo "<p>" . $item->updated . "</p>";
 echo '<p>test</p>';
} 





 echo '<p>testEND</p>';

?>


