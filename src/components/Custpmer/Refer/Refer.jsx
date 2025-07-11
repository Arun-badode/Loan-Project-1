import React, { useEffect, useState } from "react";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";

const Refer = () => {
  const [user, setUser] = useState({ id: "", customerName: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("login-detail")); // Adjust key if different
    if (storedUser) {
      setUser({
        id: storedUser.id,
        customerName: storedUser.customerName,
      });
    }
  }, []);

const referralUrl = `https://ladybuglending.com/apply?ref=${user.id.slice(-9).toUpperCase()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    alert("Referral link copied to clipboard!");
  };

  return (
    <div className="container mt-4 p-3">
      <Card className="shadow-sm border-0 card-green">
        <Card.Body>
          <h2 className="page-heading mb-3">Refer a Friend &amp; Earn!</h2>
          <h5 className="fw-bold text-success mb-3">
            Refer a friend and earn up to $1000!
          </h5>
          <p>
            Simply have your friend enter your name (<strong>{user.customerName}</strong>) in the <strong>Referral Partner</strong> field on their application.<br />
            If we fund them, you will receive up to <strong>$1000</strong> (5% of the upsell amount to be determined upon approval).
          </p>
          <hr />
          <div className="mb-3">
            <div className="fw-semibold mb-2">Your unique referral link:</div>
            <InputGroup>
              <FormControl
                value={referralUrl}
                readOnly
                className="bg-light"
                style={{ fontSize: "0.95rem" }}
              />
              <Button variant="success" onClick={handleCopy}>
                Copy Link
              </Button>
            </InputGroup>
            <small className="text-muted">
              Share this link with your friends or colleagues. When they apply using your link, your referral will be tracked automatically.
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Refer;
