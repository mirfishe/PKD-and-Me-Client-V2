
const componentName = "SharedFunctions";

export const isEmpty = (value) => {
  // console.log(componentName, getDateTime(), "isEmpty value", value);

  // * https://stackoverflow.com/questions/4597900/checking-something-isempty-in-javascript -- 03/06/2021 MF
  // * https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in -- 03/06/2021 MF

  // const isEmpty = (object) => {

  //   for (var key in object) {

  //     if (object.hasOwnProperty(key)) {

  //         return false;

  //     };

  //   };

  //   return true;

  // };

  // return value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.toString().trim().length === 0);
  return value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0);

  // * Returns true -- 03/06/2021 MF
  // console.log(componentName, getDateTime(), "isEmpty(\"\")", isEmpty(""));
  // console.log(componentName, getDateTime(), "isEmpty(null)", isEmpty(null));
  // console.log(componentName, getDateTime(), "isEmpty(undefined)", isEmpty(undefined));
  // console.log(componentName, getDateTime(), "isEmpty([])", isEmpty([]));
  // console.log(componentName, getDateTime(), "isEmpty({})", isEmpty({}));

  // * Returns false -- 03/06/2021 MF
  // console.log(componentName, getDateTime(), "isEmpty(\"test\")", isEmpty("test"));
  // console.log(componentName, getDateTime(), "isEmpty(5)", isEmpty(5));
  // console.log(componentName, getDateTime(), "isEmpty(true)", isEmpty(true));
  // console.log(componentName, getDateTime(), "isEmpty([\"test\"])", isEmpty(["test"]));
  // console.log(componentName, getDateTime(), "isEmpty({test: \"test\"})", isEmpty({ test: "test" }));

};


export const displayValue = (variableValue) => {
  // console.log(componentName, getDateTime(), "displayValue variableValue", variableValue);

  let displayValue = "";

  if (isEmpty(variableValue) === false) {

    if (variableValue === true) {

      displayValue = "True";

    } else if (variableValue === false) {

      displayValue = "False";

    } else if (variableValue instanceof Date) {

      displayValue = variableValue.toLocaleString();

    } else {

      displayValue = variableValue;

    };

  } else {

    displayValue = "Value is undefined or null.";

  };

  return displayValue;

};


export const displaySpaceAfterComma = (text) => {
  // console.log(componentName, getDateTime(), "displaySpaceAfterComma text", text);

  let displayText = text;

  if (isEmpty(text) === false) {

    displayText = text.replaceAll(",", ", ");

  };

  // console.log(componentName, getDateTime(), "displaySpaceAfterComma displayText", displayText);

  return displayText;

};


