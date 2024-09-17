import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();
const API_URL = "https://api.nytimes.com/svc/topstories/v2";
const API_KEY = "8hz2jlSyVOUjmsM34GWMKtstIlf83fVE";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/home.json?api-key=" + API_KEY);
    console.log(result.data.section);
    res.render("index.ejs", { data: result.data });
  } catch (error) {
    console.log(error.response.data);
    console.log(error.message);
    res.send("An Error Occured! Go Back!")
  }
  
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
