import { db } from "@/lib/db";
import { Category, CategoryChild } from "@/types/types";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const name = body.name;
    const parentId = body?.parentId ? body.parentId : null;
    const category = await db.category.create({
      data: {
        name,
        parentId,
      },
    });

    return new Response(category.name);
  } catch (error) {
    return new Response("some error", { status: 500 });
  }
};

const createCategories = (
  categories: Category[],
  parentId: string | null = null,
) => {
  const categoryList: CategoryChild[] = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == null);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      id: cate.id,
      name: cate.name,
      children: createCategories(categories, cate.id),
    });
  }
  return categoryList;
};

export const GET = async (req: Request) => {
  try {
    const categories = await db.category.findMany({});

    if (categories) {
      console.log(categories);
      const categoryList = createCategories(categories);
      return new Response(JSON.stringify(categoryList));
    }
  } catch (error) {
    return new Response("some error", { status: 500 });
  }
};
