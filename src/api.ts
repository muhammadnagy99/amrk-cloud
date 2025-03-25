// fetchMenuCategories.ts

// Create headers
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-amrk-app-id", "amrk-eu1");

// Define request options
const requestOptions: RequestInit = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

// Fetch data from the API
fetch("https://api.dev.amrk.app/amrkCloudWeb/getMenuCategories?brnid=9ObrplPiR3MyQq1Kiwdm", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log("Menu Categories:", result);
  })
  .catch((error) => {
    console.error("Error fetching menu categories:", error);
  });