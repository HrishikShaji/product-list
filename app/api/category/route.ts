import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    console.log(body);
    const name = body.name;
    const parentId = body?.parentId ? body.parentId : null;
    const category = await db.category.create({
      data: {
        name,
        parentId,
      },
    });
    console.log(category);

    return new Response(category.name);
  } catch (error) {
    return new Response("some error", { status: 500 });
  }
};

const createCategories = (categories, parentId = null) => {
  const categoryList = [];
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
      const categoryList = createCategories(categories);
      return new Response(JSON.stringify(categoryList));
    }
  } catch (error) {
    return new Response("some error", { status: 500 });
  }
};
