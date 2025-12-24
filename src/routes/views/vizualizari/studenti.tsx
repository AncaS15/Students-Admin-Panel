import React, { useEffect, useState } from "react";

const StudentiTable = () => {
  interface Student {
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
  const [editingData, setEditingData] = useState<Partial<Student>>({});
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchStudenti = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/studenti");
        if (!response.ok) throw new Error("Eroare la preluarea datelor");
        const data = await response.json();
        setStudenti(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudenti();
  }, []);

  const startEdit = (student: Student) => {
    setEditingId(student.idstudent);
    setEditingData({ ...student });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingData({ ...editingData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await fetch(`http://localhost:3000/api/update/studenti/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingData),
    });

    setStudenti((prev) =>
      prev.map((s) =>
        s.idstudent === editingId ? { ...s, ...editingData } as Student : s
      )
    );
    setEditingId(null);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm("Sigur doriți să ștergeți studenții selectați?")) return;

    await Promise.all(
      selectedIds.map((id) =>
        fetch(`http://localhost:3000/api/delete/studenti/${id}`, {
          method: "DELETE",
        })
      )
    );

    setStudenti((prev) =>
      prev.filter((s) => !selectedIds.includes(s.idstudent))
    );
    setSelectedIds([]);
  };

  return (
    <div className="rounded-xl shadow-sm p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-semibold">Studenți</h1>
        </div>
      </div>

      {loading && <p className="text-sm">Se încarcă datele...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="py-3 text-center"></th>
              <th className="text-center">ID</th>
              <th className="text-center">Nume</th>
              <th className="text-center">Prenume</th>
              <th className="text-center">CNP</th>
              <th className="text-center">An</th>
              <th className="text-center">Serie</th>
            </tr>
          </thead>

          <tbody>
            {studenti.map((s) => (
              <tr key={s.idstudent} className="text-center border-b hover:bg-gray-50">
                <td className="py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(s.idstudent)}
                    onChange={() => toggleSelect(s.idstudent)}
                  />
                </td>

                <td>{s.idstudent}</td>

                {["nume", "prenume", "cnp", "an", "serie"].map((field) => (
                  <td key={field}>
                    {editingId === s.idstudent ? (
                      <input
                        name={field}
                        value={(editingData as any)[field] ?? ""}
                        onChange={handleChange}
                        className="text-center border rounded px-2 py-1 w-full text-sm"
                      />
                    ) : (
                      (s as any)[field]
                    )}
                  </td>
                ))}

                <td className="text-center">
                  {editingId === s.idstudent ? (
                    <button
                      onClick={saveEdit}
                      className="text-pink-600 font-medium">
                      Salvează
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(s)}
                      className="text-gray-500 hover:text-pink-600">
                      Editează
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          onClick={deleteSelected}
          disabled={selectedIds.length === 0}
          className="text-red-500 disabled:text-gray-300">
          Șterge selectați
        </button>
      </div>
    </div>
  );
};

export default StudentiTable;
