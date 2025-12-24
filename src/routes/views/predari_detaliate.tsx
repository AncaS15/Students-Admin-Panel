import React, { useEffect, useState } from "react";

const PredariDetaliateTable = () => {
  interface PredareDetaliata {
    idpredare: number;
    nume_student: string;
    prenume_student: string;
    denumire_tema: string;
    materie: string;
    data_predare: string;
    nota: number;
  }

  const [data, setData] = useState<PredareDetaliata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/predari_detalate"
        );
        if (!response.ok) throw new Error("Eroare la preluarea datelor");

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h1 className="text-xl font-semibold mb-4">Predări detaliate</h1>

      {loading && <p className="text-sm">Se încarcă datele...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="py-3 text-center">ID</th>
                <th className="text-center">Student</th>
                <th className="text-center">Temă</th>
                <th className="text-center">Materie</th>
                <th className="text-center">Dată predare</th>
                <th className="text-center">Notă</th>
              </tr>
            </thead>

            <tbody>
              {data.map((p) => (
                <tr
                  key={p.idpredare}
                  className="border-b hover:bg-gray-50 text-center"
                >
                  <td className="py-3">{p.idpredare}</td>
                  <td>
                    {p.nume_student} {p.prenume_student}
                  </td>
                  <td>{p.denumire_tema}</td>
                  <td>{p.materie}</td>
                  <td>{p.data_predare.split("T")[0]}</td>
                  <td>{p.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PredariDetaliateTable;
