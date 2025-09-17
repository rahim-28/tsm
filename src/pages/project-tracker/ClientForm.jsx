import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClient, updateClient } from "../../redux/clientsSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function ClientForm() {
  const { id } = useParams();
  const clients = useSelector((state) => state.clients) || [];
  const existingClient = clients.find((c) => c.id === Number(id));

  const [form, setForm] = useState({
    id: Date.now(),
    companyName: "",
    clientName: "",
    projectName: "",
    contactNumber: "",
    mailId: "",
    address: "",
    payment: 0,
    paidAmount: 0,
    pendingAmount: 0,
  });

  useEffect(() => {
    if (existingClient) setForm(existingClient);
  }, [existingClient]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projectOptions = ["EMS", "VMS", "TSM"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const pendingAmount = form.payment - form.paidAmount;
    const status =
      form.paidAmount === 0
        ? "Not Paid"
        : pendingAmount > 0
        ? "Pending"
        : "Paid";

    const finalForm = { ...form, pendingAmount, status };
    dispatch(existingClient ? updateClient(finalForm) : addClient(finalForm));
    navigate("/project-tracker/clients");
  };

  return (
    <form className="client-module client-form" onSubmit={handleSubmit}>
      <h2>{existingClient ? "Edit Client" : "Add Client"}</h2>

      <input
        type="text"
        placeholder="Company Name"
        className="form-input"
        value={form.companyName}
        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Client Name"
        className="form-input"
        value={form.clientName}
        onChange={(e) => setForm({ ...form, clientName: e.target.value })}
        required
      />
      <select
        className="form-input"
        value={form.projectName}
        onChange={(e) => setForm({ ...form, projectName: e.target.value })}
        required
      >
        <option value="" disabled hidden>Select Project</option>
        {projectOptions.map((p, i) => (
          <option key={i} value={p}>{p}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Contact Number"
        className="form-input"
        value={form.contactNumber}
        onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Mail ID"
        className="form-input"
        value={form.mailId}
        onChange={(e) => setForm({ ...form, mailId: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Address"
        className="form-input"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Payment"
        className="form-input"
        value={form.payment}
        onChange={(e) => setForm({ ...form, payment: Number(e.target.value) })}
        required
      />
      <input
        type="number"
        placeholder="Paid Amount"
        className="form-input"
        value={form.paidAmount}
        onChange={(e) => setForm({ ...form, paidAmount: Number(e.target.value) })}
        required
      />

      <p className={`status-badge ${
        form.paidAmount === 0 ? "not-paid" : form.payment - form.paidAmount > 0 ? "pending" : "paid"
      }`}>
        Status: {form.paidAmount === 0 ? "Not Paid" : form.payment - form.paidAmount > 0 ? "Pending" : "Paid"}
      </p>

      <div className="form-actions">
        <button type="submit" className="save-btn">{existingClient ? "Update" : "Save"}</button>
        <button type="button" className="back-btn" onClick={() => navigate("/project-tracker/clients")}>Back</button>
      </div>
    </form>
  );
}
