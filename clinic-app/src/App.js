import React, { useState } from "react";

export default function ClinicApp() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState("queue");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const addPatient = () => {
    if (!name || !age) return alert("กรุณากรอกชื่อและอายุ");
    setPatients([...patients, { id: Date.now(), name, age, phone }]);
    setName("");
    setAge("");
    setPhone("");
  };

  const addAppointment = () => {
    if (!name || !appointmentDate)
      return alert("กรุณากรอกชื่อและวันนัดหมาย");
    setAppointments([
      ...appointments,
      { id: Date.now(), name, date: appointmentDate, phone },
    ]);
    setName("");
    setPhone("");
    setAppointmentDate("");
  };

  const removeItem = (list, setList, id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const printSticker = (text) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <pre style="font-size:16px; font-family:Arial; padding:20px;">
${text}
      </pre>
    `);
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏥 ระบบจัดการคลินิก</h1>

      <div className="flex gap-4 mb-6">
        <button
          className={\`px-4 py-2 rounded \${tab === "queue" ? "bg-blue-500 text-white" : "bg-gray-200"}\`}
          onClick={() => setTab("queue")}
        >
          คิววันนี้
        </button>
        <button
          className={\`px-4 py-2 rounded \${tab === "appointment" ? "bg-blue-500 text-white" : "bg-gray-200"}\`}
          onClick={() => setTab("appointment")}
        >
          นัดหมายล่วงหน้า
        </button>
      </div>

      <div className="mb-6">
        <input
          className="border p-2 mr-2 rounded"
          placeholder="ชื่อคนไข้"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {tab === "queue" && (
          <input
            className="border p-2 mr-2 rounded w-20"
            placeholder="อายุ"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        )}
        <input
          className="border p-2 mr-2 rounded"
          placeholder="เบอร์โทร"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {tab === "appointment" && (
          <input
            type="date"
            className="border p-2 mr-2 rounded"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        )}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={tab === "queue" ? addPatient : addAppointment}
        >
          {tab === "queue" ? "เพิ่มคิว" : "เพิ่มนัดหมาย"}
        </button>
      </div>

      {tab === "queue" ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">📋 รายชื่อคิววันนี้</h2>
          <ul className="space-y-2">
            {patients.map((p, index) => (
              <li key={p.id} className="bg-white shadow p-3 rounded flex justify-between">
                <span>
                  {index + 1}. {p.name} (อายุ {p.age}) - {p.phone}
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() =>
                      printSticker(
                        \`ชื่อ: \${p.name}\nอายุ: \${p.age}\nเบอร์: \${p.phone}\nวันที่: \${new Date().toLocaleDateString()}\`
                      )
                    }
                  >
                    พิมพ์สติ๊กเกอร์
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => removeItem(patients, setPatients, p.id)}
                  >
                    ลบ
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">📅 รายการนัดหมาย</h2>
          <ul className="space-y-2">
            {appointments.map((a, index) => (
              <li key={a.id} className="bg-white shadow p-3 rounded flex justify-between">
                <span>
                  {index + 1}. {a.name} - {a.phone} <br />
                  วันที่นัด: {a.date}
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() =>
                      printSticker(
                        \`ชื่อ: \${a.name}\nวันนัด: \${a.date}\nเบอร์: \${a.phone}\`
                      )
                    }
                  >
                    พิมพ์สติ๊กเกอร์
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => removeItem(appointments, setAppointments, a.id)}
                  >
                    ลบ
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
