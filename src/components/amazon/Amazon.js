import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row } from "reactstrap";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, formatLowerCase, removeHTML } from "shared-functions";
// import { addErrorLog } from "../../utilities/ApplicationFunctions";
import AmazonItem from "./AmazonItem";

const Amazon = () => {

  const componentName = "Amazon";

  const navigate = useNavigate();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, getDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, getDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;
  // console.log(componentName, getDateTime(), "baseURL", baseURL);

  const siteName = useSelector(state => state.applicationSettings.siteName);
  const applicationName = useSelector(state => state.applicationSettings.applicationName);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [amazonMerchants, setAmazonMerchants] = useState("Amazon");

  const [amazonItemsCategory, setAmazonItemsCategory] = useState("PhilipKDick");

  const [amazonItems, setAmazonItems] = useState([]);
  const [amazonItemsViewed, setAmazonItemsViewed] = useState([]);
  const [amazonItemsPhilipKDick, setAmazonItemsPhilipKDick] = useState([]);
  const [amazonItemsPhilipKDickViewed, setAmazonItemsPhilipKDickViewed] = useState([]);
  const [amazonItemsPhilipKDickPublicDomain, setAmazonItemsPhilipKDickPublicDomain] = useState([]);
  const [amazonItemsPhilipKDickPublicDomainViewed, setAmazonItemsPhilipKDickPublicDomainViewed] = useState([]);
  const [amazonItemsBladeRunner, setAmazonItemsBladeRunner] = useState([]);
  const [amazonItemsBladeRunnerViewed, setAmazonItemsBladeRunnerViewed] = useState([]);
  const [amazonItemsTotalRecall, setAmazonItemsTotalRecall] = useState([]);
  const [amazonItemsTotalRecallViewed, setAmazonItemsTotalRecallViewed] = useState([]);
  const [amazonItemsMinorityReport, setAmazonItemsMinorityReport] = useState([]);
  const [amazonItemsMinorityReportViewed, setAmazonItemsMinorityReportViewed] = useState([]);
  const [amazonItemsTMITHC, setAmazonItemsTMITHC] = useState([]);
  const [amazonItemsTMITHCViewed, setAmazonItemsTMITHCViewed] = useState([]);
  const [amazonItemsNoCategory, setAmazonItemsNoCategory] = useState([]);
  const [amazonItemsNoCategoryViewed, setAmazonItemsNoCategoryViewed] = useState([]);
  const [amazonItemsIncorrectContext, setAmazonItemsIncorrectContext] = useState([]);
  const [amazonItemsIncorrectContextViewed, setAmazonItemsIncorrectContextViewed] = useState([]);

  document.title = "Amazon | " + applicationName + " | " + siteName;


  useEffect(() => {

    // if (amazonMerchants === "AllMerchants") {

    //   getAmazonItemsAll();

    // } else {

    getAmazonItems();

    // };


  }, [amazonMerchants]);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect check for admin", admin);

    if (admin !== true) {

      navigate("/");

    };

  }, [admin]);


  // SELECT * FROM logs WHERE componentName = 'amazon-controller'

  // INSERT INTO amazon(ASIN, titleName, authorName, publicationDate, imageName, textLinkFull)
  // SELECT DISTINCT ASIN, titleName, authorName, publicationDate, imageName, textLinkFull FROM amazonImport
  // WHERE ASIN NOT IN(SELECT ASIN FROM amazon)
  // AND ASIN NOT IN(SELECT ASIN FROM editions)

  // -- UPDATE
  // SELECT * FROM
  // amazon
  // -- SET merchant = 'Amazon'
  // WHERE ASIN IN (SELECT ASIN FROM `amazonImport` WHERE searchIndex IN ('KindleStore', 'AmazonVideo', 'DigitalMusic', 'MobileApps'))

  // -- DELETE
  // SELECT *
  // FROM amazon
  // WHERE ASIN IN (SELECT ASIN FROM editions)

  // UPDATE amazon
  // SET active = 0,
  // viewed = 1
  // where active = 0

  // UPDATE amazon
  // SET active = 0,
  // viewed = 1
  // where authorName like '%Abnett, Dan%'

  // ! Need to account for changing images. -- 02/21/2022 MF
  // SELECT DISTINCT amazonImport.createDate, amazon.* FROM amazon
  // INNER JOIN amazonImport ON amazonImport.ASIN = amazon.ASIN
  // WHERE amazon.ASIN IN
  // (SELECT ASIN FROM amazon
  // group by ASIN
  // HAVING COUNT(*) > 1)
  // ORDER BY amazon.ASIN, amazonImport.createDate

  // -- SELECT amazonImport.ASIN, amazonSource.ASIN, amazonImport.publicationDate, amazonSource.publicationDate;
  // -- FROM amazonImport;
  // -- UPDATE amazonImport
  // INNER JOIN amazonImport AS amazonSource ON amazonImport.ASIN = amazonSource.ASIN AND amazonSource.publicationDate IS NOT NULL;
  // -- SET amazonImport.publicationDate = amazonSource.publicationDate
  // WHERE amazonImport.publicationDate IS NULL;

  // -- SELECT amazonImport.ASIN, amazonSource.ASIN, amazonImport.titleName, amazonSource.titleName
  // -- FROM amazonImport
  // -- UPDATE amazonImport
  // INNER JOIN amazonImport AS amazonSource ON amazonImport.ASIN = amazonSource.ASIN AND amazonSource.titleName IS NOT NULL
  // -- SET amazonImport.titleName = amazonSource.titleName
  // WHERE amazonImport.titleName IS NULL

  // -- SELECT amazon.ASIN, amazonSource.ASIN, amazon.publicationDate, amazonSource.publicationDate
  // -- FROM amazon
  // -- UPDATE amazon
  // INNER JOIN amazonImport AS amazonSource ON amazon.ASIN = amazonSource.ASIN AND amazonSource.publicationDate IS NOT NULL
  // -- SET amazon.publicationDate = amazonSource.publicationDate
  // WHERE amazon.publicationDate IS NULL

  // -- SELECT amazon.ASIN, amazonSource.ASIN, amazon.titleName, amazonSource.titleName
  // -- FROM amazon
  // -- UPDATE amazon
  // INNER JOIN amazonImport AS amazonSource ON amazon.ASIN = amazonSource.ASIN AND amazonSource.titleName IS NOT NULL
  // -- SET amazon.titleName = amazonSource.titleName
  // WHERE amazon.titleName IS NULL


  const filterAmazonItems = (amazonItems) => {

    // console.log(componentName, getDateTime(), "filterAmazonItems amazonItems", amazonItems);

    let newAmazonItems = [...amazonItems];
    let newAmazonItemsViewed = [...amazonItems];
    // let newAmazonItems = amazonItems.filter(item => item.viewed === false || item.viewed === 0);
    // let newAmazonItemsViewed = amazonItems.filter(item => item.viewed === true || item.viewed === 1);
    // let newAmazonItems = [];
    // let newAmazonItemsViewed = [];

    let newAmazonItemsPhilipKDick = [];
    let newAmazonItemsPhilipKDickViewed = [];
    let newAmazonItemsPhilipKDickPublicDomain = [];
    let newAmazonItemsPhilipKDickPublicDomainViewed = [];
    let newAmazonItemsBladeRunner = [];
    let newAmazonItemsBladeRunnerViewed = [];
    let newAmazonItemsTotalRecall = [];
    let newAmazonItemsTotalRecallViewed = [];
    let newAmazonItemsMinorityReport = [];
    let newAmazonItemsMinorityReportViewed = [];
    let newAmazonItemsTMITHC = [];
    let newAmazonItemsTMITHCViewed = [];
    let newAmazonItemsNoCategory = [];
    let newAmazonItemsNoCategoryViewed = [];
    let newAmazonItemsIncorrectContext = [];
    let newAmazonItemsIncorrectContextViewed = [];

    let publicDomainStoriesCommon = ["beyond lies the wub", "beyond the door", "the crystal crypt", "the defenders", "the eyes have it", "the gun", "the hanging stranger", "mr. spaceship", "piper in the woods", "second variety", "the skull", "tony and the beetles", "the variable man"];

    let publicDomainStories = ["the golden man", "prominent author", "small town", "the turning wheel", "breakfast at twilight", "exhibit piece", "shell game", "adjustment team", "meddler", "the last of the masters", "protection agency", "progeny", "upon the dull earth", "foster, you're dead", "human is"];

    let publicDomainStoriesLikely = ["roog", "james p. crow", "survey team", "time pawn", "the chromium fence", "a surface raid", "vulcan's hammer"];

    for (let i = 0; i < amazonItems.length; i++) {

      // console.log(componentName, getDateTime(), "filterAmazonItems amazonItems[i]", amazonItems[i]);

      let categoryPhilipKDick = false;
      let categoryPhilipKDickPublicDomain = false;
      let categoryBladeRunner = false;
      let categoryTotalRecall = false;
      let categoryMinorityReport = false;
      let categoryTMITHC = false;
      let categoryIncorrectContext = false;

      if (isEmpty(amazonItems[i].authorName) === false) {

        // ? Remove the punctuation in the checks? -- 02/13/2022 MF
        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip k. dick") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip k dick") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("dick philip k") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("dick, philip k") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("dick, philip") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip dick") === true) {

          categoryPhilipKDick = true;

        };

        // if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip") === true && formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("dick") === true) {

        //   categoryPhilipKDick = true;

        // };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip kindred dick") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("pistorius") === true) {

          categoryIncorrectContext = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("van dyke") === true) {

          categoryIncorrectContext = true;

        };

      };

      if (isEmpty(amazonItems[i].titleName) === false) {

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("philip k. dick") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("philip k dick") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("dick philip k") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("dick, philip k") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("dick, philip") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("philip dick") === true) {

          categoryPhilipKDick = true;

        };

        // if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("philip") === true && formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("dick") === true) {

        //   categoryPhilipKDick = true;

        // };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("philip kindred dick") === true) {

          categoryPhilipKDick = true;

        };

        if (categoryPhilipKDick === true) {

          for (let j = 0; j < publicDomainStoriesCommon.length; j++) {

            if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes(publicDomainStoriesCommon[j]) === true) {

              categoryPhilipKDickPublicDomain = true;

            };

          };

          for (let j = 0; j < publicDomainStories.length; j++) {

            if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes(publicDomainStories[j]) === true) {

              categoryPhilipKDickPublicDomain = true;

            };

          };

          for (let j = 0; j < publicDomainStoriesLikely.length; j++) {

            if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes(publicDomainStoriesLikely[j]) === true) {

              categoryPhilipKDickPublicDomain = true;

            };

          };

        };

      };

      if (isEmpty(amazonItems[i].titleName) === false) {

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("blade runner") === true) {

          categoryBladeRunner = true;

        };

        // if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("blade runner 2049") === true) {

        //   categoryBladeRunner = true;

        // };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("black lotus") === true) {

          categoryBladeRunner = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("total recall") === true) {

          categoryTotalRecall = true;

        };

        // if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("electric dreams") === true) {

        //   inTitle = true;

        // };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("man in the high castle") === true) {

          categoryTMITHC = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("minority report") === true) {

          categoryMinorityReport = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("pistorius") === true) {

          categoryIncorrectContext = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("van dyke") === true) {

          categoryIncorrectContext = true;

        };

      };

      // if (amazonItems[i].active === true) {

      //   newAmazonItems.push(amazonItems[i]);

      // };

      if (categoryIncorrectContext !== true) {

        if (categoryPhilipKDick === true && categoryPhilipKDickPublicDomain !== true) {

          newAmazonItemsPhilipKDick.push(amazonItems[i]);

        };

        if (categoryPhilipKDickPublicDomain === true) {

          newAmazonItemsPhilipKDickPublicDomain.push(amazonItems[i]);

        };

        if (categoryBladeRunner === true) {

          newAmazonItemsBladeRunner.push(amazonItems[i]);

        };

        if (categoryTotalRecall === true) {

          newAmazonItemsTotalRecall.push(amazonItems[i]);

        };

        if (categoryTMITHC === true) {

          newAmazonItemsTMITHC.push(amazonItems[i]);

        };

        if (categoryMinorityReport === true) {

          newAmazonItemsMinorityReport.push(amazonItems[i]);

        };

        if (categoryPhilipKDick === false && categoryBladeRunner === false && categoryTotalRecall === false && categoryMinorityReport === false && categoryTMITHC === false) {

          newAmazonItemsNoCategory.push(amazonItems[i]);

        };

      } else {

        newAmazonItemsIncorrectContext.push(amazonItems[i]);

      };

    };

    newAmazonItems = newAmazonItems.filter(item => item.viewed === false || item.viewed === 0);
    newAmazonItemsViewed = newAmazonItems.filter(item => item.viewed === true || item.viewed === 1);
    newAmazonItemsPhilipKDick = newAmazonItemsPhilipKDick.filter(item => item.viewed === false || item.viewed === 0);
    newAmazonItemsPhilipKDickViewed = newAmazonItemsPhilipKDick.filter(item => item.viewed === true || item.viewed === 1);
    newAmazonItemsPhilipKDickPublicDomain = newAmazonItemsPhilipKDickPublicDomain.filter(item => item.viewed === false || item.viewed === 0);
    newAmazonItemsPhilipKDickPublicDomainViewed = newAmazonItemsPhilipKDickPublicDomain.filter(item => item.viewed === true || item.viewed === 1);
    newAmazonItemsBladeRunner = newAmazonItemsBladeRunner.filter(item => item.viewed === false || item.viewed === 0);
    newAmazonItemsBladeRunnerViewed = newAmazonItemsBladeRunner.filter(item => item.viewed === true || item.viewed === 1);
    newAmazonItemsTotalRecall = newAmazonItemsTotalRecall.filter(item => item.viewed === false || item.viewed === 0);
    newAmazonItemsTotalRecallViewed = newAmazonItemsTotalRecall.filter(item => item.viewed === true || item.viewed === 1);
    newAmazonItemsMinorityReport = newAmazonItemsMinorityReport.filter(item => item.viewed === false || item.viewed === 0);
    newAmazonItemsMinorityReportViewed = newAmazonItemsMinorityReport.filter(item => item.viewed === true || item.viewed === 1);
    newAmazonItemsTMITHC = newAmazonItemsTMITHC.filter(item => item.viewed === false || item.viewed === 0);
    newAmazonItemsTMITHCViewed = newAmazonItemsTMITHC.filter(item => item.viewed === true || item.viewed === 1);
    newAmazonItemsNoCategory = newAmazonItemsNoCategory.filter(item => item.viewed === false || item.viewed === 0);
    newAmazonItemsNoCategoryViewed = newAmazonItemsNoCategory.filter(item => item.viewed === true || item.viewed === 1);
    newAmazonItemsIncorrectContext = newAmazonItemsIncorrectContext.filter(item => item.viewed === false || item.viewed === 0);
    newAmazonItemsIncorrectContextViewed = newAmazonItemsIncorrectContext.filter(item => item.viewed === true || item.viewed === 1);

    newAmazonItems.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsViewed.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsPhilipKDick.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsPhilipKDickViewed.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsPhilipKDickPublicDomain.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsPhilipKDickPublicDomainViewed.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsBladeRunner.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsBladeRunnerViewed.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsTotalRecall.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsTotalRecallViewed.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsMinorityReport.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsMinorityReportViewed.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsTMITHC.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsTMITHCViewed.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsNoCategory.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsNoCategoryViewed.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsIncorrectContext.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsIncorrectContextViewed.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);

    setAmazonItems(newAmazonItems);
    setAmazonItemsViewed(newAmazonItemsViewed);
    setAmazonItemsPhilipKDick(newAmazonItemsPhilipKDick);
    setAmazonItemsPhilipKDickViewed(newAmazonItemsPhilipKDickViewed);
    setAmazonItemsPhilipKDickPublicDomain(newAmazonItemsPhilipKDickPublicDomain);
    setAmazonItemsPhilipKDickPublicDomainViewed(newAmazonItemsPhilipKDickPublicDomainViewed);
    setAmazonItemsBladeRunner(newAmazonItemsBladeRunner);
    setAmazonItemsBladeRunnerViewed(newAmazonItemsBladeRunnerViewed);
    setAmazonItemsTotalRecall(newAmazonItemsTotalRecall);
    setAmazonItemsTotalRecallViewed(newAmazonItemsTotalRecallViewed);
    setAmazonItemsMinorityReport(newAmazonItemsMinorityReport);
    setAmazonItemsMinorityReportViewed(newAmazonItemsMinorityReportViewed);
    setAmazonItemsTMITHC(newAmazonItemsTMITHC);
    setAmazonItemsTMITHCViewed(newAmazonItemsTMITHCViewed);
    setAmazonItemsNoCategory(newAmazonItemsNoCategory);
    setAmazonItemsNoCategoryViewed(newAmazonItemsNoCategoryViewed);
    setAmazonItemsIncorrectContext(newAmazonItemsIncorrectContext);
    setAmazonItemsIncorrectContextViewed(newAmazonItemsIncorrectContextViewed);

  };


  const getAmazonItems = () => {

    clearMessages();

    let url = baseURL + "amazon";

    if (amazonMerchants === "AllMerchants") {

      url += "/all";

    };

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": sessionToken
      }),
    })
      .then(response => {

        if (!response.ok) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          filterAmazonItems(results.records[0]);
          // setAmazonItems(results.records[0]);

        } else {

          filterAmazonItems([]);
          // setAmazonItems([]);

        };

      })
      .catch((error) => {

        // console.error(componentName, getDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <Container className="mt-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      <Row>
        <Col xs="12">

          <a href="#" onClick={(event) => { setAmazonMerchants("AllMerchants"); }}>All Merchants</a> | <a href="#" onClick={(event) => { setAmazonMerchants("Amazon"); }}>Amazon Only</a>

        </Col>
      </Row>

      <Row>
        <Col xs="12">

          <a href="#" onClick={(event) => { setAmazonItemsCategory("AllItems"); }}>All Items</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("PhilipKDick"); }}>Philip K. Dick</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("PhilipKDickPublicDomain"); }}>Philip K. Dick Public Domain</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("BladeRunner"); }}>Blade Runner</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("TotalRecall"); }}>Total Recall</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("MinorityReport"); }}>Minority Report</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("TMITHC"); }}>TMITHC</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("IncorrectContext"); }}>Incorrect Context</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("NoCategory"); }}>No Category</a>

        </Col>
      </Row>

      {amazonItemsCategory === "PhilipKDick" && isEmpty(amazonItemsPhilipKDick) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Philip K. Dick <span className="text-muted ms-2 small-text">{amazonItemsPhilipKDick.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsPhilipKDick.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "PhilipKDick" && isEmpty(amazonItemsPhilipKDickViewed) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h4>Viewed</h4>

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Philip K. Dick <span className="text-muted ms-2 small-text">{amazonItemsPhilipKDickViewed.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsPhilipKDickViewed.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "PhilipKDickPublicDomain" && isEmpty(amazonItemsPhilipKDickPublicDomain) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Philip K. Dick Public Domain <span className="text-muted ms-2 small-text">{amazonItemsPhilipKDickPublicDomain.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsPhilipKDickPublicDomain.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "PhilipKDickPublicDomain" && isEmpty(amazonItemsPhilipKDickPublicDomainViewed) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Philip K. Dick Public Domain <span className="text-muted ms-2 small-text">{amazonItemsPhilipKDickPublicDomainViewed.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsPhilipKDickPublicDomainViewed.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "BladeRunner" && isEmpty(amazonItemsBladeRunner) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Blade Runner <span className="text-muted ms-2 small-text">{amazonItemsBladeRunner.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsBladeRunner.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "BladeRunner" && isEmpty(amazonItemsBladeRunnerViewed) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Blade Runner <span className="text-muted ms-2 small-text">{amazonItemsBladeRunnerViewed.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsBladeRunnerViewed.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "TotalRecall" && isEmpty(amazonItemsTotalRecall) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Total Recall <span className="text-muted ms-2 small-text">{amazonItemsTotalRecall.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsTotalRecall.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "TotalRecall" && isEmpty(amazonItemsTotalRecallViewed) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Total Recall <span className="text-muted ms-2 small-text">{amazonItemsTotalRecallViewed.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsTotalRecallViewed.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "MinorityReport" && isEmpty(amazonItemsMinorityReport) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Minority Report <span className="text-muted ms-2 small-text">{amazonItemsMinorityReport.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsMinorityReport.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "MinorityReport" && isEmpty(amazonItemsMinorityReportViewed) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Minority Report <span className="text-muted ms-2 small-text">{amazonItemsMinorityReportViewed.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsMinorityReportViewed.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "TMITHC" && isEmpty(amazonItemsTMITHC) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): TMITHC <span className="text-muted ms-2 small-text">{amazonItemsTMITHC.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsTMITHC.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "TMITHC" && isEmpty(amazonItemsTMITHCViewed) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): TMITHC <span className="text-muted ms-2 small-text">{amazonItemsTMITHCViewed.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsTMITHCViewed.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "IncorrectContext" && isEmpty(amazonItemsIncorrectContext) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Incorrect Context <span className="text-muted ms-2 small-text">{amazonItemsIncorrectContext.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsIncorrectContext.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "IncorrectContext" && isEmpty(amazonItemsIncorrectContextViewed) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): Incorrect Context <span className="text-muted ms-2 small-text">{amazonItemsIncorrectContextViewed.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsIncorrectContextViewed.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "NoCategory" && isEmpty(amazonItemsNoCategory) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): No Category <span className="text-muted ms-2 small-text">{amazonItemsNoCategory.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsNoCategory.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "NoCategory" && isEmpty(amazonItemsNoCategoryViewed) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items ({amazonMerchants}): No Category <span className="text-muted ms-2 small-text">{amazonItemsNoCategoryViewed.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsNoCategoryViewed.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "AllItems" && isEmpty(amazonItems) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items <span className="text-muted ms-2 small-text">{amazonItems.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItems.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

      {amazonItemsCategory === "AllItems" && isEmpty(amazonItemsViewed) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items <span className="text-muted ms-2 small-text">{amazonItemsViewed.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsViewed.map((amazonItem, index) => {

              return (
                <Col key={index} xs="3">

                  <AmazonItem amazonItem={amazonItem} getAmazonItems={getAmazonItems} />

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

    </Container>
  );
};

export default Amazon;
