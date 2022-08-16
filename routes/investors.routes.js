import { addNewUser } from "../controllers/investors.controller";

const routes = (app) => {
    app.route("/investors").post(addNewUser);
}

export default routes;