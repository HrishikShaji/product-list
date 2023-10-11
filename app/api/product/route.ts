import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const product = await db.product.create({
      data: {
        name: body.name,
        categoryId: body.categoryId,
      },
    });

    return new Response(JSON.stringify(product));
  } catch (error) {
    return new Response("Error");
  }
};
