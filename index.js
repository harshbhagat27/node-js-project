const http = require("http");
const fs = require("fs");
let requests = require("requests");

const homeFile = fs.readFileSync("home.html","utf-8");
const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}",orgVal.current.temp_c);
        temperature = temperature.replace("{%location%}",orgVal.location.name);
        temperature = temperature.replace("{%country%}",orgVal.location.country);
        return temperature
}
const server = http.createServer((req, res) => {
    if (req.url == "/"){
        requests('http://api.weatherapi.com/v1/current.json?key=a0dda162fb754fbdabb85657232311%20&q=india&aqi=no')
        .on('data',  (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData]
        //   console.log(arrData[0].current.temp_c);
        const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join("");
        res.write(realTimeData);
        // console.log(realTimeData);
        })
        .on('end', (err) => {
          if (err) return console.log('connection closed due to errors', err);
        res.end
        });
    }
});
server.listen(8000, "127.0.0.1")