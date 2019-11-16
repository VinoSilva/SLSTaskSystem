import React from "react";

export const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        let modFieldName =
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

        return (
          <p className="text-danger" key={i}>
            {modFieldName} {formErrors[fieldName]}
          </p>
        );
      } else {
        return "";
      }
    })}
  </div>
);
