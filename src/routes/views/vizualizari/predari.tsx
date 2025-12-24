import React, { useEffect, useState } from "react";

const PredariTable = () => {
  interface Predare {
    idpredare: number;
    idstudent: number;
    idtema: number;
    data_predare: string;
    nota: number;
  }

  const [predari, setPredari] = useState<Predare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<Predare>>({});
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchPredari = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/predari");
        if (!response.ok) throw new Error("Eroare la preluarea datelor");
        const data = await response.json();
        setPredari(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPredari();
  }, []);

  const startEdit = (p: Predare) => {
    setEditingId(p.idpredare);
    setEditingData({
      ...p,
      data_predare: p.data_predare.split("T")[0],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingData({ ...editingData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await fetch(`http://localhost:3000/api/update/predari/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingData),
    });

    setPredari((prev) =>
      prev.map((p) =>
        p.idpredare === editingId ? { ...p, ...editingData } as Predare : p
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
    if (!window.confirm("Sigur doriți să ștergeți predările selectate?")) return;

    await Promise.all(
      selectedIds.map((id) =>
        fetch(`http://localhost:3000/api/delete/predari/${id}`, {
          method: "DELETE",
        })
      )
    );

    setPredari((prev) =>
      prev.filter((p) => !selectedIds.includes(p.idpredare))
    );
    setSelectedIds([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h1 className="text-xl font-semibold mb-4">Predări</h1>

      {loading && <p className="text-sm">Se încarcă datele...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <table className="w-full text-sm">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="py-3 w-10 text-center"></th>
            <th className="text-center">ID</th>
            <th className="text-center">ID Student</th>
            <th className="text-center">ID Temă</th>
            <th className="text-center">Dată</th>
            <th className="text-center">Notă</th>
          </tr>
        </thead>

        <tbody>
          {predari.map((p) => (
            <tr key={p.idpredare} className="border-b hover:bg-gray-50">
              <td className="py-3 text-center align-middle">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(p.idpredare)}
                  onChange={() => toggleSelect(p.idpredare)}
                />
              </td>

              <td className="text-center">{p.idpredare}</td>
              <td className="text-center">{p.idstudent}</td>
              <td className="text-center">{p.idtema}</td>

              <td className="text-center">
                {editingId === p.idpredare ? (
                  <input
                    type="date"
                    name="data_predare"
                    value={editingData.data_predare ?? ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  p.data_predare.split("T")[0]
                )}
              </td>

              <td className="text-center">
                {editingId === p.idpredare ? (
                  <input
                    name="nota"
                    value={editingData.nota ?? ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-16"
                  />
                ) : (
                  p.nota
                )}
              </td>

              <td className="text-center">
                {editingId === p.idpredare ? (
                  <button onClick={saveEdit} className="text-pink-600">
                    Salvează
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(p)}
                    className="text-gray-500 hover:text-pink-600">
                    Editează
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={deleteSelected}
        disabled={selectedIds.length === 0}
        className="mt-4 text-red-500 disabled:text-gray-300 text-sm">
        Șterge selectați
      </button>
    </div>
  );
};

export default PredariTable;
