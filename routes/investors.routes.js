import { addNewInvestor } from "../controllers/investors.controller";

const routes = (app) => {
    app.route("/investors").post(addNewInvestor);
}

export default routes;