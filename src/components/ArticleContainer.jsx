import Article from "./Articles";

export default function ArticleContainer() {
  const articles = [
    {
      id: 1,
      title: "Deep Learning for Image Recognition",
      year: 2021,
      totalCite: 125,
      venue: "IEEE Transactions on Pattern Analysis",
      venueLink: "https://ieee.org",
      quartile: "Q1",
      externalLink: "https://doi.org/10.1109/TPAMI.2021",
    },
    {
      id: 2,
      title: "Natural Language Processing with Transformers",
      year: 2022,
      totalCite: 85,
      venue: "ACM Transactions on AI",
      venueLink: "https://acm.org",
      quartile: "Q2",
      externalLink: "https://doi.org/10.1145/TACM.2022",
    },
    {
      id: 3,
      title: "AI for Healthcare Applications",
      year: 2023,
      totalCite: 40,
      venue: "Journal of Medical Informatics",
      venueLink: "https://elsevier.com",
      quartile: "Q3",
      externalLink: "https://doi.org/10.1016/JMI.2023",
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full m-4 border-1 border-black p-5 rounded-lg max-h-[30vh] overflow-y-auto">
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
}
