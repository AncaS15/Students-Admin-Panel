import React from 'react'

const InserareStudenti = () => {
  const [formData, setFormData] = React.useState({
    nume:"",
    prenume: "",
    cnp: "",
    an: "",
    serie: ""
  });

  const [message, setMessage] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        const response = await fetch("http://localhost:3000/api/inserare/studenti", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if(response.ok){
            setMessage("Student inserat cu succes!");
            setFormData({nume:"", prenume: "", cnp: "", an: "", serie: ""});
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
                <h2>Inserare Student</h2>
                <input type="text" name="nume" placeholder="Nume" value={formData.nume} onChange={handleChange} required />
                <input type="text" name="prenume" placeholder="Prenume" value={formData.prenume} onChange={handleChange} required />
                <input type="text" name="cnp" placeholder="CNP" value={formData.cnp} onChange={handleChange} required />
                <input type="text" name="an" placeholder="An" value={formData.an} onChange={handleChange} required />
                <input type="text" name="serie" placeholder="Serie" value={formData.serie} onChange={handleChange} required />
                <button type="submit">Inserează Student</button>
            </form>
            {message && <p>{message}</p>}
        </>
    )
  }

export default InserareStudenti