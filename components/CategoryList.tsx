import { Category } from "./Category";

const CategoryList = ({ categories }) => {
  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <Category category={category} />
          {category.children.length > 0 && (
            <div className="ml-10">
              <CategoryList categories={category.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
