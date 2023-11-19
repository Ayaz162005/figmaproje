import { categories } from "../../utils/categories";
import TopicElement from "../TopicElement";

export default function BrowseCategories() {
  return (
    <section className="m-auto xl:w-[1000px] md:w-[600px] w-[300px] mt-20">
      <h3 className="font-semibold text-2xl xl:text-3xl mb-2 ">
        Browse Categories
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((i) => (
          <TopicElement image={i.image} text={i.text} logo={i.logo} />
        ))}
      </div>
    </section>
  );
}