export const removeForwardSlashes = (text) => {
  // console.log(componentName, getDateTime(), "removeForwardSlashes text", text);

  let displayText = text;

  if (isEmpty(text) === false) {

    displayText = formatToString(text).replace(/\//g, "");

  };

  // console.log(componentName, getDateTime(), "removeForwardSlashes displayText", displayText);

  return displayText;

};


export const tryParseJSON = (jsonString) => {
  // console.log(componentName, getDateTime(), "tryParseJSON jsonString", jsonString);

  // * https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try -- 03/06/2021 MF
  try {

    let jsonData = JSON.parse(jsonString);

    // * Handle non-exception-throwing cases: -- 03/05/2021
    // * Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking, -- 03/05/2021
    // * but... JSON.parse(null) returns null, and typeof null === "object",  -- 03/05/2021
    // * so we must check for that, too. Thankfully, null is falsey, so this suffices: -- 03/05/2021
    if (jsonData && typeof jsonData === "object") {

      return jsonData;

    };
  }
  catch (error) {
    // ! Don't display this error in the console. This function is already returning false is the JSON file is not in the correct format. -- 03/06/2021 MF
    // console.log(componentName, getDateTime(), "tryParseJSON error", error);
  };

  return false;

};


export const displayObjectData = (ObjectData) => {
  // console.log(componentName, getDateTime(), "displayObjectData ObjectData", ObjectData);

  let objectDataString = JSON.stringify(ObjectData);

  if (isEmpty(objectDataString) === false) {

    objectDataString = objectDataString.replaceAll("\\", "");

    objectDataString = objectDataString.replaceAll("[{\"", "<p><strong>");
    objectDataString = objectDataString.replaceAll("\"},{\"", "</p><p><strong>");
    objectDataString = objectDataString.replaceAll("\"}]", "</p>");

    objectDataString = objectDataString.replaceAll("{\"", "<p><strong>");
    objectDataString = objectDataString.replaceAll("\"}", "</p>");

    objectDataString = objectDataString.replaceAll("\":\"", "</strong> = ");
    objectDataString = objectDataString.replaceAll("\":", "</strong> = ");

    objectDataString = objectDataString.replaceAll("\",\"", "</p><p><strong>");
    objectDataString = objectDataString.replaceAll(",\"", "</p><p><strong>");

    objectDataString = objectDataString.replaceAll("},", "");

    objectDataString = objectDataString.replaceAll("[]", "");

    objectDataString = objectDataString.replaceAll("[\"", "");
    objectDataString = objectDataString.replaceAll("\"]", "");

    objectDataString = objectDataString.replaceAll("[", "");
    objectDataString = objectDataString.replaceAll("]", "");
    objectDataString = objectDataString.replaceAll("{", "");
    objectDataString = objectDataString.replaceAll("}", "");

    objectDataString = objectDataString.replace(/<strong>(.*?)<\/strong>/g, (match) => { return formatTitle(match); });

  };

  return (objectDataString);

};


export const displayObjectDataTable = (ObjectData) => {
  // console.log(componentName, getDateTime(), "displayObjectDataTable ObjectData", ObjectData);

  let objectDataString = JSON.stringify(ObjectData);

  // console.log(componentName, getDateTime(), "displayObjectDataTable objectDataString", objectDataString);

  if (isEmpty(objectDataString) === false) {

    // console.log(componentName, getDateTime(), "displayObjectDataTable objectDataString", objectDataString);

    objectDataString = objectDataString.replaceAll("\\", "");

    objectDataString = objectDataString.replaceAll("[{\"", "<tr><th>");
    objectDataString = objectDataString.replaceAll("\"},{\"", "</td><tr><th>");
    objectDataString = objectDataString.replaceAll("\"}]", "</td></tr>");
    // objectDataString = objectDataString.replaceAll("[{\\\"", "<tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\"},{\\\"", "</td><tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\"}]", "</td></tr>");

    objectDataString = objectDataString.replaceAll("{\"", "<tr><th>");
    objectDataString = objectDataString.replaceAll("\"}", "</td></tr>");
    // objectDataString = objectDataString.replaceAll("{\\\"", "<tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\"}", "</td></tr>");

    objectDataString = objectDataString.replaceAll("\":\"", "</th><td>");
    objectDataString = objectDataString.replaceAll("\":", "</th><td>");
    // objectDataString = objectDataString.replaceAll("\\\":\\\"", "</th><td>");
    // objectDataString = objectDataString.replaceAll("\\\":", "</th><td>");

    objectDataString = objectDataString.replaceAll("\",\"", "</td><tr><th>");
    objectDataString = objectDataString.replaceAll(",\"", "</td><tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\",\\\"", "</td><tr><th>");
    // objectDataString = objectDataString.replaceAll(",\\\"", "</td><tr><th>");

    objectDataString = objectDataString.replaceAll("},", "");

    objectDataString = objectDataString.replaceAll("[]", "");

    objectDataString = objectDataString.replaceAll("[\"", "");
    objectDataString = objectDataString.replaceAll("\"]", "");
    // objectDataString = objectDataString.replaceAll("[\\\"", "");
    // objectDataString = objectDataString.replaceAll("\\\"]", "");

    objectDataString = objectDataString.replaceAll("[", "");
    objectDataString = objectDataString.replaceAll("]", "");
    objectDataString = objectDataString.replaceAll("{", "");
    objectDataString = objectDataString.replaceAll("}", "");


    objectDataString = objectDataString.replace(/<th>(.*?)<\/th>/g, (match) => { return formatTitle(match); });

  };

  return (objectDataString);

};


export const displayObjectDataXML = (ObjectData) => {
  // console.log(componentName, getDateTime(), "displayObjectDataXML ObjectData", ObjectData);

  let objectDataString = JSON.stringify(ObjectData);

  if (isEmpty(objectDataString) === false) {

    objectDataString = objectDataString.replaceAll("\\", "");

    objectDataString = objectDataString.replaceAll("[{\"", "<category>");
    objectDataString = objectDataString.replaceAll("\"},{\"", "</data><category>");
    objectDataString = objectDataString.replaceAll("\"}]", "<data>");

    objectDataString = objectDataString.replaceAll("{\"", "<category>");
    objectDataString = objectDataString.replaceAll("\"}", "<data>");

    objectDataString = objectDataString.replaceAll("\":\"", "</category><data>");
    objectDataString = objectDataString.replaceAll("\":", "</category><data>");

    objectDataString = objectDataString.replaceAll("\",\"", "</data><category>");
    objectDataString = objectDataString.replaceAll(",\"", "</data><category>");

    objectDataString = objectDataString.replaceAll("},", "");

    objectDataString = objectDataString.replaceAll("[]", "");

    objectDataString = objectDataString.replaceAll("[\"", "");
    objectDataString = objectDataString.replaceAll("\"]", "");

    objectDataString = objectDataString.replaceAll("[", "");
    objectDataString = objectDataString.replaceAll("]", "");
    objectDataString = objectDataString.replaceAll("{", "");
    objectDataString = objectDataString.replaceAll("}", "");

  };

  return (objectDataString);

};


export const getDateTime = () => {
  // console.log("getDateTime");
  // console.log("getDateTime new Date().toISOString().slice(0, 19).replace(\"T\", \" \")", new Date().toISOString().slice(0, 19).replace("T", " "));
  // console.log("getDateTime new Date().toISOString().slice(0, 19).replace(\"T\", \"\")", new Date().toISOString().slice(0, 19).replace("T", ""));
  // console.log("getDateTime new Date().toLocaleString().slice(0, 19).replace(\"T\", \" \")", new Date().toLocaleString().slice(0, 19).replace("T", " "));
  // console.log("getDateTime new Date().toLocaleString().slice(0, 19).replace(\"T\", \"\")", new Date().toLocaleString().slice(0, 19).replace("T", ""));

  // * Time returned does not consider the time zone without adjustments. -- 08/09/2021 MF
  // * https://usefulangle.com/post/30/javascript-get-date-time-with-offset-hours-minutes -- 08/09/2021 MF

  // * https://stackoverflow.com/questions/12413243/javascript-date-format-like-iso-but-local -- 08/09/2021 MF
  let timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  // return new Date().toLocaleString();
  // return new Date().toLocaleString().slice(0, 19).replace("T", " ");
  // return new Date().toISOString().slice(0, 19).replace("T", " ");
  return new Date(new Date() - timezoneOffset).toISOString().slice(0, 19).replace("T", " ");

};


export const getCurrentDay = () => {

  return new Date().getDate();

};


export const getCurrentMonth = () => {

  return new Date().getMonth() + 1;

};


export const getCurrentYear = () => {

  return new Date().getFullYear();

};


export const displayDate = (dateToDisplay, removeLeadingZeroes) => {
  // console.log(componentName, getDateTime(), "displayDate dateToDisplay", dateToDisplay);
  // console.log(componentName, getDateTime(), "displayDate removeLeadingZeroes", removeLeadingZeroes);

  let newDisplayDate = "";

  if (isEmpty(dateToDisplay) === false) {

    // * Year
    let yyyy = formatToString(dateToDisplay).substring(0, 4);
    // * Month
    let mm = formatToString(dateToDisplay).substring(5, 7);
    // * Day
    let dd = formatToString(dateToDisplay).substring(8, 10);

    newDisplayDate = mm + "/" + dd + "/" + yyyy;

    if (isEmpty(newDisplayDate) === false && removeLeadingZeroes === true) {

      newDisplayDate = newDisplayDate.replace(/\b0/g, "");

    };

  };

  // console.log(componentName, getDateTime(), "displayDate dateToDisplay", dateToDisplay);

  return newDisplayDate;

};


export const displayDateAndTime = (dateToDisplay, removeLeadingZeroes) => {
  // console.log(componentName, getDateTime(), "displayDateAndTime dateToDisplay", dateToDisplay);
  // console.log(componentName, getDateTime(), "displayDateAndTime removeLeadingZeroes", removeLeadingZeroes);

  let newDisplayDateAndTime = "";

  if (isEmpty(dateToDisplay) === false) {

    // * Year
    let yyyy = formatToString(dateToDisplay).substring(0, 4);
    // * Month
    let mm = formatToString(dateToDisplay).substring(5, 7);
    // * Day
    let dd = formatToString(dateToDisplay).substring(8, 10);

    // // * Hour
    // let hour = formatToString(dateToDisplay).substring(11, 12);
    // // * Minute
    // let minute = formatToString(dateToDisplay).substring(15, 16);

    // * Time
    let time = formatToString(dateToDisplay).substring(11, 16);

    newDisplayDateAndTime = mm + "/" + dd + "/" + yyyy + " " + time;

    if (isEmpty(newDisplayDateAndTime) === false && removeLeadingZeroes === true) {

      newDisplayDateAndTime = newDisplayDateAndTime.replace(/\b0/g, "");

    };

  };

  // console.log(componentName, getDateTime(), "displayDateAndTime newDisplayDateAndTime", newDisplayDateAndTime);

  return newDisplayDateAndTime;

};


export const displayYear = (dateToDisplay) => {
  // console.log(componentName, getDateTime(), "displayYear dateToDisplay", dateToDisplay);

  let newDisplayDate = "";

  if (isEmpty(dateToDisplay) === false) {

    // * Year
    let yyyy = formatToString(dateToDisplay).substring(0, 4);
    // * Month
    // let mm = formatToString(dateToDisplay).substring(5, 7);
    // * Day
    // let dd = formatToString(dateToDisplay).substring(8, 10);

    // newDisplayDate = mm + "/" + dd + "/" + yyyy;

    newDisplayDate = yyyy;

  };

  // console.log(componentName, getDateTime(), "displayYear dateToDisplay", dateToDisplay);

  return newDisplayDate;

};


export const daysSince = (dateToCompare) => {
  // console.log(componentName, getDateTime(), "daysSince dateToCompare", dateToCompare);

  // * https://stackoverflow.com/questions/12986068/how-to-calculate-number-of-days-between-today-and-given-date-and-code-for-gettim -- 10/18/2021 MF

  let newDaysSince = 0;

  if (isEmpty(dateToCompare) === false) {

    let today = new Date();
    let compareDate = new Date(dateToCompare);
    let timeInMilliseconds = compareDate.getTime() - today.getTime();

    newDaysSince = Math.abs(Math.ceil(timeInMilliseconds / (1000 * 60 * 60 * 24)));

  };

  // console.log(componentName, getDateTime(), "daysSince newDaysSince", newDaysSince);

  return newDaysSince;

};


export const hasNonEmptyProperty = (objectItem, propertyName) => {
  // console.log(componentName, getDateTime(), "hasFalseProperty property", property);

  let nonEmptyProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && isEmpty(objectItem[propertyName]) === false) {

      nonEmptyProperty = true;

    };

  };

  return nonEmptyProperty;

};


