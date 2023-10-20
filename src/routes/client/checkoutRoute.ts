import express, { Request, Response } from "express";
import { errorMessages } from "../../utils/responseMessages/errorsMessages";
import { CheckoutController } from "../../controllers/client/checkoutController";

const checkoutRouter = express.Router();

checkoutRouter.post("/cart", async (req: Request, res: Response) => {
  try {
    const resData = await CheckoutController.createCartCheckout(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData);
    res.status(200).send(resData)
  } catch (error: any) {
    console.log(error)
    const { httpCode, message } = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

export { checkoutRouter }
