/* Global Variables */
const BASE_URL = "api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&APPID=a223e187698cd909106500621d6bbd62";

const zipCode = document.getElementById("zip");
const feelingsArea = document.getElementById("feelings");
const submitBtn = document.getElementById("generate");
const dateArea = document.getElementById("date");
const tempArea = document.getElementById("temp");
const contentArea = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

submitBtn.addEventListener("click", getWeather);

const getWeather = async (zipCode, baseURL, apiKey) => {
  const response = await fetch(baseURL + zipCode + apiKey);

  try {
    const retrievedData = await response.json();
    return retrievedData;
  } catch (error) {
    console.log("error", error);
  }
};