export const hasEqualsProperty = (objectItem, propertyName, value) => {
  // console.log(componentName, getDateTime(), "hasEqualsProperty propertyName", propertyName);

  let equalsProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && isEmpty(objectItem[propertyName]) === false && objectItem[propertyName] === value) {

      equalsProperty = true;

    };

  };

  return equalsProperty;

};


export const hasTrueProperty = (objectItem, propertyName) => {
  // console.log(componentName, getDateTime(), "hasTrueProperty property", property);

  let trueProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && objectItem[propertyName] === true) {

      trueProperty = true;

    };

  };

  return trueProperty;

};


export const hasFalseProperty = (objectItem, propertyName) => {
  // console.log(componentName, getDateTime(), "hasFalseProperty property", property);

  let falseProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && objectItem[propertyName] === false) {

      falseProperty = true;

    };

  };

  return falseProperty;

};


export const truncateText = (text, limit) => {
  // console.log(componentName, getDateTime(), "truncateText text", text);

  // * https://stackoverflow.com/questions/4700226/i-want-to-truncate-a-text-or-line-with-ellipsis-using-javascript -- 03/06/2021 MF

  // let newText = text;

  if (isEmpty(text) === false && text.length > limit) {

    for (let i = limit; i > 0; i--) {

      if (text.charAt(i) === " " && (text.charAt(i - 1) !== "," || text.charAt(i - 1) !== "." || text.charAt(i - 1) !== ";")) {

        return text.substring(0, i) + "...";

      };

    };

    return text.substring(0, limit) + "...";

  } else {

    return text;

  };

  // console.log(componentName, getDateTime(), "truncateText newText", newText);

  // return newText;

};


