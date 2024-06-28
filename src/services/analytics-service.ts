import Product from "../db/models/product-model";
import User from "../db/models/user-model";

export const analyticsService = {
    getInventory: async () => {
        const products = await Product.find();
        return products.map(product => ({
            title: product.title,
            quantity: product.quantity,
            sold: product.sold,
        }));
    },

    getTotalSold: async () => {
        const products = await Product.find();
        return products.reduce((acc, product) => acc + product.sold, 0);
    },

    getProductSales: async (productId: string) => {
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");
        return {
            title: product.title,
            sold: product.sold,
        };
    },
    getTopUsers: async () => {
        // שלב 1: איסוף היוזרים לפי מספר ההזמנות
        const users = await User.aggregate([
            {
                $project: {
                    name: 1,
                    orders: 1,
                    totalOrders: { $size: "$orders" },
                    totalAmount: { $sum: "$orders.totalAmount" }
                }
            },
            {
                $sort: { totalOrders: -1 } // סידור לפי מספר ההזמנות בסדר יורד
            },
            { $limit: 3 } // דוגמאה: הצגת 3 היוזרים בעמוד
        ]);
        
      
        return users;
      
        
      }
};
