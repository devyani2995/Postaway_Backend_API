import app from "./index.js";
import { mongooseConnect } from "./src/config/mongoose.config.js";

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
  mongooseConnect();
});
