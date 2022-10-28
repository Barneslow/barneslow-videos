import { removeTokenCookie } from "../../helpers/cookies";
import { verifyToken } from "../../helpers/utils";
import magic from "../../helpers/magic";

export default async function logout(req, res) {
  console.log("fire");

  try {
    if (!req.cookies.token)
      return res.status(401).json({ message: "User is not logged in" });
    else {
      const token = req.cookies.token;

      const userId = await verifyToken(token);
      removeTokenCookie(res);
    }

    try {
      await magic.users.logoutByIssuer(userId);
    } catch (error) {
      console.log("User's session with Magic already expired");
      console.error("Error occurred while logging out magic user", error);
    }
    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    console.error({ error });
    res.status(401).json({ message: "User is not logged in" });
  }
}
