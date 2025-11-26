import Menu from "../models/MenuModel.js";

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

export const getAllMenus = async (req, res) => {
  try {
      const { q, category, min_price, max_price, max_cal, page, per_page, sort } = req.query;
      const where = {};

      if (q) {
        where[Op.or] = [
          { name: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } }
        ];
      }
      if (category) where.category = category;
      if (min_price) where.price = {
        ...(where.price || {}), [Op.gte]: Number(min_price) 
        };
      if (max_price) where.price = { 
        ...(where.price || {}), [Op.lte]: Number(max_price) 
      };
      if (max_cal) where.calories = { 
        [Op.lte]: Number(max_cal) 
      };

      // sort example: price:asc or price:desc
      let order = [[
        "price", 
        "ASC"
      ]];

      if (sort) {
        const [field, dir] = sort.split(":");
        order = [[field, (dir || "asc").toUpperCase()]];
      }

      const { limit, offset, page: current, per_page: pp } = paginate(page, per_page);
      const { rows, count } = await Menu.findAndCountAll({ where, limit, offset, order });
      const total_pages = Math.ceil(count / pp);

      return res.json({ 
        data: rows, pagination: { 
          total: count, 
          page: current, 
          per_page: pp, total_pages 
        } });
      } catch (err) {
        return res.status(500).json({ message: err.message });
}};

  export const getMenuById = async (req, res) =>{
    try {
      const { id } = req.params;

      const menu = await Menu.findByPk(id);

      if (!menu) {
        return res.status(404).json({
          success: false,
          message: "Menu not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: menu,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }
  };

export const createMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json({
      message: "Menu created successfully",
      data: menu
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateMenu = async (req, res) => {
  const { id } = req.params;
  await Menu.update(req.body, { where: { id } });

  const updated = await Menu.findByPk(id);

  res.json({
    message: "Menu updated successfully",
    data: updated
  });
};

export const deleteMenu = async (req, res) => {
  const { id } = req.params;
  await Menu.destroy({ where: { id } });
  res.json({ message: "Menu deleted successfully" });
};
