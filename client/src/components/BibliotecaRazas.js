import React, { useEffect, useState } from "react";

export default function BibliotecaRazas() {
  const [tab, setTab] = useState("dogs");
  const [dogs, setDogs] = useState([]);
  const [cats, setCats] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     TRADUCCIÓN OFFLINE
  ========================= */

  const breedNames = {
    "German Shepherd": "Pastor Alemán",
    "Siberian Husky": "Husky Siberiano",
    "Standard Poodle": "Caniche",
    "Miniature Poodle": "Caniche Miniatura",
    "Toy Poodle": "Caniche Toy",
    "Great Dane": "Gran Danés",
    "Doberman Pinscher": "Dóberman",
    "French Bulldog": "Bulldog Francés",
    "English Bulldog": "Bulldog Inglés",
    "Golden Retriever": "Golden Retriever",
    "Labrador Retriever": "Labrador Retriever",
    "Saint Bernard": "San Bernardo",
    "Bernese Mountain Dog": "Boyero de Berna",
    "American Pit Bull Terrier": "Pitbull Americano"
  };

  const temperamentDic = {
    "Affectionate": "Afectuoso",
    "Energetic": "Enérgico",
    "Loyal": "Leal",
    "Gentle": "Dócil",
    "Quiet": "Tranquilo",
    "Playful": "Juguetón",
    "Intelligent": "Inteligente",
    "Friendly": "Amigable",
    "Alert": "Alerta",
    "Independent": "Independiente",
    "Devoted": "Devoto",
    "Protective": "Protector",
    "Curious": "Curioso",
    "Watchful": "Vigilante",
    "Social": "Sociable",
    "Athletic": "Atlético",
    "Courageous": "Valiente"
  };

  const translateLocal = (text) => {
    if (!text) return "";
    return text.split(",").map(w => temperamentDic[w.trim()] || w.trim()).join(", ");
  };

  const translateBreed = (name) => breedNames[name] || name;

  /* =========================
     UTILIDADES
  ========================= */

  const normalize = s => (s || "").toLowerCase();

  const averageKg = (metric = "") => {
    if (!metric) return 8;
    const nums = metric.replace(/[^\d.-]/g, "").split("-").map(n => parseFloat(n)).filter(n => !isNaN(n));
    return nums.length === 1 ? nums[0] : nums.length >= 2 ? (nums[0] + nums[1]) / 2 : 8;
  };

  const sizeForDog = kg => (kg <= 10 ? "Chicos" : kg <= 25 ? "Medianos" : "Grandes");
  const sizeForCat = kg => (kg <= 4 ? "Pequeños" : kg <= 6 ? "Medianos" : "Grandes");

  /* =========================
     IMÁGENES
  ========================= */

  const dogImage = async (id) => {
    try {
      const r = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${id}`);
      const d = await r.json();
      return d?.[0]?.url || "";
    } catch { return ""; }
  };

  const catImage = async (id) => {
    try {
      const r = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`);
      const d = await r.json();
      return d?.[0]?.url || "";
    } catch { return ""; }
  };

  /* =========================
     CARGA PERROS
  ========================= */

  const loadDogs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.thedogapi.com/v1/breeds");
      const data = await res.json();

      const formatted = await Promise.all(
        data.map(async d => {
          const kg = averageKg(d.weight?.metric);
          return {
            ...d,
            _kg: kg,
            _size: sizeForDog(kg),
            _img: d.image?.url || await dogImage(d.id),
            _name_es: translateBreed(d.name),
            _desc_es: translateLocal(d.temperament)
          };
        })
      );
      setDogs(formatted);
    } catch {
      setError("No se pudieron cargar los perros.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CARGA GATOS
  ========================= */

  const loadCats = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.thecatapi.com/v1/breeds");
      const data = await res.json();

      const formatted = await Promise.all(
        data.map(async c => {
          const kg = averageKg(c.weight?.metric);
          return {
            ...c,
            _kg: kg,
            _size: sizeForCat(kg),
            _img: c.image?.url || await catImage(c.id),
            _name_es: translateBreed(c.name),
            _desc_es: c.description || "Sin descripción"
          };
        })
      );
      setCats(formatted);
    } catch {
      setError("No se pudieron cargar los gatos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === "dogs" && dogs.length === 0) loadDogs();
    if (tab === "cats" && cats.length === 0) loadCats();
  }, [tab]);

  /* =========================
     FILTRO
  ========================= */

  const dataset = tab === "dogs" ? dogs : cats;
  const filtered = dataset.filter(b => normalize(b._name_es).includes(normalize(q)));

  const sizes = tab === "dogs" ? ["Chicos", "Medianos", "Grandes"] : ["Pequeños", "Medianos", "Grandes"];

  const grouped = sizes.reduce((acc, s) => {
    acc[s] = filtered.filter(b => b._size === s);
    return acc;
  }, {});

  /* =========================
     UI
  ========================= */

  return (
    <div style={{ padding: 16 }}>
      <style>{`
        .wrap{max-width:1100px;margin:auto;font-family:Arial}
        .head{display:flex;gap:10px;flex-wrap:wrap}
        .btn{border:0;padding:10px 14px;border-radius:999px;cursor:pointer}
        .active{background:#4caf50;color:white}
        .ghost{background:#e9f5f0}
        .search{flex:1;padding:10px;border-radius:999px;border:1px solid #ddd}
        .section{margin-top:20px}
        .title{font-weight:bold;margin-bottom:8px}
        .carousel{display:flex;gap:12px;overflow-x:auto}
        .card{min-width:220px;background:white;border-radius:14px;
          box-shadow:0 4px 12px rgba(0,0,0,.1);overflow:hidden}
        .img{
          aspect-ratio:4/3;
          background:#eee;
          display:flex;align-items:center;justify-content:center;
        }
        .img img{
          width:100%;
          height:100%;
          object-fit:contain; /* IMAGEN COMPLETA */
          background:white;
        }
        .body{padding:10px}
        .h{font-weight:bold}
        .desc{font-size:12px;color:#777;margin-top:6px}
        .tag{
          background:#eef7f4;border-radius:10px;padding:3px 8px;font-size:12px
        }
        .row{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0}

        /* MODO COMPACTO AL BUSCAR */
        .compact .card{min-width:160px;}
        .compact .img{aspect-ratio:1/1;max-height:120px;}
        .compact .h{font-size:13px;}
        .compact .desc{
          font-size:11px;max-height:40px;overflow:hidden
        }
        .compact .tag{font-size:10px;padding:2px 6px;}
      `}</style>

      <div className={`wrap ${q ? "compact" : ""}`}>
        <div className="head">
          <button className={`btn ${tab==="dogs"?"active":"ghost"}`} onClick={() => setTab("dogs")}>🐶 Perros</button>
          <button className={`btn ${tab==="cats"?"active":"ghost"}`} onClick={() => setTab("cats")}>🐱 Gatos</button>
          <input className="search" placeholder="Buscar raza..." value={q} onChange={e => setQ(e.target.value)} />
        </div>

        {loading && <p>Cargando razas…</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {!loading && !error && sizes.map(size => (
          <div className="section" key={size}>
            <div className="title">{size}</div>
            <div className="carousel">
              {grouped[size].length === 0 && <span>No hay resultados</span>}
              {grouped[size].map(b => (
                <div className="card" key={b.id || b.name}>
                  <div className="img">
                    {b._img && <img src={b._img} alt={b._name_es} />}
                  </div>
                  <div className="body">
                    <div className="h">{b._name_es}</div>
                    <div className="row">
                      <span className="tag">⚖️ {b.weight?.metric || "N/A"} kg</span>
                      {tab === "dogs" && <span className="tag">📏 {b.height?.metric || "N/A"} cm</span>}
                      <span className="tag">⏳ {b.life_span || "N/A"}</span>
                    </div>
                    <div className="desc">{b._desc_es || "Sin datos"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
