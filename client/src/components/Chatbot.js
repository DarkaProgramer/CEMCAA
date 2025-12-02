import React, { useState, useEffect, useRef } from "react";

/* =========================
   BASE DE CONOCIMIENTO
========================= */
  const KB = {
    "🐶 Alimentación (Perros)": [
      { q: "¿Cuánto debe comer un perro?", a: "Chico: 1 taza, Mediano: 2, Grande: 3-4 tazas al día." },
      { q: "¿Qué no pueden comer?", a: "Chocolate, uvas, cebolla, ajo, café, alcohol y huesos cocidos." },
      { q: "¿Cuántas veces comen?", a: "Adultos 2 veces, cachorros 3 veces." }
    ],
    "🐱 Alimentación (Gatos)": [
      { q: "¿Cuánto debe comer un gato?", a: "Entre 40 y 60g de alimento seco." },
      { q: "¿Qué no pueden comer?", a: "Leche de vaca, chocolate, ajo, cebolla, atún excesivo." },
      { q: "¿Cuántas veces comen?", a: "2 o 3 veces al día." }
    ],
    "💉 Salud (Perros)": [
      { q: "¿Qué vacunas necesita?", a: "Múltiple y rabia." },
      { q: "¿Cada cuándo desparasitar?", a: "Cada 3 meses." },
      { q: "¿Cuándo esterilizar?", a: "Desde los 6 meses." }
    ],
    "💉 Salud (Gatos)": [
      { q: "¿Qué vacunas necesita?", a: "Triple felina y rabia." },
      { q: "¿Cada cuándo desparasitar?", a: "Cada 3 meses." },
      { q: "¿Cuándo esterilizar?", a: "Entre 5 y 6 meses." }
    ],
    "🏠 Adopción": [
      { q: "¿Qué necesito?", a: "INE y compromiso." },
      { q: "¿Cuánto cuesta adoptar?", a: "Es gratuita." },
      { q: "¿Cuánto tarda?", a: "De 2 a 4 semanas." }
    ],
    "🧼 Higiene": [
      { q: "¿Cada cuándo bañar perro?", a: "cada 2 o 3 semanas." },
      { q: "¿Cada cuándo bañar gato?", a: "Solo si es necesario." },
      { q: "¿Corte de uñas?", a: "Una vez al mes." }
    ],
    "🐾 Comportamiento": [
      { q: "¿Por qué ladran?", a: "Estrés o ansiedad." },
      { q: "¿Por qué muerden?", a: "Juego o defensa." },
      { q: "¿Cómo educar?", a: "Premios y rutina." }
    ],
    "🚨 Emergencias": [
      { q: "¿No come?", a: "Ve al veterinario si pasan 24h." },
      { q: "¿Vomita?", a: "Atención inmediata." },
      { q: "¿Heridas?", a: "Limpia y consulta." }
    ]
  };

export default function Chatbot() {

  /* ESTADOS */
  const [open, setOpen] = useState(false);
  const [categoria, setCategoria] = useState(null);
  const [verPreguntas, setVerPreguntas] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);
  const [chat, setChat] = useState([
    { from: "bot", text: "Hola 🐶🐱 Soy el asistente de CEMCAA para perros y gatos. Elige una categoría o escribe tu duda." }
  ]);

  const chatRef = useRef(null);

  /* AUTO SCROLL */
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  /* LOGICA DEL BOT */
  const responder = (texto) => {
    if (!texto.trim()) return;

    setChat(prev => [...prev, { from: "user", text: texto }]);
    setMensaje("");
    setEscribiendo(true);
    setVerPreguntas(false);

    const lista = categoria ? KB[categoria] : [];
    const t = texto.toLowerCase();
    const encontrada = lista.find(p => t.includes(p.q.toLowerCase().split(" ")[0]));
    const respuesta = encontrada 
      ? encontrada.a 
      : "Selecciona una categoría para ayudarte mejor ✅";

    setTimeout(() => {
      setChat(prev => [...prev, { from: "bot", text: respuesta }]);
      setEscribiendo(false);
    }, 600);
  };

  return (
    <>
      <style>{`
        .cb-fab {
          position: fixed; right: 25px; bottom: 25px;
          width: 60px; height: 60px; border-radius: 50%;
          background: linear-gradient(135deg,#43cea2,#185a9d);
          color:white;
          display:flex; justify-content:center; align-items:center;
          font-size:26px; cursor:pointer;
          box-shadow:0 4px 12px rgba(0,0,0,.3);
          z-index:1000;
        }

        .cb-panel {
          position: fixed; right: 25px; bottom: 95px;
          width: 340px; height: 480px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .cb-header {
          background: linear-gradient(135deg,#43cea2,#185a9d);
          color:white;
          padding:10px;
          font-weight:bold;
        }

        .cb-body {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
          background: #f5f5f5;
        }

        .bubble {
          max-width: 80%;
          margin-bottom: 8px;
          padding: 8px;
          border-radius: 12px;
        }

        .user { background:#DCF8C6; margin-left:auto; }
        .bot { background:white; }

        .cb-list {
          max-height: 140px;
          overflow-y: auto;
          background: white;
          padding: 6px;
          border-top: 1px solid #ddd;
        }

        .cb-btn {
          width: 100%;
          margin-bottom: 5px;
          border: none;
          border-radius: 8px;
          background: #81B29A;
          color: white;
          padding: 6px;
          cursor: pointer;
        }

        .cb-btn-back {
          background: #ddd !important;
          color: #333 !important;
        }

        .cb-input {
          display: flex;
          padding: 6px;
          border-top: 1px solid #ddd;
          background: white;
        }

        .cb-input input {
          flex: 1;
          border: none;
          outline: none;
          padding: 6px;
        }

        .cb-input button {
          border: none;
          background: #43cea2;
          color: white;
          border-radius: 15px;
          padding: 6px 12px;
        }

        .top-btn {
          border: none;
          background: #185a9d;
          color: white;
          padding: 5px;
          border-radius: 12px;
          cursor: pointer;
          margin: 5px;
        }
      `}</style>

      {/* BOTÓN */}
      <div className="cb-fab" onClick={() => setOpen(!open)}>💬</div>

      {open && (
        <div className="cb-panel">

          <div className="cb-header">🐾 Asistente CEMCAA</div>

          <div className="cb-body">
            {chat.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>
                {m.text}
              </div>
            ))}
            {escribiendo && <div className="bubble bot">Escribiendo...</div>}
            <div ref={chatRef}></div>
          </div>

          {!verPreguntas && (
            <button className="top-btn" onClick={() => setVerPreguntas(true)}>
              📋 Ver preguntas
            </button>
          )}

          {verPreguntas && !categoria && (
            <div className="cb-list">
              {Object.keys(KB).map((c, i) => (
                <button key={i} className="cb-btn" onClick={() => setCategoria(c)}>
                  {c}
                </button>
              ))}
            </div>
          )}

          {verPreguntas && categoria && (
            <div className="cb-list">
              {KB[categoria].map((p, i) => (
                <button key={i} className="cb-btn" onClick={() => responder(p.q)}>
                  {p.q}
                </button>
              ))}
              <button className="cb-btn cb-btn-back" onClick={() => setCategoria(null)}>
                ⬅ Volver
              </button>
            </div>
          )}

          <div className="cb-input">
            <input
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
              placeholder="Escribe aquí..."
              onKeyDown={e => e.key === "Enter" && responder(mensaje)}
            />
            <button onClick={() => responder(mensaje)}>Enviar</button>
          </div>

        </div>
      )}
    </>
  );
}
