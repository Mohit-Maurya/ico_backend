import { addNewBidding, bidsPerStatus } from "../controllers/biddings.controllers";
import { addNewInvestor, LoginInvestor } from "../controllers/investors.controller";
import { addNewDeveloper, LoginDeveloper } from "../controllers/developers.controller";
import { allCoins, addNewCoin } from "../controllers/coins.controller";
import { allocate } from "../controllers/coins.controller";

const routes = (app) => {
    app.route("/investors").post(addNewInvestor);
    app.route("/investors/login").post(LoginInvestor);
    app.route("/developers/login").post(LoginDeveloper)
    app.route("/developers").post(addNewDeveloper);

    //coins api
    app.route("/coins")
        .get(allCoins)
        .post(addNewCoin);
    //app.route("/date-of-coins").get(dateOfCoins);
    //bidding api
    app.route("/biddings")
        .post(addNewBidding);

    //allocation engine api
    app.route("/coin/allocation/:coinId")
        .get(allocate);

    //bidding api
    app.route("/biddings")
        .post(addNewBidding);

    //timer api
}

export default routes;