import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "reactstrap";
import { IsEmpty, DisplayValue, GetDateTime, encodeURL, ConvertBitTrueFalse } from "../../app/sharedFunctions";

import Parser from "rss-parser";

const FromTheHomeopape = (props) => {

  const componentName = "FromTheHomeopape.js";

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect");

    fetchNews();

  }, []);


  const fetchNews = async () => {
    // console.log(componentName, GetDateTime(), "fetchNews");

    setMessage("");
    setErrorMessage("");

    // https://cors-anywhere.herokuapp.com
    // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    // let url = proxyurl;
    let url;

    // * Google Alert - Philip Dick New
    url = proxyurl + "https://www.google.com/alerts/feeds/17849810695950872924/15842463258895766468";
    // url = "https://www.google.com/alerts/feeds/17849810695950872924/15842463258895766468";
    // * Google Alert - Philip Dick
    // url = proxyurl + "https://www.google.com/alerts/feeds/17849810695950872924/2465476321108416249";
    // * Google Alert - Philip Dick All Except Web
    // * Doesn't appear to work anymore.
    // url = proxyurl + "https://www.google.com/alerts/feeds/17849810695950872924/11918400074382766835";
    // * Google Alert - Philip Dick News
    // * Doesn't appear to work anymore.
    // url = proxyurl + "https://www.google.com/alerts/feeds/17849810695950872924/17162147117770349674";

    let rssParser = new Parser({
      // * Doesn't prevent the CORS error.
      // headers: {
      //   "access-control-allow-origin": "*", "access-control-allow-methods": "GET, POST, PUT, DELETE", "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      // },
      customFields: {
        feed: ["id", "updated", "lastBuildDate"],
        item: ["updated", "contentSnippet", "isoDate", "author"], // , "author.name", "name"
      },
      xml2js: {
        emptyTag: '--EMPTY--',
      }
    });

    const feed = await rssParser.parseURL(url);

    // <feed xmlns="http://www.w3.org/2005/Atom" xmlns:idx="urn:atom-extension:indexing">
    // <id>tag:google.com,2005:reader/user/17849810695950872924/state/com.google/alerts/15842463258895766468</id>
    // <title>Google Alert - Philip Dick New</title>
    // <link href="https://www.google.com/alerts/feeds/17849810695950872924/15842463258895766468" rel="self"></link>
    // <updated>2021-06-04T16:18:45Z</updated>
    // <entry>
    // <id>tag:google.com,2013:googlealerts/feed:12501224780620368192</id>
    // <title type="html">This week in Concord history</title>
    // <link href="https://www.google.com/url?rct=j&amp;sa=t&amp;url=https://www.theconcordinsider.com/2021/06/04/this-week-in-concord-history-502/&amp;ct=ga&amp;cd=CAIyGjUwMjhiYWRmMWQ5M2MzMGE6Y29tOmVuOlVT&amp;usg=AFQjCNGc3F9NBj810v400CL5oepfu5PTwQ"></link>
    // <published>2021-06-04T14:26:15Z</published>
    // <updated>2021-06-04T14:26:15Z</updated>
    // <content type="html">Samuel Bell, on horseback, from Boscawen to the &lt;b&gt;new&lt;/b&gt; State House. ... fences to escape from the North State Street prison in Concord, &lt;b&gt;Philip Dick&lt;/b&gt;,&amp;nbsp;...</content>
    // <author>
    //     <name></name>
    // </author>;
    // </entry>

    // Notes from https://github.com/rbren/rss-parser
    // The contentSnippet field strips out HTML tags and unescapes HTML entities
    // The dc: prefix will be removed from all fields
    // Both dc:date and pubDate will be available in ISO 8601 format as isoDate
    // If author is specified, but not dc:creator, creator will be set to author (see article)
    // Atom's updated becomes lastBuildDate for consistency

    console.log(componentName, GetDateTime(), "fetchNews feed", feed);
    console.log(componentName, GetDateTime(), "fetchNews feed.id", feed.id);
    console.log(componentName, GetDateTime(), "fetchNews feed.title", feed.title);
    console.log(componentName, GetDateTime(), "fetchNews feed.link", feed.link);
    console.log(componentName, GetDateTime(), "fetchNews feed.updated", feed.updated);
    console.log(componentName, GetDateTime(), "fetchNews feed.lastBuildDate", feed.lastBuildDate);

    console.log(componentName, GetDateTime(), "fetchNews feed.feedUrl", feed.feedUrl);

    console.log(componentName, GetDateTime(), "fetchNews feed.items", feed.items);

    feed.items.forEach(item => {

      console.log(componentName, GetDateTime(), "fetchNews item.id", item.id);
      console.log(componentName, GetDateTime(), "fetchNews item.title", item.title);
      console.log(componentName, GetDateTime(), "fetchNews item.link", item.link);
      console.log(componentName, GetDateTime(), "fetchNews item.pubDate", item.pubDate);
      console.log(componentName, GetDateTime(), "fetchNews item.updated", item.updated);
      console.log(componentName, GetDateTime(), "fetchNews item.content", item.content);
      console.log(componentName, GetDateTime(), "fetchNews item.contentSnippet", item.contentSnippet);
      console.log(componentName, GetDateTime(), "fetchNews item.isoDate", item.isoDate);
      console.log(componentName, GetDateTime(), "fetchNews item.creator", item.creator);
      console.log(componentName, GetDateTime(), "fetchNews item.author", item.author);
      // console.log(componentName, GetDateTime(), "fetchNews item.author.name", item.author.name);
      // console.log(componentName, GetDateTime(), "fetchNews item.name", item.name);

    });

    //   fetch(url, {
    //     method: "GET",
    //     headers: new Headers({
    //       "Content-Type": "application/json"
    //     }),
    //   })
    //     .then(results => {
    //       console.log(componentName, GetDateTime(), "fetchNews results", results);

    //       if (!results.ok) {
    //         // throw Error(results.status + " " + results.statusText + " " + results.url);
    //       } else {
    //         // return results.json();
    //         return rssParser(results);
    //         // return results.text();
    //       };

    //     })
    //     .then(results => {
    //       console.log(componentName, GetDateTime(), "fetchNews results", results);


    //     })
    //     .catch(error => {
    //       console.log(componentName, GetDateTime(), "fetchNews error", error);
    //       setErrorMessage(error.name + ": " + error.message);

    //     });

  };


  return (
    <React.Fragment>
      {IsEmpty(message) === false ? <Alert color="info">{message}</Alert> : null}
      {IsEmpty(errorMessage) === false ? <Alert color="danger">{errorMessage}</Alert> : null}
    </React.Fragment>
  );

};

export default FromTheHomeopape;
