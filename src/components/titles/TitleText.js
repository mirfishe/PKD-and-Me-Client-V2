import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, getDateTime, /* replaceSmartCharacters, */ addErrorLog } from "shared-functions";

const TitleText = (props) => {

  // * Available props: -- 12/18/2022 MF
  // * Properties: titleID -- 12/18/2022 MF

  const componentName = "TitleText";

  const baseURL = useSelector(state => state.applicationSettings.baseURL);

  let titleID = isEmpty(props) === false && isEmpty(props.titleID) === false ? props.titleID : null;

  const [showText, setShowText] = useState(false);
  const [titleText, setTitleText] = useState([]);

  // * This same functionality can be done in HTML. -- 10/06/2022 MF
  // <details>
  //   <summary>test header</summary>
  //   test text, notes, etc.
  // </details>


  useEffect(() => {

    getTitleText(titleID);

  }, [titleID]);


  const getTitleText = (titleID) => {

    if (isEmpty(titleID) === false) {

      let url = baseURL + `titles/text/${titleID}`;

      fetch(url)
        .then(results => {

          if (results.ok !== true) {

            // throw Error(results.status + " " + results.statusText + " " + results.url);

          } else {

            return results.json();

          };

        })
        .then(results => {

          // setTitleMessage(results.message);

          if (isEmpty(results) === false && results.transactionSuccess === true) {

            setTitleText(results.records);

          } else {

            // console.error(componentName, getDateTime(), "getTitleText error", results.message);

          };

        })
        .catch((error) => {

          // console.error(componentName, getDateTime(), "getTitleText error", error);
          // console.error(componentName, getDateTime(), "getTitleText error.name", error.name);
          // console.error(componentName, getDateTime(), "getTitleText error.message", error.message);

          // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  return (
    <React.Fragment>

      {isEmpty(titleText) === false ?

        <button aria-label={showText === false ? "expand" : "collapse"} onClick={() => { setShowText(!showText); }}>

          <div>
            Title Text

            {showText === false ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-up"></i>}
          </div>

          {showText === true ?

            <span onClick={() => { setShowText(!showText); }}>

              {titleText.map((titleText, index) => {

                return (
                  <React.Fragment key={index}>

                    <h3>{titleText.chapter}</h3>
                    <pre>{titleText.titleText}</pre>

                  </React.Fragment>
                );
              })}

            </span>

            : null}

        </button>

        : null}

    </React.Fragment>
  );
};

export default TitleText;
