<?php

 echo '<p>testBEGIN</p>';

/*
// These code snippets use an open-source library. http://unirest.io/php
$response = Unirest\Request::get("https://listennotes.p.mashape.com/api/v1/search?len_max=120&len_min=0&offset=0&published_after=1390190241000&published_before=1490190241000&q=%22philip+k.+dick%22&sort_by_date=1&type=episode",
  array(
    "X-Mashape-Key" => "WasrR6AMcPmshxROUOWSJ5NV2656p1vUaurjsn79OTvFFagPnV",
    "Accept" => "application/json"
  )
);
*/



// set location
$address = "Brooklyn+NY+USA";

//set map api url
$url = "http://maps.google.com/maps/api/geocode/json?address=$address";
$url = "https://listennotes.p.mashape.com/api/v1/search?len_max=120&len_min=0&offset=0&published_after=1390190241000&published_before=1490190241000&q=%22philip+k.+dick%22&sort_by_date=1&type=episode";

//call api
$json = file_get_contents($url);

 echo '<p>jsonBEGIN</p>';
 echo $json;
 echo '<p>jsonEND</p>';

$json = json_decode($json);

$lat = $json->results[0]->geometry->location->lat;
$lng = $json->results[0]->geometry->location->lng;
echo "Latitude: " . $lat . ", Longitude: " . $lng;

// output
// Latitude: 40.6781784, Longitude: -73.9441579




 echo '<p>testEND</p>';

?>


