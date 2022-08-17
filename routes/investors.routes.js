import { addNewInvestor,LoginInvestor } from "../controllers/investors.controller";
import { addNewDeveloper,LoginDeveloper } from "../controllers/developers.controller";
import { allCoins, addNewCoin } from "../controllers/coins.controller";
import { allocate } from "../controllers/coins.controller";
import { addNewBidding } from "../controllers/biddings.controllers";

const routes = (app) => {
    app.route("/investors").post(addNewInvestor);
    app.route("/investors/login").post(LoginInvestor);
    app.route("/developers/login").post(LoginDeveloper)
    app.route("/developers").post(addNewDeveloper);

    //coins api
    app.route("/coins")
    .get(allCoins)
    .post(addNewCoin);

    //allocation engine api
    app.route("/coin/allocation/:coinId")
    .get(allocate);

    //bidding api
    app.route("/biddings")
    .post(addNewBidding);

    

    
    
    //timer api
}

export default routes;