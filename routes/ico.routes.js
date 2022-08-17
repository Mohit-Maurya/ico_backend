import { addNewBidding, bidsPerStatus } from "../controllers/biddings.controllers";
import { addNewInvestor, LoginInvestor } from "../controllers/investors.controller";
import { addNewDeveloper, LoginDeveloper } from "../controllers/developers.controller";
import { allCoins, addNewCoin,coinById } from "../controllers/coins.controller";
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

    app.route("/coin/:id")
        .get(coinById);   
    //app.route("/date-of-coins").get(dateOfCoins);
    //bidding api
    app.route("/biddings")
        .post(addNewBidding);
    app.route("/bids-per-status").get(bidsPerStatus)
    //allocation engine api
    app.route("/coin/allocation/:coinId")
        .get(allocate);

    //bidding api
    app.route("/biddings")
        .post(addNewBidding);
    app.route("/get-bid-by-coin").get(getBidbyCoin)
    app.post("editBid").post(bidUpdate)

    //timer api
}

export default routes;