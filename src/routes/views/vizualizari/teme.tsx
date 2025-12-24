import React, { useEffect, useState } from "react";

const TemeTable = () => {
  interface Tema {
    idtema: number;
    denumire: string;
    materie: string;
    termen_limita: string;
  }

  const [teme, setTeme] = useState<Tema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<Tema>>({});
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchTeme = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/teme");
        if (!response.ok) throw new Error("Eroare la preluarea datelor");
        const data = await response.json();
        setTeme(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeme();
  }, []);

  const startEdit = (tema: Tema) => {
    setEditingId(tema.idtema);
    setEditingData({
      ...tema,
      termen_limita: tema.termen_limita.split("T")[0],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingData({ ...editingData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await fetch(`http://localhost:3000/api/update/teme/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingData),
    });

    setTeme((prev) =>
      prev.map((t) =>
        t.idtema === editingId ? { ...t, ...editingData } as Tema : t
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
    if (!window.confirm("Sigur doriți să ștergeți temele selectate?")) return;

    await Promise.all(
      selectedIds.map((id) =>
        fetch(`http://localhost:3000/api/delete/teme/${id}`, {
          method: "DELETE",
        })
      )
    );

    setTeme((prev) => prev.filter((t) => !selectedIds.includes(t.idtema)));
    setSelectedIds([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h1 className="text-xl font-semibold mb-4">Teme</h1>

      {loading && <p className="text-sm">Se încarcă datele...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <table className="w-full text-sm">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="py-3 text-center"></th>
            <th className="text-center">ID</th>
            <th className="text-center">Denumire</th>
            <th className="text-center">Materie</th>
            <th className="text-center">Termen limită</th>
          </tr>
        </thead>
        <tbody>
          {teme.map((t) => (
            <tr key={t.idtema} className="text-center border-b hover:bg-gray-50">
              <td className="py-3 text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(t.idtema)}
                  onChange={() => toggleSelect(t.idtema)}
                />
              </td>

              <td>{t.idtema}</td>

              {["denumire", "materie"].map((field) => (
                <td key={field} className="text-center">
                  {editingId === t.idtema ? (
                    <input
                      name={field}
                      value={(editingData as any)[field] ?? ""}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    (t as any)[field]
                  )}
                </td>
              ))}

              <td className="text-center">
                {editingId === t.idtema ? (
                  <input
                    type="date"
                    name="termen_limita"
                    value={editingData.termen_limita ?? ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  t.termen_limita.split("T")[0]
                )}
              </td>

              <td className="text-center">
                {editingId === t.idtema ? (
                  <button onClick={saveEdit} className="text-pink-600">
                    Salvează
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(t)}
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
        className="mt-4 text-red-500 disabled:text-gray-300 text-sm"
      >
        Șterge selectați
      </button>
    </div>
  );
};

export default TemeTable;
