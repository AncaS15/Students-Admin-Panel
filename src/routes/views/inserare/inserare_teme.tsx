import React from 'react'

const InserareTeme = () => {
    const [formData, setFormData] = React.useState({
        denumire: "",
        materie: "",
        termen_limita: ""
    });

    const [message, setMessage] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/api/inserare/teme", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if(response.ok){
                setMessage("Temă inserată cu succes!");
                setFormData({denumire: "", materie: "", termen_limita: ""});
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
      <h1 className="text-xl font-semibold mb-6">Inserare temă</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="denumire"
          placeholder="Denumire"
          value={formData.denumire}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full text-sm"
          required
        />

        <input
          name="materie"
          placeholder="Materie"
          value={formData.materie}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full text-sm"
          required
        />

        <input
          type="date"
          name="termen_limita"
          value={formData.termen_limita}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full text-sm"
          required
        />

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-5 py-2 text-sm rounded-lg bg-pink-600 text-white hover:bg-pink-700">
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

export default InserareTeme