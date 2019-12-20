window.onload = async () => {
  document.getElementById("city-button").addEventListener("click", async () => {
    document.getElementById("output").innerHTML = "Loading...";
    const city = document.getElementById("city").value;
    const url = `/weather?city=${city}`;
    const response = await fetch(url);
    const myJson = await response.json();
    if (myJson.error) {
      document.getElementById("output").innerHTML = myJson.message;
    } else {
      document.getElementById("output").innerHTML = `
            <table class="table table-bordered">
            <tr>
            <td>Temperature:</td>
            <td>${myJson.data.temperature}</td>
            </tr>
            <tr>
            <td>Humidity:</td>
            <td>${myJson.data.humidity}</td>
            </tr>
            <tr>
            <td>Cloud Cover:</td>
            <td>${myJson.data.cloudCover}</td>
            </tr>
            <tr>
            <td>Visibility:</td>
            <td>${myJson.data.visibility}</td>
            </tr>
            <tr>
            <td>Summary:</td>
            <td>${myJson.data.summary}</td>
            </tr>
            <tr>
            <td>Location:</td>
            <td>${myJson.data.location}</td>
            </tr>
            </table>
            `;
    }
    console.log(JSON.stringify(myJson));
  });
};
