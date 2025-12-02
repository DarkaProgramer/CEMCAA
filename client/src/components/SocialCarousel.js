import { useEffect, useState } from "react";

/*
  LISTA DE PUBLICACIONES
  Usa URLs EMBED de Facebook
  Usa URLs normales de Instagram (link al post)
*/
const POSTS = [
  // FACEBOOK (embed URLs)
  {
    type: "facebook",
    src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0YHsf3tmhVFeZcRUeBm7c8YoXxmVEJSxXVC2xV4tkY3GzrSFye6VMxQpb9JrcCuwVl%26id%3D61578235241904&show_text=true&width=500"
  },
  {
    type: "facebook",
    src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid091GmuVxtLrktUYwK4nfCSo9w7k5z6W9oSk9NxoNxSaiJR29HfhdVFt5AAy2Wdn12l%26id%3D61578235241904&show_text=true&width=500"
  },
  {
    type: "facebook",
    src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02v9hAZSbBW1qLg2YEKaXfSZadcp8X972PsADG2QDJGL4kA9w4i6Fz7kre5zgz9JLcl%26id%3D61578235241904&show_text=true&width=500"
  },
  {
    type: "facebook",
    src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0cQVrUisFyieoLVB5p1ZAHUcNmzYxcaPKk2s4zFuzwsQhJFrvm5CFV8cqLo4JE7H6l%26id%3D61578235241904&show_text=true&width=500"
  },

  // INSTAGRAM (links normales al post)
  {
    type: "instagram",
    src: "https://www.instagram.com/p/DQVoWZ7DJyj/"
  },
  {
    type: "instagram",
    src: "https://www.instagram.com/p/DMVUk4ftb7Z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    type: "instagram",
    src: "https://www.instagram.com/reel/DMUZTYSMD90/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    type: "instagram",
    src: "https://www.instagram.com/p/DOM67pkjC1n/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  }

  // 👉 Puedes seguir agregando más aquí
];

export default function SocialCarousel() {
  const [start, setStart] = useState(0);
  const [mobile, setMobile] = useState(false);

  const visibleDesktop = 3;
  const visibleMobile = 1;

  // Detectar tamaño de pantalla
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visible = mobile ? visibleMobile : visibleDesktop;

  // ROTACIÓN AUTOMÁTICA SIN REPETICIONES
  useEffect(() => {
    const timer = setInterval(() => {
      setStart(prev => (prev + visible) % POSTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [visible]);

  // Cargar script de Instagram UNA SOLA VEZ
  useEffect(() => {
    if (!document.getElementById("ig-embed")) {
      const s = document.createElement("script");
      s.id = "ig-embed";
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    } else if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [start]);

  // OBTENER POSTS SIN DUPLICADOS EN VISTA
  const visibles = POSTS
    .slice(start, start + visible)
    .concat(POSTS.slice(0, Math.max(0, start + visible - POSTS.length)));

  return (
    <>
      <style>{`
        .soc-wrap {
          display:flex;
          gap:15px;
          justify-content:center;
          flex-wrap:wrap;
        }
        .soc-card {
          width:320px;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 4px 12px rgba(0,0,0,.15);
          background:white;
        }
        .soc-card iframe {
          width:100%;
          height:450px;
          border:0;
        }
        .ig-box {
          padding:10px;
        }
      `}</style>

      <div className="soc-wrap">
        {visibles.map((p, i) => (
          <div className="soc-card" key={`${p.type}-${i}`}>
            {p.type === "facebook" && (
              <iframe
                src={p.src}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                title={`fb-post-${i}`}
              />
            )}

            {p.type === "instagram" && (
              <div className="ig-box">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={p.src}
                  data-instgrm-version="14"
                  style={{
                    background:"#fff",
                    border:0,
                    width:"100%",
                    margin:"0 auto"
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}