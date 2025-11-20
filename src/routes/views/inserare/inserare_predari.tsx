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
    <>
        <form onSubmit={handleSubmit}>
            <h2>Inserare Predare</h2>
            <input type="text" name="idstudent" placeholder="Id Student" value={formData.idstudent} onChange={handleChange} required />
            <input type="text" name="idtema" placeholder="Id Temă" value={formData.idtema} onChange={handleChange} required />
            <input type="date" name="data_predare" placeholder="Dată Predare" value={formData.data_predare} onChange={handleChange} required />
            <input type="text" name="nota" placeholder="Notă" value={formData.nota} onChange={handleChange} required />
            <button type="submit">Inserează Predarea</button>
        </form>
        {message && <p>{message}</p>}
    </>
  )
}

export default InserarePredari