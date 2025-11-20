import React from 'react'
import { useEffect, useState } from 'react';

const Predari = () => {
    interface Predare{
        idpredare: number;
        idstudent: number;
        idtema: number;
        data_predare: string;
        nota: number;
    }

    const [predari, setPredari] = useState<Predare[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPredari = async () => {
            try{
                const response = await fetch('http://localhost:3000/api/predari');
                if(!response.ok) throw new Error('Eroare la preluarea datelor');
                const data = await response.json();
                setPredari(data);
                console.log(data);
            }
            catch(err:any){
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchPredari();
    }, []);

    return (
        <>
            <h1>Lista Predari</h1>
            {loading && <p>Se încarcă datele...</p>}
            {error && <p>Eroare: {error}</p>}
            {predari.length === 0 ? (
                <p>Nu există predări în baza de date.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID Predare</th>
                            <th>ID Student</th> 
                            <th>ID Tema</th>
                            <th>Data Predare</th>
                            <th>Nota</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predari.map((predare) => (
                            <tr key={predare.idpredare}>
                                <td>{predare.idpredare}</td>
                                <td>{predare.idstudent}</td>
                                <td>{predare.idtema}</td>
                                <td>{predare.data_predare ? predare.data_predare.split('T')[0] : "N/A"}</td>
                                <td>{predare.nota}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Predari