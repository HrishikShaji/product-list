import { db } from "@/lib/db";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const parentId = searchParams.get("parentId");

  try {
    const categories = await db.category.findMany({
      where: {
        parentId: parentId,
      },
    });

    return new Response(JSON.stringify(categories));
  } catch (error) {
    return new Response("some error", { status: 500 });
  }
};
