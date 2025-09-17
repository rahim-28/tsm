import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteClient } from "../../redux/clientsSlice";
import { useState } from "react";
import { Eye, Edit2, Trash2, X } from "lucide-react";

export default function ClientTable() {
  const clients = useSelector((state) => state.clients || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewClient, setViewClient] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      dispatch(deleteClient(id));
    }
  };

  const getStatus = (c) => {
    if (c.paidAmount === 0) return "Not Paid";
    if (c.pendingAmount > 0) return "Pending";
    return "Paid";
  };

  return (
    <div className="client-table-container">
      {/* Header */}
      <div className="table-header">
        <h2>Client Details</h2>
       <button
  className="btn add-btn"
  onClick={() => navigate("/project-tracker/clients/add")}
>
  Add Client
</button>

      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Company Name</th>
            <th>Client Name</th>
            <th>Project Name</th>
            <th>Contact Number</th>
            <th>Mail ID</th>
            <th>Address</th>
            <th>Payment</th>
            <th>Paid Amount</th>
            <th>Pending Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => {
            const status = getStatus(c);
            return (
              <tr key={c.id || c.clientName}>
                <td>
                 <button className="btn view-btn" onClick={() => setViewClient(c)}>
  <Eye size={16} />
</button>

<button
  className="btn edit-btn"
  onClick={() => navigate(`/project-tracker/clients/edit/${c.id}`)}
>
  <Edit2 size={16} />
</button>

<button className="btn delete-btn" onClick={() => handleDelete(c.id)}>
  <Trash2 size={16} />
</button>

                </td>
                <td>{c.companyName}</td>
                <td>{c.clientName}</td>
                <td>{c.projectName}</td>
                <td>{c.contactNumber}</td>
                <td>{c.mailId}</td>
                <td>{c.address}</td>
                <td>{c.payment}</td>
                <td>{c.paidAmount}</td>
                <td>{c.pendingAmount}</td>
               <td>
               <span className={`status-badge ${status.toLowerCase().replace(" ", "-")}`}>
               {status}
               </span>
               </td>

              </tr>
            );
          })}
        </tbody>
      </table>

      {/* View Overlay */}
      {viewClient && (
        <div className="view-overlay" onClick={() => setViewClient(null)}>
          <div className="view-card" onClick={(e) => e.stopPropagation()}>
            <div className="view-header">
              <h3>Client Details</h3>
              <button className="close-btn" onClick={() => setViewClient(null)}>
                <X size={18} />
              </button>
            </div>
            <p>Company: {viewClient.companyName}</p>
            <p>Client: {viewClient.clientName}</p>
            <p>Project: {viewClient.projectName}</p>
            <p>Contact: {viewClient.contactNumber}</p>
            <p>Email: {viewClient.mailId}</p>
            <p>Address: {viewClient.address}</p>
            <p>Payment: {viewClient.payment}</p>
            <p>Paid: {viewClient.paidAmount}</p>
            <p>Pending: {viewClient.pendingAmount}</p>
            <p>Status: {getStatus(viewClient)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
