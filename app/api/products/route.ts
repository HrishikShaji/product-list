import { db } from "@/lib/db";
import { Product } from "@/types/types";

const getAllProductsInCategory = async (
  categoryId: string,
): Promise<Product[]> => {
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

  const allProducts = productsInCategory.concat(subcategoryProducts.flat());

  return allProducts;
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");
  try {
    if (categoryId) {
      const allProducts = await getAllProductsInCategory(categoryId);
      console.log(allProducts);
      return new Response(JSON.stringify(allProducts));
    } else {
      const products = await db.product.findMany({});
      return new Response(JSON.stringify(products));
    }
  } catch (error) {
    return new Response("Error");
  }
};