export const validateMilitaryTime = (timeEntered) => {
  // console.log(componentName, getDateTime(), "validateMilitaryTime timeEntered", timeEntered);

  // * Time in 24 clock, no colon -- 03/05/2021 MF

  // * all digits-- 03/05/2021 MF
  // * length is 4
  // * first digit is either a 0 or 1 or 2
  // * second digit is either a 0 or 1 or 2 or 3 or 4 or 5 
  // * third digit is either a 0 or 1 or 2 or 3 or 4 or 5 

  // * Make sure that it is a string-- 03/05/2021 MF
  // console.log(componentName, getDateTime(), "typeof \"8\"", typeof "8");

  let validTimeFormat = true;

  let timeEnteredString = "";

  if (typeof formatToString(timeEntered) === "string") {

    timeEnteredString = formatToString(timeEntered);

    timeEnteredString = timeEnteredString.trim();

    if (timeEnteredString.length !== 4) {

      validTimeFormat = false;

    } else {

      if (isNaN(parseInt(timeEnteredString.charAt(0))) === true || isNaN(parseInt(timeEnteredString.charAt(1))) === true || isNaN(parseInt(timeEnteredString.charAt(2))) === true || isNaN(parseInt(timeEnteredString.charAt(3))) === true) {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(0) !== "0" && timeEnteredString.charAt(0) !== "1" && timeEnteredString.charAt(0) !== "2") {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(0) === "2" && timeEnteredString.charAt(1) !== "0" && timeEnteredString.charAt(1) !== "1" && timeEnteredString.charAt(1) !== "2" && timeEnteredString.charAt(1) !== "3" && timeEnteredString.charAt(1) !== "4") {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(0) === "2" && timeEnteredString.charAt(1) !== "4" && timeEnteredString.charAt(2) !== "0" && timeEnteredString.charAt(3) !== "0") {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(2) !== "0" && timeEnteredString.charAt(2) !== "1" && timeEnteredString.charAt(2) !== "2" && timeEnteredString.charAt(2) !== "3" && timeEnteredString.charAt(2) !== "4" && timeEnteredString.charAt(2) !== "5") {

        validTimeFormat = false;

      };


      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"8\")", validateMilitaryTime("8"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"18\")", validateMilitaryTime("10"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"800\")", validateMilitaryTime("800"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"0800\")", validateMilitaryTime("0800"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"0880\")", validateMilitaryTime("0880"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"1600\")", validateMilitaryTime("1600"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"1645\")", validateMilitaryTime("1645"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"1650\")", validateMilitaryTime("1650"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"1680\")", validateMilitaryTime("1680"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"2150\")", validateMilitaryTime("2150"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"2160\")", validateMilitaryTime("2160"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"2300\")", validateMilitaryTime("2300"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"2500\")", validateMilitaryTime("2500"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(\"3000\")", validateMilitaryTime("3000"));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(8)", validateMilitaryTime(8));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(18)", validateMilitaryTime(10));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(800)", validateMilitaryTime(800));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(1600)", validateMilitaryTime(1600));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(1680)", validateMilitaryTime(1680));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(2500)", validateMilitaryTime(2500));
      // console.log(componentName, getDateTime(), "validateMilitaryTime(3000)", validateMilitaryTime(3000));



      // let timeArray = timeEnteredString.split("");

      // // console.log(componentName, getDateTime(), "validateMilitaryTime timeArray", timeArray);

      // for (let i = 0; i < timeArray.length; i++) {

      //   // console.log(componentName, getDateTime(), "validateMilitaryTime parseInt(timeArray[i])", parseInt(timeArray[i]));
      //   // console.log(componentName, getDateTime(), "validateMilitaryTime isNaN(parseInt(timeArray[i]))", isNaN(parseInt(timeArray[i])));

      //   if (isNaN(parseInt(timeArray[i])) === false) {

      //     if (i === 0) {

      //       if (timeArray[i] !== "0" && timeArray[i] !== "1" && timeArray[i] !== "2") {

      //         validTimeFormat = false;

      //       };

      //     } else if (i === 1) {

      //       // if timeArray[1] =2 then 
      //       if (timeArray[i] !== "0" && timeArray[i] !== "1" && timeArray[i] !== "2" && timeArray[i] !== "3" && timeArray[i] !== "4" && timeArray[i] !== "5") {

      //         validTimeFormat = false;

      //       };

      //     } else if (i === 2) {

      //       if (timeArray[i] !== "0" && timeArray[i] !== "1" && timeArray[i] !== "2" && timeArray[i] !== "3" && timeArray[i] !== "4" && timeArray[i] !== "5") {

      //         validTimeFormat = false;

      //       };

      //     };

      //   } else {

      //     validTimeFormat = false;

      //   };

      // };



    };

  } else {

    validTimeFormat = false;

  };

  return validTimeFormat;

};


export const convertTemperature = (temperatureScale, temperature) => {
  // console.log(componentName, getDateTime(), "convertTemperature temperatureScale", temperatureScale);
  // console.log(componentName, getDateTime(), "convertTemperature temperature", temperature);

  // let temperatureFloat = parseFloat(formatTrim(temperature));
  let temperatureFloat = parseFloat(temperature);
  let temperatureConverted = null;

  if (isNaN(temperatureFloat) === false && isEmpty(temperatureFloat) === false) {

    if (formatLowerCase(temperatureScale) === "celsius") {

      // * Based on (32°F − 32) × 5/9 = 0°C -- 07/29/2021 MF
      temperatureConverted = ((temperatureFloat - 32) * 5 / 9).toFixed(2);

    } else if (formatLowerCase(temperatureScale) === "fahrenheit") {

      // * Based on (32°F − 32) × 5/9 = 0°C -- 07/29/2021 MF
      temperatureConverted = (temperatureFloat * 9 / 5 + 32).toFixed(2);

    };

  } else {

    temperatureConverted = "";

  };

  // console.log(componentName, getDateTime(), "convertTemperature temperatureConverted", temperatureConverted);

  return temperatureConverted;

};


export const convertYesNoTrueFalse = (value) => {
  // console.log(componentName, getDateTime(), "convertYesNoTrueFalse value", value);

  // if (isNaN(value) === true && formatTrim(value) === "Yes") {

  //   return true;

  // } else if (isNaN(value) === true && formatTrim(value) === "No") {

  //   return false;

  // } else if (value === true) {

  //   return "Yes";

  // } else if (value === false) {

  //   return "No";

  // } else {

  //   return value;

  // };

  if (isNaN(value) === true && value === "Yes") {

    return true;

  } else if (isNaN(value) === true && value === "No") {

    return false;

  } else if (value === true) {

    return "Yes";

  } else if (value === false) {

    return "No";

  } else {

    return value;

  };

};


export const convertNormalAbnormalTrueFalse = (value) => {
  // console.log(componentName, getDateTime(), "convertNormalAbnormalTrueFalse value", value);

  // if (isNaN(value) === true && formatTrim(value) === "Normal") {

  //   return true;

  // } else if (isNaN(value) === true && formatTrim(value) === "Abnormal") {

  //   return false;

  // } else if (value === true) {

  //   return "Normal";

  // } else if (value === false) {

  //   return "Abnormal";

  // } else {

  //   return value;

  // };

  if (isNaN(value) === true && value === "Normal") {

    return true;

  } else if (isNaN(value) === true && value === "Abnormal") {

    return false;

  } else if (value === true) {

    return "Normal";

  } else if (value === false) {

    return "Abnormal";

  } else {

    return value;

  };

};


export const convertEnableDisableTrueFalse = (value) => {
  // console.log(componentName, getDateTime(), "convertEnableDisableTrueFalse value", value);

  // if (isNaN(value) === true && formatTrim(value) === "Enable") {

  //   return true;

  // } else if (isNaN(value) === true && formatTrim(value) === "Disable") {

  //   return false;

  // } else if (value === true) {

  //   return "Enable";

  // } else if (value === false) {

  //   return "Disable";

  // } else {

  //   return value;

  // };

  if (isNaN(value) === true && value === "Enable") {

    return true;

  } else if (isNaN(value) === true && value === "Disable") {

    return false;

  } else if (value === true) {

    return "Enable";

  } else if (value === false) {

    return "Disable";

  } else {

    return value;

  };

};


export const convertNullEmptyString = (value) => {
  // console.log(componentName, getDateTime(), "convertNullEmptyString value", value);
  // console.log(componentName, getDateTime(), "convertNullEmptyString typeof value", typeof value);

  // if (value === null) {

  //   return "";
  // } else if (value === undefined) {

  //   return "";

  // } else if (isNaN(value) === true && formatTrim(value) === "") {

  //   return null;

  // } else if (value === "") {

  //   return null;

  // } else {

  //   return value;

  // };

  // TODO: Change this function so that it can handle if there are already empty string values in the database. -- 03/19/2021 MF
  // ! This can't be done in one function like this to handle both conversions because what if the database value is set to an empty string. -- 07/09/2021 MF
  if (value === null) {

    // console.log(componentName, getDateTime(), "convertNullEmptyString null value", value);
    return "";

  } else if (value === undefined) {

    // console.log(componentName, getDateTime(), "convertNullEmptyString undefined value", value);
    return "";

  } else if (value === "NaN") {

    // console.log(componentName, getDateTime(), "convertNullEmptyString NaN value", value);
    return null;

  } else if (isNaN(value) === true && typeof value === "number") {

    // console.log(componentName, getDateTime(), "convertNullEmptyString isNaN value", value);
    return null;

  } else if (isNaN(value) === true && value === "") {

    // console.log(componentName, getDateTime(), "convertNullEmptyString isNaN \"\" value", value);
    return null;

  } else if (value === "") {

    // console.log(componentName, getDateTime(), "convertNullEmptyString \"\" value", value);
    return null;

  } else {

    // console.log(componentName, getDateTime(), "convertNullEmptyString else value", value);
    return value;

  };

};


export const isWholeNumber = (value) => {
  // console.log(componentName, getDateTime(), "isWholeNumber value", value);

  // * I think this is always returning true because the decimal is stripped off before the check is done. -- 04/04/2021 MF
  // console.log(componentName, getDateTime(), "isWholeNumber parseInt(formatTrim(value))", parseInt(formatTrim(value)));
  // console.log(componentName, getDateTime(), "isWholeNumber isNaN(parseInt(formatTrim(value)))", isNaN(parseInt(formatTrim(value))));
  // console.log(componentName, getDateTime(), "isWholeNumber Number.isInteger(parseFloat(formatTrim(value)))", Number.isInteger(parseFloat(formatTrim(value))));

  // if (isNaN(parseInt(formatTrim(value))) === true) {

  //   return false;

  // } else {

  //   return true;

  // };

  // * This removes any values from the string starting at and after a non-number value in the string. -- 06/21/2021 MF
  // if (Number.isInteger(parseFloat(formatTrim(value))) === true) {

  //   return true;

  // } else {

  //   return false;

  // };

  if (isNaN(formatTrim(value)) === true) {

    return false;

  } else {

    // * https://www.w3resource.com/javascript-exercises/javascript-math-exercise-38.php -- 06/21/2021 MF
    if (value - Math.floor(value) !== 0) {

      return false;

    }
    else {

      return true;

    };

  };

};


export const hasDecimalPlaces = (value, decimalPlaces) => {
  // console.log(componentName, getDateTime(), "hasDecimalPlaces value", value);

  // console.log(componentName, getDateTime(), "hasDecimalPlaces parseFloat(formatTrim(value))", parseFloat(formatTrim(value)));
  // console.log(componentName, getDateTime(), "hasDecimalPlaces isNaN(parseFloat(formatTrim(value)))", isNaN(parseFloat(formatTrim(value))));
  // console.log(componentName, getDateTime(), "hasDecimalPlaces Number.isInteger(parseFloat(formatTrim(value)) * 10)", Number.isInteger(parseFloat(formatTrim(value)) * 10));

  if (isNaN(formatTrim(value)) === true) {

    return false;

  } else {

    let currentDecimalPlaces = 1;

    if (Number.isInteger(parseFloat(decimalPlaces)) === true) {

      currentDecimalPlaces = decimalPlaces;

    };

    // * This removes any values from the string starting at and after a non-number value in the string. -- 06/21/2021 MF
    // * Parse the value to see if it is a float. -- 06/21/2021 MF
    let valueToTest = parseFloat(formatTrim(value));

    let valueDecimals = 0;

    // if (formatTrim(value).indexOf(".") > -1) {
    if (formatTrim(value).includes(".")) {

      // * Remove the characters after the decimal point to be counted later if there is a decimal point. -- 06/21/2021 MF
      valueDecimals = formatTrim(value).substring(formatTrim(value).indexOf(".") + 1);

    };

    // console.log(componentName, getDateTime(), "hasDecimalPlaces currentDecimalPlaces", currentDecimalPlaces);

    // if (isNaN(parseFloat(formatTrim(value))) === true || (isEmpty(currentDecimalPlaces) === false && Number.isInteger(parseFloat(formatTrim(value)) * 10 ** currentDecimalPlaces) === false)) {
    // if (isNaN(valueToTest) === true || (isEmpty(currentDecimalPlaces) === false && Number.isInteger(valueToTest * 10 ** currentDecimalPlaces) === false)) {
    // if (isNaN(parseFloat(formatTrim(value))) === true || (isEmpty(currentDecimalPlaces) === false && formatTrim(value).substring(formatTrim(value).indexOf(".") + 1).length > currentDecimalPlaces)) {

    // console.log(componentName, getDateTime(), "hasDecimalPlaces valueToTest", valueToTest);
    // console.log(componentName, getDateTime(), "hasDecimalPlaces isNaN(valueToTest)", isNaN(valueToTest));
    // console.log(componentName, getDateTime(), "hasDecimalPlaces isEmpty(currentDecimalPlaces)", isEmpty(currentDecimalPlaces));
    // console.log(componentName, getDateTime(), "hasDecimalPlaces valueDecimals.length > currentDecimalPlaces", valueDecimals.length > currentDecimalPlaces);

    if (isNaN(valueToTest) === true || (isEmpty(currentDecimalPlaces) === false && valueDecimals.length > currentDecimalPlaces)) {

      return false;

    } else {

      return true;

    };

  };

};


export const generateRandomNumber = (minimumValue, maximumValue) => {
  // console.log(componentName, getDateTime(), "generateRandomNumber minimumValue", minimumValue);
  // console.log(componentName, getDateTime(), "generateRandomNumber maximumValue", maximumValue);

  // * https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript -- 01/14/2022 MF

  let randomNumber = Math.floor(Math.random() * (maximumValue - minimumValue + 1)) + minimumValue;

  // console.log(componentName, getDateTime(), "generateRandomNumber randomNumber", randomNumber);

  return randomNumber;

};


export const generateRandomNumberDigits = (digits) => {
  // console.log(componentName, getDateTime(), "generateRandomNumberDigits digits", digits);

  let randomNumber = formatToString(Math.floor(Math.random() * 10 ** digits));

  while (randomNumber.length < (digits)) {

    randomNumber = `0${randomNumber}`;

  };

  // console.log(componentName, getDateTime(), "generateRandomNumberDigits randomNumber", randomNumber);

  return randomNumber;

};


export const formatPhoneNumber = (phoneNumber) => {
  // console.log(componentName, getDateTime(), "formatPhoneNumber phoneNumber", phoneNumber);
  // console.log(componentName, getDateTime(), "formatPhoneNumber typeof phoneNumber", typeof phoneNumber);

  // * From https://learnersbucket.com/examples/javascript/how-to-format-phone-number-in-javascript/ -- 07/22/2021 MF

  let onlyDigits = "";

  if (typeof phoneNumber === "string") {

    onlyDigits = phoneNumber.replace(/\D/g, "");

  };

  let validPhoneNumber = onlyDigits.match(/^(\d{3})(\d{3})(\d{4})$/);

  // console.log(componentName, getDateTime(), "formatPhoneNumber validPhoneNumber", validPhoneNumber);

  if (isEmpty(validPhoneNumber) === false) {

    return `${validPhoneNumber[1]}-${validPhoneNumber[2]}-${validPhoneNumber[3]}`;

  } else {

    return phoneNumber;

  };

};


export const formatTitle = (title) => {
  // console.log(componentName, getDateTime(), "formatTitle title", title);
  // console.log(componentName, getDateTime(), "formatTitle typeof title", typeof title);

  // * From https://stackoverflow.com/questions/11427759/how-to-insert-space-before-capitalize-character-in-a-word-using-replace-and-rege -- 08/10/2021 MF
  // * From https://attacomsian.com/blog/string-capitalize-javascript -- 08/10/2021 MF
  // * From https://www.codeproject.com/Articles/108996/Splitting-Pascal-Camel-Case-with-RegEx-Enhancement -- 08/10/2021 MF

  let formattedTitle = "";

  // if (formatLowerCase(title).includes("isbar" === true)) {

  //   console.log(componentName, getDateTime(), "formatTitle title", title);

  // };

  if (isEmpty(title) === false && title !== "iSBAR" && title !== "iSBARs" && title !== "iSBAREnable") {

    // * iSBARs is the special case that is difficult to make work in regex. -- 08/16/2021 MF
    // formattedTitle = title.replace(/([a-z])([A-Z])([a-z])/g, "$1 $2$3").replace(/\b\w/g, c => c.toUpperCase());
    formattedTitle = title.replace(/(?<!^)([A-Z][a-z]|(?<=[a-z])[A-Z])/g, " $1").replace(/\b\w/g, c => c.toUpperCase());

  } else if (isEmpty(title) === false && title === "iSBAR") {

    formattedTitle = "iSBAR";

  } else if (isEmpty(title) === false && title === "iSBARs") {

    formattedTitle = "iSBARs";

  } else if (isEmpty(title) === false && title === "iSBAREnable") {

    formattedTitle = "iSBAR Enable";

  };

  // console.log(componentName, getDateTime(), "formatTitle formattedTitle", formattedTitle);

  return formattedTitle;

};


export const randomizeItems = (items, randomize) => {
  // console.log(componentName, getDateTime(), "randomizeItems items", items);
  // console.log(componentName, getDateTime(), "randomizeItems randomize", randomize);

  let itemsRandomized = [];

  if (randomize === true) {

    itemsRandomized = items.map((a) => (
      { sort: Math.random(), value: a }
    ))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

  } else {

    itemsRandomized = items;

  };

  return itemsRandomized;

};


export const formatLowerCase = (value) => {
  // console.log(componentName, getDateTime(), "formatLowerCase value", value);

  let lowerCaseValue = value;

  if (isEmpty(value) === false) {

    lowerCaseValue = formatToString(value).toLowerCase();

  };

  return lowerCaseValue;

};


export const formatUpperCase = (value) => {
  // console.log(componentName, getDateTime(), "formatUpperCase value", value);

  let upperCaseValue = value;

  if (isEmpty(value) === false) {

    upperCaseValue = formatToString(value).toUpperCase();

  };

  return upperCaseValue;

};


export const formatTrim = (value) => {
  // console.log(componentName, getDateTime(), "formatTrim value", value);

  let trimValue = value;

  if (isEmpty(value) === false) {

    trimValue = formatToString(value).trim();

  };

  return trimValue;

};


export const formatToString = (value) => {
  // console.log(componentName, getDateTime(), "formatToString value", value);

  let toStringValue = value;

  if (isEmpty(value) === false) {

    toStringValue = value.toString();

  };

  return toStringValue;

};


export const formatInt = (value) => {
  // console.log(componentName, getDateTime(), "formatInt value", value);

  let formatedInt = value;

  if (isEmpty(value) === false) {

    formatedInt = parseInt(formatTrim(value.replaceAll(",", ""))).toLocaleString();

  } else {

    formatedInt = "";

  };

  return formatedInt;

};


export const formatFloat = (value) => {
  // console.log(componentName, getDateTime(), "formatFloat value", value);

  let formatedFloat = value;

  if (isEmpty(value) === false) {

    formatedFloat = parseFloat(formatTrim(value.replaceAll(",", ""))).toLocaleString();

  } else {

    formatedFloat = "";

  };

  return formatedFloat;

};


export const formatSearchInput = (value) => {
  // console.log(componentName, getDateTime(), "formatSearchInput value", value);

  let formatedSearchInput = value;

  if (isEmpty(value) === false) {

    formatedSearchInput = formatTrim(value).toLowerCase();

  };

  return formatedSearchInput;

};


export const removeHTML = (text) => {
  // console.log(componentName, getDateTime(), "removeHTML text", text);

  // * https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/ -- 02/08/2022 MF

  let displayText = text;

  if (isEmpty(text) === false) {

    displayText = text.replace(/(<([^>]+)>)/ig, "");

  };

  // console.log(componentName, getDateTime(), "removeHTML displayText", displayText);

  return displayText;

};

