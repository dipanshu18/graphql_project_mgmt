import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";

import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-pink-600">Something went wrong</h1>;
  }

  return (
    <>
      <h1 className="text-2xl lg:text-4xl font-bold my-10 text-center md:text-left">
        Projects
      </h1>
      <div className="max-w-full flex justify-center md:justify-start items-center gap-10 flex-wrap mb-20">
        {data.projects.length > 0 ? (
          data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <h1>No Projects...</h1>
        )}
      </div>
      <hr />
    </>
  );
}
