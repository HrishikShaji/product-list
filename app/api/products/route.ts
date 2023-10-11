import { db } from "@/lib/db";

const getAllProductsInCategory = async (categoryId) => {
  const productsInCategory = await db.product.findMany({
    where: {
      categoryId: categoryId,
    },
  });

  const subcategories = await db.category.findMany({
    where: {
      parentId: categoryId,
    },
  });

  const subcategoryProducts = await Promise.all(
    subcategories.map((subcategory) =>
      getAllProductsInCategory(subcategory.id),
    ),
  );

  return productsInCategory.concat(subcategoryProducts.flat());
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");
  try {
    if (categoryId) {
      const allProducts = await getAllProductsInCategory(categoryId);
      return new Response(JSON.stringify(allProducts));
    } else {
      const products = await db.product.findMany({});
      return new Response(JSON.stringify(products));
    }
  } catch (error) {
    return new Response("Error");
  }
};
