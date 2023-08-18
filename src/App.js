import React, { useEffect }  from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route }
from "react-router-dom"
import Checkout from './Checkout';
import Login from "./Login";
import Payment from './Payment'; // import is not working
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51NfDcrSJoDbqUVUvmU3DUZHtGfcfF0PHPpLXmGkv9269IICW0MAyt0RYlfiHiXlKdar55trlcAsVrb2BuCs7uXGb00Mft3PpWa");


function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });

      }else{
        dispatch({
          type: "SET_USER",
          user: null,
        });

      }
    })

  }, [])
  return (
    // BEM
    <Router>
      <div className="app">
        <Switch>
        <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
          <Header />
            <Checkout />
          </Route>
          <Route path ="/payment">
            <Header/>
            <Elements stripe={promise}>
            <Payment />
            </Elements>
          </Route>
          <Route path="/"> 
          <Header />          
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// import React, { Suspense } from 'react';
// import './App.css';
// import Header from './Header';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// // Lazy load components
// const Home = React.lazy(() => import('./Home'));
// const Checkout = React.lazy(() => import('./Checkout'));

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         <Header />
//         <Suspense fallback={<div>Loading...</div>}>
//           <Switch>
//             <Route path="/checkout">
//               <Checkout />
//             </Route>
//             <Route path="/">
//               <Home />
//             </Route>
//           </Switch>
//         </Suspense>
//       </div>
//     </Router>
//   );
// }

// export default App;
