import { useState, useEffect } from "react";

interface Student {
  idstudent: number;
  nume: string;
  prenume: string;
  cnp: number;
  an: number;
  serie: string;
}

export default function VizualizareStudenti() {
  const [studenti, setStudenti] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudenti = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/utilizatori");
        if (!response.ok) throw new Error("Eroare la preluarea datelor de la server");

        const data: Student[] = await response.json();
        setStudenti(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudenti();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 text-lg font-semibold">
          ❌ Eroare: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          📋 Lista Studenților
        </h1>

        {studenti.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Nu există studenți în baza de date.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Nume</th>
                    <th className="px-4 py-2 text-left">Prenume</th>
                    <th className="px-4 py-2 text-left">CNP</th>
                    <th className="px-4 py-2 text-left">An</th>
                    <th className="px-4 py-2 text-left">Serie</th>
                </tr>
              </thead>
              <tbody>
                {studenti.map((student, index) => (
                  <tr
                    key={student.idstudent}
                    className={`border-b hover:bg-blue-50 transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2">{student.idstudent}</td>
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {student.nume}
                    </td>
                    <td className="px-4 py-2">{student.prenume}</td>
                    <td className="px-4 py-2 text-gray-600">{student.cnp}</td>
                    <td className="px-4 py-2">{student.an}</td>
                    <td className="px-4 py-2">{student.serie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}