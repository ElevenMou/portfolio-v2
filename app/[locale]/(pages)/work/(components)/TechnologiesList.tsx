import CategoryLabel from "./TechnologyLabel";
import { getTechnologies } from "@/lib/contentful/work";
import Technology from "@/types/Technology";

async function TechnologiesList({
  technologies,
}: {
  technologies?: Technology[];
}) {
  let technologiesList: Technology[];

  if (technologies) {
    technologiesList = technologies;
  } else {
    technologiesList = await getTechnologies();
  }

  return (
    <div className="technologies-list">
      {technologiesList.map((technology) => (
        <CategoryLabel key={technology.id} technology={technology} />
      ))}
    </div>
  );
}

export default TechnologiesList;
