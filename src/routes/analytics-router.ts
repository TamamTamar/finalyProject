import { Router } from "express";
import { analyticsService } from "../services/analytics-service";
import { isAdmin } from "../middleware/is-admin";
import { usersService } from "../services/users-service";

const router = Router();

router.get("/inventory",  ...isAdmin, async (req, res, next) => {
    try {
        const inventory = await analyticsService.getInventory();
        res.json(inventory);
    } catch (e) {
        next(e);
    }
});

router.get("/total-sold", ...isAdmin, async (req, res, next) => {
    try {
        const totalSold = await analyticsService.getTotalSold();
        res.json({ totalSold });
    } catch (e) {
        next(e);
    }
});

router.get("/product-sales/:id", ...isAdmin, async (req, res, next) => {
    try {
        const productId = req.params.id;
        const productSales = await analyticsService.getProductSales(productId);
        res.json(productSales);
    } catch (e) {
        next(e);
    }
});


// top ordersusers
router.get("/top-users", ...isAdmin, async (req, res, next) => {
    try {
      const topUsers = await analyticsService.getTopUsers();
      console.log(topUsers);
      res.json(topUsers);
    } catch (e) {
      next(e);
    }
  });

export { router as analyticsRouter };
