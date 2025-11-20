import { useState } from "react";

export default function admin() {
const [formData, setFormData] = useState({
    nume: "",
    prenume: "",
    cnp: "",
    an: "",
    serie: "",
});

const [message, setMessage] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:3000/api/inserare/studenti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Student inserat cu succes!");
        setFormData({ nume: "", prenume: "", cnp: "", an: "", serie: "" });
      } else {
        setMessage("❌ " + (data.error || "Eroare la inserare"));
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Eroare de rețea");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Inserare Student
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="nume"
            placeholder="Nume"
            value={formData.nume}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="prenume"
            placeholder="Prenume"
            value={formData.prenume}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="cnp"
            placeholder="CNP"
            value={formData.cnp}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="an"
            placeholder="An"
            value={formData.an}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="serie"
            placeholder="Serie"
            value={formData.serie}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Adaugă Student
        </button>

        {message && (
          <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}