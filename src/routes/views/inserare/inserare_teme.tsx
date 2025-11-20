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
    <>
        <form onSubmit={handleSubmit}>
                <h2>Inserare Temă</h2>
                <input type="text" name="denumire" placeholder="Denumire" value={formData.denumire} onChange={handleChange} required />
                <input type="text" name="materie" placeholder="Materie" value={formData.materie} onChange={handleChange} required />
                <input type="date" name="termen_limita" placeholder="Termen Limită" value={formData.termen_limita} onChange={handleChange} required />
                <button type="submit">Inserează Temă</button>
            </form>
            {message && <p>{message}</p>}
    </>
  )
}

export default InserareTeme