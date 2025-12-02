// src/pages/Home.js
import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import MapaGeolocalizacion from "../components/MapaGeolocalizacion";
import Chatbot from "../components/Chatbot";
import BibliotecaRazas from "../components/BibliotecaRazas";
import SocialCarousel from "../components/SocialCarousel";

function Home() {
  return (
    <div style={{ backgroundColor: "#FAF9F6", minHeight: "100vh" }}>

      {/* ===== ENCABEZADO ===== */}
      <header style={{
        backgroundColor: "#BAEDB9",
        color: "white",
        padding: "15px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}>
        <img
          src="/logo.jpeg"
          alt="Logo CEMCAA"
          style={{ width: "60px", height: "60px", borderRadius: "50%", border: "2px solid white" }}
        />
        <h2 className="fw-bold mb-0">CEMCAA</h2>
      </header>

      {/* ===== BANNER ===== */}
      <div style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1601758123927-3b7b4d2b27d3?auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "450px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        filter: "brightness(90%)"
      }}>
        <div style={{
          backgroundColor: "rgba(0,0,0,0.45)",
          padding: "40px",
          borderRadius: "10px"
        }}>
          <h1 className="fw-bold">CEMCAA</h1>
          <p style={{ fontSize: "1.2rem" }}>
            Amor, rescate y esperanza para cada peludo sin hogar 🐾
          </p>
        </div>
      </div>

      {/* ===== QUIÉNES SOMOS (DISEÑO MEJORADO) ===== */}
<Container className="my-6 py-5">
  <Row className="align-items-center justify-content-center">

    {/* IMAGEN */}
    <Col md={5} className="text-center mb-3">
      <img
        src="https://www.shutterstock.com/shutterstock/photos/760768426/display_1500/stock-vector-dog-s-logo-with-a-cat-in-a-flat-style-760768426.jpg"
        alt="CEMCAA"
        style={{
          width: "90%",
          maxWidth: "350px",
          borderRadius: "20px",
          boxShadow: "0 12px 25px rgba(0,0,0,.25)",
          padding: "10px",
          background: "white"
        }}
      />
    </Col>

    {/* TEXTO */}
    <Col md={6}>
      <h2 className="fw-bold text-success mb-3">
        Nuestra misión es proteger vidas
      </h2>

      <p style={{ fontSize: "1.05rem" }}>
        En <strong>CEMCAA</strong> somos una organización dedicada a cambiar historias de abandono en historias de amor.
        Rescatamos animales en riesgo, los curamos, los rehabilitamos y buscamos para ellos un hogar digno y responsable.
      </p>

      <p>
        Trabajamos todos los días con un solo objetivo: devolver esperanza a quienes no tienen voz.
      </p>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li>🐾 Rescate y protección animal</li>
        <li>🏥 Atención veterinaria</li>
        <li>🏠 Adopciones responsables</li>
        <li>💚 Seguimiento post-adopción</li>
        <li>🤝 Conciencia social</li>
      </ul>
    </Col>

  </Row>
</Container>

      {/* ===== HISTORIAS ===== */}
    <Container className="my-5">
  <h3 className="fw-bold text-warning text-center mb-4">
    Historias que inspiran
  </h3>

  <div style={{
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    paddingBottom: "15px"
  }}>
    <Card style={{ minWidth: "300px" }} className="shadow-sm">
      <Card.Img src="https://image.shutterstock.com/image-photo/beagle-dog-suitcase-things-260nw-2481066257.jpg" />
      <Card.Body>
        <Card.Title>Luna</Card.Title>
        <Card.Text>Luna pasó varios meses viviendo en la calle, buscando comida y refugio cada noche. Fue rescatada en muy mal estado, con miedo a las personas y sin confiar en nadie.</Card.Text>
      </Card.Body>
    </Card>

    <Card style={{ minWidth: "300px" }} className="shadow-sm">
      <Card.Img src="https://image.shutterstock.com/image-photo/family-enjoying-quality-time-together-260nw-2585353217.jpg" />
      <Card.Body>
        <Card.Title>Max</Card.Title>
        <Card.Text>Max fue entregado al refugio después de que su antigua familia ya no pudo hacerse cargo de él. Durante semanas parecía triste, observando en silencio, esperando que alguien lo eligiera otra vez.</Card.Text>
      </Card.Body>
    </Card>

    <Card style={{ minWidth: "300px" }} className="shadow-sm">
      <Card.Img src="https://image.shutterstock.com/image-photo/daily-concept-japanese-bobtail-cat-260nw-2318160345.jpg" />
      <Card.Body>
        <Card.Title>Kitty</Card.Title>
        <Card.Text>Kitty fue encontrada asustada y herida, escondida bajo un automóvil durante una tormenta. No se dejaba tocar y temblaba al ver personas.</Card.Text>
      </Card.Body>
    </Card>
  </div>
</Container>


      {/* ===== REDES SOCIALES ===== */}
      <Container className="my-5 text-center">
        <h3 className="fw-bold text-primary mb-4">📲 Nuestras redes sociales</h3>
        <p>
          Aquí puedes ver nuestras publicaciones más recientes de Facebook e Instagram.
        </p>
        <SocialCarousel />
      </Container>

      {/* ===== MAPA ===== */}
      <Container className="my-5">
        <h3 className="fw-bold text-success text-center mb-4">📍 Encuéntranos aquí</h3>
        <MapaGeolocalizacion />
      </Container>

      {/* ===== BIBLIOTECA ===== */}
      <Container className="my-5">
        <BibliotecaRazas />
      </Container>

      {/* ===== MENSAJE FINAL ===== */}
      <Container className="my-5">
        <Card style={{
          backgroundColor: "#81B29A",
          color: "white",
          borderRadius: "15px"
        }} className="text-center p-5 shadow-sm border-0">
          <h3>Ellos solo necesitan una oportunidad</h3>
          <p style={{ maxWidth: "700px", margin: "0 auto" }}>
            Cada adopción cambia dos vidas: la de ellos y la tuya ❤️
          </p>
        </Card>
      </Container>

      {/* ===== CHATBOT ===== */}
      <Chatbot />

    </div>
  );
}

export default Home;
