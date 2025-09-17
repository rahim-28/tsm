import React, { useState } from "react";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password changed successfully! (mock)");
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Old Password" type="password" value={oldPass} onChange={e => setOldPass(e.target.value)} />
        <input placeholder="New Password" type="password" value={newPass} onChange={e => setNewPass(e.target.value)} />
        <input placeholder="Confirm Password" type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
