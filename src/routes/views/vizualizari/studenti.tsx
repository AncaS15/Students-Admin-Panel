import React from 'react'
import { useEffect, useState } from 'react';

const Studenti = () => {
  interface Student{
    idstudent: number;
    nume: string;
    prenume: string;
    cnp: number;
    an: number;
    serie: string;
  }

  const [studenti, setStudenti] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<Student>>({
    nume: "",
    prenume: "",
    cnp: undefined,
    an: undefined,
    serie: "",
  })

  useEffect(() => {
    const fetchStudenti = async () => {
      try{
        const response = await fetch('http://localhost:3000/api/studenti');
        if(!response.ok) throw new Error('Eroare la preluarea datelor');
        const data = await response.json();
        setStudenti(data);
        console.log(data);
      }
      catch(err:any){
        setError(err.message);
      }
      finally{
        setLoading(false);
      }
    }
    fetchStudenti();
  }, []);

  const startEdit = (student:Student) => {
    setEditingId(student.idstudent);
    setEditingData({...student});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingData({...editingData, [e.target.name]: e.target.value});
  };

  const saveEdit = async () => {
    if(!editingId)
        return
    try{
      console.log("Trimitem datele editate:", editingData);
      await fetch(`http://localhost:3000/api/update/studenti/${editingId}`, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(editingData)
      });
    }catch(err){
      console.error("Eroare:", err);
    }
    setStudenti(studenti.map(s => s.idstudent === editingId ? {...s, ...editingData} as Student: s));
    setEditingId(null);
  };
  
  return (
    <>
      <h1>Lista Studenti</h1>
      {loading && <p>Se încarcă datele...</p>}
      {error && <p>Eroare: {error}</p>}
      {studenti.length === 0 ? (
        <p>Nu există studenți în baza de date.</p>
      ) : (
        <table>
          <thead>
            <tr> {/* table row */}
              <th>ID</th> {/* table head */}
              <th>Nume</th>
              <th>Prenume</th>
              <th>CNP</th>
              <th>An</th>
              <th>Serie</th>
            </tr>
          </thead>
          <tbody>
            {studenti.map((student) => (
              <tr key={student.idstudent}>
                <td>{student.idstudent}</td> {/* table data */}
                <td>{editingId === student.idstudent ? (
                  <input name="nume" value={editingData.nume} onChange={handleChange}/>
                ) : (student.nume)
              }</td>
                <td>{editingId === student.idstudent ? (
                  <input name="prenume" value={editingData.prenume} onChange={handleChange}/>
                ) : (student.prenume)}</td>
                <td>{editingId === student.idstudent ? (
                  <input name="cnp" value={editingData.cnp} onChange={handleChange}/>
                ) : (student.cnp)}</td>
                <td>{editingId === student.idstudent ? (
                  <input name="an" value={editingData.an} onChange={handleChange}/>
                ) : (student.an)}</td>
                <td>{editingId === student.idstudent ? (
                  <input name="serie" value={editingData.serie} onChange={handleChange}/>
                ) : (student.serie)}</td>
                <td>{editingId === student.idstudent ? (
                  <button onClick={saveEdit}>Salvează</button>
                ) : (<button onClick={() => startEdit(student)}>Editează</button>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Studenti