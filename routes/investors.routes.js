import { addNewInvestor,LoginInvestor } from "../controllers/investors.controller";
import { addNewDeveloper,LoginDeveloper } from "../controllers/developers.controller";
import {addNewBidding} from "../controllers/biddings.controllers";
import {
    allCoins,
    addNewCoin
} from "../controllers/coins.controller";

const routes = (app) => {
    app.route("/investors").post(addNewInvestor);
    app.route("/investors/login").post(LoginInvestor);
    app.route("/developers/login").post(LoginDeveloper)
    app.route("/developers").post(addNewDeveloper);
    //coins api
    app.route("/coins")
    .get(allCoins)
    .post(addNewCoin);
    //bidding api
    app.route("/biddings")
    .post(addNewBidding);
    //allocation engine api
    //timer api
}

export default routes;