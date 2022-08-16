import { addNewInvestor,LoginInvestor } from "../controllers/investors.controller";
import { addNewDeveloper,LoginDeveloper } from "../controllers/developers.controller";

const routes = (app) => {
    app.route("/investors").post(addNewInvestor);
    app.route("/investors/login").post(LoginInvestor);
    app.route("/developers/login").post(LoginDeveloper)
    app.route("/developers").post(addNewDeveloper);
}

export default routes;