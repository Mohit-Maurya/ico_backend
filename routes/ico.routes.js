import { addNewBidding, bidsPerStatus ,getBidbyCoin,bidUpdate,bidsByInvestor} from "../controllers/biddings.controllers";
import { addNewInvestor, delInvestor, editInvestor, getInfo, LoginInvestor } from "../controllers/investors.controller";
import { addNewDeveloper, LoginDeveloper, getDeveloperInfo, editDeveloper, delDeveloper } from "../controllers/developers.controller";
import { allCoins, addNewCoin,coinById } from "../controllers/coins.controller";
import { allocate } from "../controllers/coins.controller";

const routes = (app) => {
    // investors api
    app.route("/investors").post(addNewInvestor);
    app.route("/investors/login").post(LoginInvestor);
    app.route("/get-investor-by-id/:investorId").get(getInfo)
    app.route("/edit-investor").post(editInvestor)
    app.route("/delete-investor").post(delInvestor)

    // developers api
    app.route("/developers/login").post(LoginDeveloper)
    app.route("/developers").post(addNewDeveloper);
    app.route("/get-developer-by-id/:developerId").get(getDeveloperInfo)
    app.route("/edit-Developer").post(editDeveloper)
    app.route("/delete-Developer").post(delDeveloper)

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
    app.route("get-bids-by-investor/:id").get(bidsByInvestor)

    //timer api
}

export default routes;