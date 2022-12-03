import {
  CubeTransparentIcon,
  CircleStackIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const mySkills = [
  {
    name: "Web 3",
    icon: CubeTransparentIcon,
    description:
      "Build and ship the next decentralized App on any EVM compatible blockchain with Solidity Smart Contracts.",
    skillDescription: "Languages I speak",
    skillList: ["Solidity", "Javascript", "CSS", "HTML"],
    toolDescription: "Frameworks & Libraries",
    toolList: [
      "Next.js",
      "Hardhat",
      "Ether.js",
      "Tailwind CSS",
      "Moralis",
      "ThirdWeb",
      "Alchemy",
    ],
  },
  {
    name: "Data Engineering",
    icon: CircleStackIcon,
    description:
      "Derive better insights and build new data products with a scalable data warehouse and custom data pipelines.",
    skillDescription: "Languages I speak",
    skillList: ["Python", "SQL"],
    toolDescription: "Frameworks & Libraries",
    toolList: [
      "DBT",
      "Prefect",
      "Superset",
      "Airbyte",
      "Great Expectations",
      "Pandas",
    ],
  },
  {
    name: "Business & Marketing",
    icon: UsersIcon,
    description:
      "Learn how to how to optimize your current business or get feedback on a complete new business idea.",
    skillDescription: "Experiences I draw from",
    skillList: ["SEO & SEA", "Agile Sprints", "BizDev"],
    toolDescription: "Tools",
    toolList: [
      "Ahrefs",
      "Google Search Console",
      "Google Tag Manager",
      "Business Model Canvas",
      "Notion",
    ],
  },
];

export default function Skills() {
  return (
    <div className="relative pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase">
          Skills
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          What I can help you with? 💪
        </p>
        <p className="mt-5 max-w-prose mx-auto text-xl text-base-content/80">
          I am a self-taught programmer with a CEMS Master in International
          Management. Having both a business and deep technical understanding
          allows me to easily communicate complex technical ideas with business
          stakeholders.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3">
            {mySkills.map((skill) => (
              <div key={skill.name} className="pt-6">
                <div className="flow-root bg-base-100 rounded-lg px-6 pb-8 shadow h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                        <skill.icon
                          className="h-6 w-6 text-primary-content"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight">
                      {skill.name}
                    </h3>
                    <p className="mt-5 text-base text-base-content/80">
                      {skill.description}
                    </p>
                    <p className="mt-5 text-base font-medium text-primary">
                      {skill.skillDescription}
                    </p>
                    <div>
                      <p className="mt-2 text-base text-base-content/80">
                        {skill.skillList.join(", ")}
                      </p>
                    </div>
                    <p className="mt-5 text-base font-medium text-primary">
                      {skill.toolDescription}
                    </p>
                    <ul>
                      {skill.toolList.map((tool) => (
                        <li
                          key={tool}
                          className="mt-2 text-sm font-base text-base-content/80"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
