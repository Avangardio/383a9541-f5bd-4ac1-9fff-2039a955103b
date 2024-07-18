import express from 'express';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json())

const port = 8080;

app.listen(port, () => console.log(`Приложение запущено на localhost:${port}`));
