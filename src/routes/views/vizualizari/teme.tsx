import React from 'react'
import { useEffect, useState } from 'react';

const Teme = () => {
    interface Tema{
        idtema: number;
        denumire: string;
        materie: string;
        termen_limita: string;
    }

    const [teme, setTeme] = useState<Tema[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeme = async () => {
            try{
                const response = await fetch('http://localhost:3000/api/teme');
                if(!response.ok) throw new Error('Eroare la preluarea datelor');
                const data = await response.json();
                setTeme(data);
                console.log(data);
            }
            catch(err:any){
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchTeme();
    }, []);

    return (
        <>
            <h1>Lista Teme</h1>
            {loading && <p>Se încarcă datele...</p>}
            {error && <p>Eroare: {error}</p>}
            {teme.length === 0 ? (
                <p>Nu există teme în baza de date.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Denumire</th>
                            <th>Materie</th>
                            <th>Termen Limită</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teme.map((tema) => (
                            <tr key={tema.idtema}>
                                <td>{tema.idtema}</td>
                                <td>{tema.denumire}</td>
                                <td>{tema.materie}</td>
                                <td>{tema.termen_limita ? tema.termen_limita.split('T')[0] : "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Teme