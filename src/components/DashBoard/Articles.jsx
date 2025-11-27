import { useState } from "react";
import {articleData} from "../../service/Article";
function Articles() {
  const [articles, setArticles] = useState(articleData);
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter((a) =>
    a.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h3 className="text-3xl font-bold mb-4">Self-Help & Mindfulness Articles</h3>
      <input type="text" placeholder="Search topics like happiness, mindfulness, journaling..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-4 w-full" style={{border:'1px solid black', borderRadius:'20px', padding:'12px' }}
      />
      {filteredArticles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        filteredArticles.map((item) => (
          <div key={item.id} className="shadow mb-4 hover:shadow-lg transition" style={{boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)", padding:'30px 0 15px 45px', borderRadius:'20px', minHeight:'180px'}}>
            <h4 className="text-xl font-semibold">{item.title}</h4>
            <p>{item.description}</p>
            <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 font-medium underline">
              Read full article →
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default Articles;
