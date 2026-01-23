
// import logo from './assets/logo.png'
// import './App.css'

// function App() {
 

//   return (

//       <div>
//         <img src={logo} alt="CareConnect Logo"  width={150} height={100}/>
//    <h4>Welcome to CareConnect</h4>
   
//     </div>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegistrationType } from "./Forms/RegistrationType.jsx";
import { RegistrationDonor } from "./Forms/RegistrationDonor.jsx";
// import RegistrationBeneficiary from "./Forms/RegistrationBeneficiary";

function App() {
  return (

    <BrowserRouter>

    {/* <div>
         <img src={logo} alt="CareConnect Logo"  width={150} height={100}/>
          <h4>Welcome to CareConnect</h4>
     </div> */}

      <Routes>
        <Route path="/" element={<RegistrationType />} />
        <Route path="/register/donor" element={<RegistrationDonor />} />
        {/* <Route path="/register/beneficiary" element={<RegistrationBeneficiary />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
