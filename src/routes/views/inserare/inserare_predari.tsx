import React from 'react'

const InserarePredari = () => {
    const [formData, setFormData] = React.useState({
        idstudent: "",
        idtema: "",
        data_predare: "",
        nota: ""
    });

    const [message, setMessage] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/api/inserare/predari", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if(response.ok){
                setMessage("Predare inserată cu succes!");
                setFormData({idstudent: "", idtema: "", data_predare: "", nota:""})
            }
            else{
                setMessage((data.error || "Eroare la inserare"));
            }
        }catch(err){
            console.error(err);
            setMessage("Eroare de rețea");
        }
    };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl">
      <h1 className="text-xl font-semibold mb-6">Inserare predare</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          name="idstudent"
          placeholder="ID Student"
          value={formData.idstudent}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm"
          required
        />

        <input
          name="idtema"
          placeholder="ID Temă"
          value={formData.idtema}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm"
          required
        />

        <input
          type="date"
          name="data_predare"
          value={formData.data_predare}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm"
          required
        />

        <input
          name="nota"
          placeholder="Notă"
          value={formData.nota}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm"
          required
        />

        <div className="col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="px-5 py-2 text-sm rounded-lg bg-pink-600 text-white hover:bg-pink-700"
          >
            Salvează
          </button>
        </div>
      </form>

      {message && (
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default InserarePredari