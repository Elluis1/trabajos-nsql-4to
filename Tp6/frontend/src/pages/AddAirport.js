import { useState } from "react";

const AddAirport = () => {
  const [form, setForm] = useState({
    name: "",
    city: "",
    iata_faa: "",
    icao: "",
    lat: "",
    lng: "",
    alt: "",
    tz: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Armamos payload respetando tipos
    const payload = {
      name: form.name,
      city: form.city,
      iata_faa: form.iata_faa || null,
      icao: form.icao || null,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      alt: form.alt ? parseInt(form.alt) : null,
      tz: form.tz || null,
    };

    try {
      const res = await fetch("http://localhost:8000/airports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Error al crear aeropuerto");
      }

      setMessage("✅ Aeropuerto creado correctamente");
      setForm({
        name: "",
        city: "",
        iata_faa: "",
        icao: "",
        lat: "",
        lng: "",
        alt: "",
        tz: "",
      });
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px" }}>
      <h1>Agregar Aeropuerto</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input name="city" placeholder="Ciudad" value={form.city} onChange={handleChange} required />
        <input name="iata_faa" placeholder="IATA (opcional)" value={form.iata_faa} onChange={handleChange} />
        <input name="icao" placeholder="ICAO (opcional)" value={form.icao} onChange={handleChange} />
        <input name="lat" type="number" step="any" placeholder="Latitud" value={form.lat} onChange={handleChange} required />
        <input name="lng" type="number" step="any" placeholder="Longitud" value={form.lng} onChange={handleChange} required />
        <input name="alt" type="number" placeholder="Altitud (opcional)" value={form.alt} onChange={handleChange} />
        <input name="tz" placeholder="Zona horaria (opcional)" value={form.tz} onChange={handleChange} />

        <button type="submit">Guardar</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddAirport;
