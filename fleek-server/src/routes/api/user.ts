import bcrypt from "bcryptjs";
import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";

import HttpStatusCodes from "http-status-codes";
import Request from "../../types/Request";
import User, { IUser } from "../../models/User";

const router: Router = Router();

router.post(
  "/register",
  [
    check(
      "username",
      "The username must be between 3 and 20 characters."
    ).isLength({ min: 3, max: 20 }),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      let user: IUser = await User.findOne({ username });

      if (user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              message: "Username already exists",
            },
          ],
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      // Build user object based on IUser
      const userFields = {
        username,
        password: hashed,
      };

      user = new User(userFields);

      await user.save();

      res.json({ message: "User Registered Successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

export default router;
