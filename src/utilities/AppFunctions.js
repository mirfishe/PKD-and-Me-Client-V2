import { IsEmpty, GetDateTime } from "./SharedFunctions";

const componentName = "AppFunctions.js";

export const Log = (baseURL, logObject) => {
  // console.log(componentName, GetDateTime(), "Log logObject", logObject);

  // const dispatch = useDispatch();

  let logResult;

  let operationValue = "Log";

  let url = `${baseURL}logs/`;
  let response = "";
  let data = "";

  fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ recordObject: logObject })
  })
    .then(response => {
      // console.log(componentName, GetDateTime(), "Log response", response);

      if (!response.ok) {

        throw Error(`${response.status} ${response.statusText} ${response.url}`);

      } else {

        return response.json();

      };

    })
    .then(results => {
      // console.log(componentName, GetDateTime(), "Log results", results);

      data = results;

    })
    .catch((error) => {
      // console.error(componentName, GetDateTime(), "Log error", error);
      // console.error(componentName, GetDateTime(), "Log error.name", error.name);
      // console.error(componentName, GetDateTime(), "Log error.message", error.message);
      // console.error(componentName, GetDateTime(), "Log error.stack", error.stack);
      // dispatch(addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`));

      let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, logObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

    });

  return logResult;

};


export const LogError = (baseURL, operation, componentName, dataObject, errorObject) => {
  // console.log(componentName, GetDateTime(), "LogError errorObject", errorObject);

  // const dispatch = useDispatch();

  let logErrorResult;

  let recordObject = {
    operation: operation,
    componentName: componentName,
    dataObject: dataObject,
    errorObject: errorObject
  };

  let url = `${baseURL}errorLogs/`;

  fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ recordObject: recordObject })
  })
    .then(response => {
      // console.log(componentName, GetDateTime(), "LogError response", response);

      if (!response.ok) {

        throw Error(`${response.status} ${response.statusText} ${response.url}`);

      } else {

        if (response.status === 200) {

          return response.json();

        } else {

          return response.status;

        };

      };

    })
    .then(results => {
      // console.log(componentName, GetDateTime(), "LogError results", results);

    })
    .catch((error) => {
      // console.error(componentName, GetDateTime(), "LogError error", error);
      // console.error(componentName, GetDateTime(), "LogError error.name", error.name);
      // console.error(componentName, GetDateTime(), "LogError error.message", error.message);
      // dispatch(addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`));
    });

  return logErrorResult;

};
