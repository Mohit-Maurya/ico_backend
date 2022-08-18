import { addNewBidding, bidsPerStatus ,getBidbyCoin,bidUpdate,bidsByInvestor} from "../controllers/biddings.controllers";
import { addNewInvestor, LoginInvestor } from "../controllers/investors.controller";
import { addNewDeveloper, LoginDeveloper } from "../controllers/developers.controller";
import { allCoins, addNewCoin,coinById, getCoinWithDevId } from "../controllers/coins.controller";
import { allocate } from "../controllers/coins.controller";

const routes = (app) => {
    app.route("/investors").post(addNewInvestor);
    app.route("/investors/login").post(LoginInvestor);
    app.route("/developers/login").post(LoginDeveloper)
    app.route("/developers").post(addNewDeveloper);
    app.route("/")

    //coins api
    app.route("/coins")
        .get(allCoins)
        .post(addNewCoin);

    app.route("/coin/:id").get(coinById);  
    app.route("/coins/:developerId").get(getCoinWithDevId);
    //app.route("/date-of-coins").get(dateOfCoins);
    //bidding api
    app.route("/biddings").post(addNewBidding);
    app.route("/bids-per-status/:investorId/:status").get(bidsPerStatus);
    //allocation engine api
    app.route("/coin/allocation/:coinId").get(allocate);

    //bidding api
    app.route("/biddings").post(addNewBidding);
    app.route("/get-bid-by-coin/:coinId/:investorId").get(getBidbyCoin);
    app.route("/editBid").post(bidUpdate);
    

    app.route("/get-bid-by-investor/:id").get(bidsByInvestor);


    //timer api
}

export default routes;