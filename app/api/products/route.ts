import { db } from "@/lib/db";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");
  try {
    if (categoryId) {
      const products = await db.product.findMany({
        where: {
          categoryId: categoryId,
        },
      });

      return new Response(JSON.stringify(products));
    }

    const products = await db.product.findMany({});

    return new Response(JSON.stringify(products));
  } catch (error) {
    return new Response("Error");
  }
};
