import { addNewBidding, bidsPerStatus ,getBidbyCoin,bidUpdate,bidsByInvestor} from "../controllers/biddings.controllers";
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
    app.route("/bids-per-status/:investorId/:status").get(bidsPerStatus)
    //allocation engine api
    app.route("/coin/allocation/:coinId")
        .get(allocate);

    //bidding api
    app.route("/biddings")
        .post(addNewBidding);
    app.route("/get-bid-by-coin/:coinId/:investorId").get(getBidbyCoin)
    app.route("/editBid").post(bidUpdate)
<<<<<<< HEAD

    app.route("/get-bid-by-investor/:id").get(bidsByInvestor)
=======
>>>>>>> 9a2bc5d53ec3160845196212b72902a9ac6d9b02

    //timer api
}

export default routes;