// export const RegistrationType = () => {
//   return (
//     <>
//      <form onSubmit={handleSubmit}>
//       <label>Registration Type</label>
//       <div>
//         <input 
//           type="radio" 
//           id="donor" 
//           name="registrationType" 
//           value="donor"
//         />
//         <label htmlFor="donor">Donor</label>
        
            /* 
            Separate label with htmlFor (explicit association)
            -- Label references input via htmlFor matching the input's id
            -- More flexible for styling/layout
            -- Clicking "Donor" text will also select the radio button
            */

//         <input 
//           type="radio" 
//           id="beneficiary" 
//           name="registrationType" 
//           value="beneficiary"
//         />
//         <label htmlFor="beneficiary">Beneficiary</label>
//       </div>
//       <button type="submit">Next</button>
//      </form>
//     </>
//   );
// };


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegistrationType() {
  const [type, setType] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "donor") {
      navigate("/register/donor");
    } else if (type === "beneficiary") {
      navigate("/register/beneficiary");
    } else {
      alert("Please select one option");
    }
  };

  return (
    <>
      <h1>Registration Type</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            name="registrationType"
            value="donor"
            onChange={(e) => setType(e.target.value)}
          />
          Donor
        </label>

        {/* 
        **********Input inside label (implicit association)*********
        -- The label wraps the input - they're automatically connected
        -- No need for id or htmlFor
        -- Clicking "Donor" text will select the radio button
        
        *************
        name is used for grouping radio buttons
        It tells the browser:

        “These radio buttons belong to the SAME group
        → only ONE can be selected”
        */}

        <br />

        <label>
          <input
            type="radio"
            name="registrationType"
            value="beneficiary"
            onChange={(e) => setType(e.target.value)}
          />
          Beneficiary
        </label>

        <br /><br />

        <button type="submit">Next</button>
      </form>
    </>
  );
}

export default RegistrationType;
