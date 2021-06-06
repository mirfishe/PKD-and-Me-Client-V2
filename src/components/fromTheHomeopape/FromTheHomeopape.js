import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "reactstrap";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, encodeURL, ConvertBitTrueFalse } from "../../app/sharedFunctions";

// * https://www.npmjs.com/package/rss-parser
// * https://github.com/rbren/rss-parser
import Parser from "rss-parser";

const FromTheHomeopape = (props) => {

  const componentName = "FromTheHomeopape.js";

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [feedItems, setFeedItems] = useState([]);
  const [feedItems2, setFeedItems2] = useState([]);
  const [homeopapeItems, setHomeopapeItems] = useState([]);

  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect");

    // fetchNews();
    // fetchNews2();

    let url = baseURL + "fromthehomeopape";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
    })
      .then(results => {
        // console.log(componentName, GetDateTime(), "fetchNews results", results);

        if (!results.ok) {
          // throw Error(results.status + " " + results.statusText + " " + results.url);
        } else {
          return results.json();
          // return results.text();
        };

      })
      .then(results => {
        console.log(componentName, GetDateTime(), "fetchNews results", results);

        if (results.resultsFound === true) {

          setHomeopapeItems(results.records);

        };


      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "fetchNews error", error);
        setErrorMessage(error.name + ": " + error.message);

      });

  }, []);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect feedItems", feedItems);

    if (IsEmpty(feedItems) === false) {

      let url = baseURL + "fromthehomeopape/";

      for (let i = 0; i < feedItems.length; i++) {

        let recordObject = {
          feedID: feedItems[i].feedID,
          feedTitle: feedItems[i].feedTitle,
          feedLink: feedItems[i].feedLink,
          feedUpdated: feedItems[i].feedUpdated,
          feedLastBuildDate: feedItems[i].feedLastBuildDate,
          feedUrl: feedItems[i].feedUrl,
          itemID: feedItems[i].itemID,
          itemTitle: feedItems[i].itemTitle,
          itemLink: feedItems[i].itemLink,
          itemPubDate: feedItems[i].itemPubDate,
          itemUpdated: feedItems[i].itemUpdated,
          itemContent: feedItems[i].itemContent,
          itemContentSnippet: feedItems[i].itemContentSnippet,
          itemISODate: feedItems[i].itemISODate,
          itemCreator: feedItems[i].itemCreator,
          itemAuthor: feedItems[i].itemAuthor
        };

        let headerObject = new Headers({ "Content-Type": "application/json" });

        fetch(url, {
          method: "POST",
          headers: headerObject,
          body: JSON.stringify({ recordObject: recordObject })
        })
          .then(response => {
            // console.log(componentName, GetDateTime(), "fetchNews response", response);
            // if (!response.ok) {
            //     throw Error(response.status + " " + response.statusText + " " + response.url);
            // } else {
            // if (response.status === 200) {
            return response.json();
            // } else {
            //     return response.status;
            // };
            // };
          })
          .then(data => {
            console.log(componentName, GetDateTime(), "fetchNews data", data);

          })
          .catch(error => {
            console.log(componentName, GetDateTime(), "fetchNews error", error);
            // console.log(componentName, GetDateTime(), "fetchNews error.name", error.name);
            // console.log(componentName, GetDateTime(), "fetchNews error.message", error.message);
            // addErrorMessage(error.name + ": " + error.message);
          });

      };

    };

  }, [feedItems]);


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

    let itemsArray = [];

    feed.items.forEach(item => {

      let feedObject = {
        feedID: feed.id,
        feedTitle: feed.title,
        feedLink: feed.link,
        feedUpdated: feed.updated,
        feedLastBuildDate: feed.lastBuildDate,
        feedUrl: feed.feedUrl,
        itemID: item.id,
        itemTitle: item.title,
        itemLink: item.link,
        itemPubDate: item.pubDate,
        itemUpdated: item.updated,
        itemContent: item.content,
        itemContentSnippet: item.contentSnippet,
        itemISODate: item.isoDate,
        itemCreator: item.creator,
        itemAuthor: item.author
      };

      itemsArray.push(feedObject);

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

      // console.log(componentName, GetDateTime(), "fetchNews itemsArray", itemsArray);

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

    });

    console.log(componentName, GetDateTime(), "fetchNews itemsArray", itemsArray);

    setFeedItems(itemsArray);

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect feedItems2", feedItems2);

    if (IsEmpty(feedItems2) === false) {

      let url = baseURL + "fromthehomeopape/";

      for (let i = 0; i < feedItems2.length; i++) {

        let recordObject = {
          feedID: feedItems2[i].feedID,
          feedTitle: feedItems2[i].feedTitle,
          feedLink: feedItems2[i].feedLink,
          feedUpdated: feedItems2[i].feedUpdated,
          feedLastBuildDate: feedItems2[i].feedLastBuildDate,
          feedUrl: feedItems2[i].feedUrl,
          itemID: feedItems2[i].itemID,
          itemTitle: feedItems2[i].itemTitle,
          itemLink: feedItems2[i].itemLink,
          itemPubDate: feedItems2[i].itemPubDate,
          itemUpdated: feedItems2[i].itemUpdated,
          itemContent: feedItems2[i].itemContent,
          itemContentSnippet: feedItems2[i].itemContentSnippet,
          itemISODate: feedItems2[i].itemISODate,
          itemCreator: feedItems2[i].itemCreator,
          itemAuthor: feedItems2[i].itemAuthor
        };

        let headerObject = new Headers({ "Content-Type": "application/json" });

        fetch(url, {
          method: "POST",
          headers: headerObject,
          body: JSON.stringify({ recordObject: recordObject })
        })
          .then(response => {
            // console.log(componentName, GetDateTime(), "fetchNews response", response);
            // if (!response.ok) {
            //     throw Error(response.status + " " + response.statusText + " " + response.url);
            // } else {
            // if (response.status === 200) {
            return response.json();
            // } else {
            //     return response.status;
            // };
            // };
          })
          .then(data => {
            console.log(componentName, GetDateTime(), "fetchNews data", data);

          })
          .catch(error => {
            console.log(componentName, GetDateTime(), "fetchNews error", error);
            // console.log(componentName, GetDateTime(), "fetchNews error.name", error.name);
            // console.log(componentName, GetDateTime(), "fetchNews error.message", error.message);
            // addErrorMessage(error.name + ": " + error.message);
          });

      };

    };

  }, [feedItems2]);


  const fetchNews2 = async () => {
    // console.log(componentName, GetDateTime(), "fetchNews");

    setMessage("");
    setErrorMessage("");

    // https://cors-anywhere.herokuapp.com
    // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    // let url = proxyurl;
    let url;

    // * Google Alert - Philip Dick New
    // url = proxyurl + "https://www.google.com/alerts/feeds/17849810695950872924/15842463258895766468";
    // url = "https://www.google.com/alerts/feeds/17849810695950872924/15842463258895766468";
    // * Google Alert - Philip Dick
    url = proxyurl + "https://www.google.com/alerts/feeds/17849810695950872924/2465476321108416249";
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

    let itemsArray = [];

    feed.items.forEach(item => {

      let feedObject = {
        feedID: feed.id,
        feedTitle: feed.title,
        feedLink: feed.link,
        feedUpdated: feed.updated,
        feedLastBuildDate: feed.lastBuildDate,
        feedUrl: feed.feedUrl,
        itemID: item.id,
        itemTitle: item.title,
        itemLink: item.link,
        itemPubDate: item.pubDate,
        itemUpdated: item.updated,
        itemContent: item.content,
        itemContentSnippet: item.contentSnippet,
        itemISODate: item.isoDate,
        itemCreator: item.creator,
        itemAuthor: item.author
      };

      itemsArray.push(feedObject);

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

      // console.log(componentName, GetDateTime(), "fetchNews itemsArray", itemsArray);

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

    });

    console.log(componentName, GetDateTime(), "fetchNews itemsArray", itemsArray);

    setFeedItems2(itemsArray);

  };


  // DROP TABLE IF EXISTS`homeopapeRSSImport`;
  // CREATE TABLE IF NOT EXISTS`homeopapeRSSImport`(
  //   `homeopapeID` int NOT NULL AUTO_INCREMENT,
  //   `createDate` datetime DEFAULT CURRENT_TIMESTAMP,
  //   `feedID` varchar(100) DEFAULT NULL,
  //   `feedTitle` varchar(1000) DEFAULT NULL,
  //   `feedLink` varchar(1000) DEFAULT NULL,
  //   `feedUpdated` datetime DEFAULT NULL,
  //   `feedLastBuildDate` datetime DEFAULT NULL,
  //   `feedUrl` varchar(1000) DEFAULT NULL,
  //   `itemID` varchar(100) DEFAULT NULL,
  //   `itemTitle` varchar(1000) DEFAULT NULL,
  //   `itemLink` varchar(1000) DEFAULT NULL,
  //   `itemPubDate` datetime DEFAULT NULL,
  //   `itemUpdated` datetime DEFAULT NULL,
  //   `itemContent` varchar(2000) DEFAULT NULL,
  //   `itemContentSnippet` varchar(2000) DEFAULT NULL,
  //   `itemISODate` datetime DEFAULT NULL,
  //   `itemCreator` varchar(2000) DEFAULT NULL,
  //   `itemAuthor` varchar(2000) DEFAULT NULL,
  //   PRIMARY KEY(`homeopapeID`)
  // ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

  // DROP TABLE IF EXISTS `homeopaperss`;
  // CREATE TABLE IF NOT EXISTS `homeopaperss` (
  //   `homeopapeID` int NOT NULL AUTO_INCREMENT,
  //   `createDate` datetime DEFAULT CURRENT_TIMESTAMP,
  //   `display` tinyint DEFAULT '0',
  //   `feedID` varchar(100) DEFAULT NULL,
  //   `feedTitle` varchar(1000) DEFAULT NULL,
  //   `feedLink` varchar(1000) DEFAULT NULL,
  //   `feedUpdated` datetime DEFAULT NULL,
  //   `feedLastBuildDate` datetime DEFAULT NULL,
  //   `feedUrl` varchar(1000) DEFAULT NULL,
  //   `itemID` varchar(100) DEFAULT NULL,
  //   `itemTitle` varchar(1000) DEFAULT NULL,
  //   `itemLink` varchar(1000) DEFAULT NULL,
  //   `itemPubDate` datetime DEFAULT NULL,
  //   `itemUpdated` datetime DEFAULT NULL,
  //   `itemContent` varchar(2000) DEFAULT NULL,
  //   `itemContentSnippet` varchar(2000) DEFAULT NULL,
  //   `itemISODate` datetime DEFAULT NULL,
  //   `itemCreator` varchar(2000) DEFAULT NULL,
  //   `itemAuthor` varchar(2000) DEFAULT NULL,
  //   PRIMARY KEY (`homeopapeID`)
  // ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



  return (
    <React.Fragment>
      {IsEmpty(message) === false ? <Alert color="info">{message}</Alert> : null}
      {IsEmpty(errorMessage) === false ? <Alert color="danger">{errorMessage}</Alert> : null}

      {homeopapeItems.map((homeopapeItem, index) => {

        let display = true;

        if (homeopapeItem.itemLink.includes("ebay")) {
          display = false;
        };

        if (homeopapeItem.itemLink.includes("reddit")) {
          display = false;
        };

        if (homeopapeItem.itemLink.includes("pinterest")) {
          display = false;
        };

        let itemLink;
        let param = "";
        let regExp = "";

        if (IsEmpty(homeopapeItem) === false && IsEmpty(homeopapeItem.itemLink) === false) {
          itemLink = homeopapeItem.itemLink.replaceAll("https://www.google.com/url?rct=j&sa=t&url=", "");

          // * Remove &ct=ga&cd=CAIyGjFhOTgyNzMwYWNlOTE1ZDI6Y29tOmVuOlVT&usg=AFQjCNEhFPEPL8--91umtz1jWdrmBW2JZQ
          // * Google
          // * Removes everything after the ct=
          // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537
          param = "ct";
          regExp = new RegExp("[?&]" + param + "=.*$");
          itemLink = itemLink.replace(regExp, "");

        };

        return (
          <React.Fragment>
            { display === true ?
              <p key={homeopapeItem.itemID}>
                <div dangerouslySetInnerHTML={{ "__html": homeopapeItem.itemTitle }} />
                <a href={itemLink} target="_blank">{itemLink}</a><br />
                {homeopapeItem.itemContentSnippet}<br />
              </p>
              : null}
          </React.Fragment>
        );
      })}

    </React.Fragment>
  );

};

export default FromTheHomeopape;
