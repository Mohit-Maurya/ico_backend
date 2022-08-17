import { addNewInvestor, LoginInvestor } from "../controllers/investors.controller";
import { addNewDeveloper, LoginDeveloper } from "../controllers/developers.controller";
import {
    allCoins,
    addNewCoin,
    dateOfCoins
} from "../controllers/coins.controller";
import { addNewBidding, bidsPerStatus } from "../controllers/biddings.controllers";

const routes = (app) => {
    app.route("/investors").post(addNewInvestor);
    app.route("/investors/login").post(LoginInvestor);
    app.route("/developers/login").post(LoginDeveloper)
    app.route("/developers").post(addNewDeveloper);
    //coins api
    app.route("/coins")
        .get(allCoins)
        .post(addNewCoin);
    app.route("/date-of-coins").get(dateOfCoins);
    //bidding api
    app.route("/biddings")
        .post(addNewBidding);
    app.route("/bids-per-status/:investorId/:status").get(bidsPerStatus)
    //allocation engine api
    //timer api
}

export default routes;