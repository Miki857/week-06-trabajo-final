const Category = require("../../models/Categorie");
const category = async () => {
    const body = {
        name: "Category 1"
    }

    await Category.create(body);
};

module.exports = category;