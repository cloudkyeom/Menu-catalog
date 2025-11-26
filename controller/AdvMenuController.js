import Menu from "../models/MenuModel.js";
import { Op } from "sequelize";
import { sequelize } from "../config/db.js";


// Helper to format pagination response
const paginate = (page = 1, per_page = 10) => {
    const p = Math.max(Number(page) || 1, 1);
    const pp = Math.max(Number(per_page) || 10, 1);
    const offset = (p - 1) * pp;
    return { 
        limit: pp, offset, 
        page: p, 
        per_page: pp 
    };
};

// group by category
export const groupByCategory = async (req, res) => {
    try {
        const { mode, per_category } = req.query;
        if (mode === "count") {
            // group and count
            const rows = await Menu.findAll({ 
                attributes: [
                    ["category", "category"], 
                    [sequelize.fn("COUNT", sequelize.col("category")), "count"]
                ], 
                group: ["category"]});

            const data = {};
            rows.forEach((r) => { data[r.get("category")] = Number(r.get("count")); });
            return res.json({ data });
        }

        // mode=list
        const limit = Number(per_category) || 5;
        const rows = await Menu.findAll({ order: [["category", "ASC"]] });
        const grouped = rows.reduce((acc, item) => {
            const cat = item.category || "uncategorized";
            if (!acc[cat]) acc[cat] = [];
            if (acc[cat].length < limit) acc[cat].push(item);
            return acc;
        }, {});

        return res.json({ data: grouped });
    } catch (err) {
        return res.status(500).json({ message: err.message }); 
    }
};

// search full text
export const searchFullText = async (req, res) => {
    try {
        const q = req.query.q || "";
        const page = req.query.page || 1;
        const per_page = req.query.per_page || 10;
        const { limit, offset, page: current, per_page: pp } = paginate(page, per_page);


        const rows = await Menu.findAndCountAll({
            where: {
                [Op.or]: [
                { 
                    name: { [Op.like]: `%${q}%` } 
                },
                { 
                    description: { [Op.like]: `%${q}%` }}]
            },
            limit, offset 
        });

        return res.json({ 
            data: rows.rows, 
            pagination: { 
                total: rows.count, 
                page: current, 
                per_page: pp } 
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};