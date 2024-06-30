import { Router } from "express";
import { orderService } from "../services/order-service";
import { validateToken } from "../middleware/validate-token";
import { isAgeValid } from "../middleware/is-age";
import { isAdmin } from "../middleware/is-admin";
import { usersService } from "../services/users-service";
import { isUser } from "../middleware/is-user";
import { isAdminOrSelfUser } from "../middleware/is-admin-or-self-user";
import { isAdminOrSelf } from "../middleware/is-admin-or-self";

const router = Router();

//create new order
router.post("/", ...isAgeValid, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const products = req.body.products;

        const order = await orderService.createOrder(userId, products);
        res.status(201).json(order);
     /*    const user = await usersService.getUserById(userId);
        user.orders.push(order._id);
        await user.save(); */

    } catch (e) {
        next(e);
    }
});

//get order by id
router.get("/:id", ...isAdmin, async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrder(orderId);
        res.json(order);
    } catch (e) {
        next(e);
    }
});

//get orders by user
router.get("/user/:userId", ...isAdminOrSelfUser, async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const orders = await orderService.getOrdersByUser(userId);
        console.log(orders);
        res.json(orders);
    } catch (e) {
        next(e);
    }
});

//get all orders
router.get("/", ...isAdmin, async (req, res, next) => {
    try {
        const { orders, count } = await orderService.getAllOrders();
        const response = { AmountsOrders: count, orders }
        res.json(response);
    } catch (e) {
        next(e);
    }
});

//cancel order
router.patch("/cancel/:orderId", ...isAdmin, async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const cancelledOrder = await orderService.cancelOrder(orderId);
        res.json(cancelledOrder);
    } catch (e) {
        next(e);
    }
});



export { router as ordersRouter }