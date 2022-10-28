import { removeTokenCookie } from "../../helpers/cookies";
import { magicAdmin } from "../../helpers/magic-client";
import { verifyToken } from "../../helpers/utils";

export default async function logout(req, res) {
  try {
    if (!req.cookies.token)
      return res.status(401).json({ message: "User is not logged in" });
    const token = req.cookies.token;

    const userId = await verifyToken(token);
    removeTokenCookie(res);
    try {
      await magicAdmin.users.logoutByIssuer(userId);
      console.log("removed user magic");
    } catch (error) {
      console.error("Error occurred while logging out magic user", error);
    }
    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    console.error({ error });
    res.status(401).json({ message: "User is not logged in" });
  }
}
