/* Global Variables */
let mainData = {};
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const API_KEY = ",us&units=metric&APPID=a223e187698cd909106500621d6bbd62";

const zipCode = document.getElementById("zip");
const feelingsArea = document.getElementById("feelings");
const submitBtn = document.getElementById("generate");
const dateArea = document.getElementById("date");
const tempArea = document.getElementById("temp");
const contentArea = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

submitBtn.addEventListener("click", buttonClicked);

async function buttonClicked(e) {
  await getWeather(zipCode.value, BASE_URL, API_KEY).then((data) => {
    postFetchedData("/postRecent", data).then(() => {
      getSavedData("/getRecent");
    });
  });
  tempArea.innerHTML = mainData.temperature + " \u2103";
  dateArea.innerHTML = mainData.date;
  contentArea.innerHTML = mainData.userResponse;
}

const getWeather = async (zipCode, baseURL, apiKey) => {
  const request = await fetch(baseURL + zipCode + apiKey);

  try {
    const retrievedData = await request.json();
    console.log(retrievedData);
    mainData.temperature = retrievedData.main.temp;
    mainData.date = newDate;
    mainData.userResponse = feelingsArea.value;
    return mainData;
  } catch (error) {
    console.log("error", error);
  }
};

const getSavedData = async (route) => {
  const request = await fetch(route);

  try {
    const newData = request.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const postFetchedData = async (route, data) => {
  const response = await fetch(route, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    console.log("error", error);
  }
};
