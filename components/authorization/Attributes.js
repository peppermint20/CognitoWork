import React, { useEffect, useContext, useState } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { AccountContext } from "./Account";

export default () => {
  const [role, setRole] = useState("Customer"); // Default role is Customer
  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((data) => {
      setRole(data["custom:user_role"]);
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    getSession().then(({ user }) => {
      const attributes = [
        new CognitoUserAttribute({ Name: "custom:user_role", Value: role }),
      ];
      user.updateAttributes(attributes, (err, result) => {
        if (err) console.error(err);
        console.log(result);
      });
    });
  };

  const handleCheckboxChange = (event) => {
    setRole(event.target.checked ? "Stylist" : "Customer");
  };

  return (
    <div>
      <h1>Update your role:</h1>
      <form onSubmit={onSubmit}>
        <label>
          <input
            type="checkbox"
            checked={role === "Stylist"}
            onChange={handleCheckboxChange}
          />
          Stylist
        </label>
        <button type="submit">Change role</button>
      </form>
    </div>
  );
};