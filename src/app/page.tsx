// import PageTemplate, { generateMetadata } from './(pages)/[slug]/page'

// export default PageTemplate

// export { generateMetadata }

// import React from 'react'
// import ReactDOM from 'react-dom'
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
// } from 'react-router-dom'

// import './style.css'
// import MyredeemedEmpty from './pages/myredeemed-empty'
// import SubCategorieWise from './pages/sub-categorie-wise'
// import MyDealsPageEmpty from './pages/my-deals-page-empty'
// import MyFavPage from './pages/my-fav-page'
// import ProfilePage from './pages/profile-page'
// import Homepage from './pages/homepage'
// import WHITElABELAPI from './pages/whit-el-abelapi'
// import MyDealsPage from './pages/my-deals-page'
// import SearchPage from './pages/search-page'
// import Invitepage from './pages/invitepage'
// import BillingPage from './pages/billing-page'
// import MyRedeemedPage from './pages/my-redeemed-page'
// import MyFavPageEmpty from './pages/my-fav-page-empty'
// import LandingPage from './pages/landing-page'
// import NotFound from './pages/not-found'

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route component={MyredeemedEmpty} exact path="/myredeemed-empty" />
//         <Route component={SubCategorieWise} exact path="/sub-categorie-wise" />
//         <Route component={MyDealsPageEmpty} exact path="/my-deals-page-empty" />
//         <Route component={MyFavPage} exact path="/my-fav-page" />
//         <Route component={ProfilePage} exact path="/profile-page" />
//         <Route component={Homepage} exact path="/homepage" />
//         <Route component={LandingPage} exact path="/" />
//         <Route component={MyDealsPage} exact path="/my-deals-page" />
//         <Route component={SearchPage} exact path="/search-page" />
//         <Route component={Invitepage} exact path="/invitepage" />
//         <Route component={BillingPage} exact path="/billing-page" />
//         <Route component={MyRedeemedPage} exact path="/my-redeemed-page" />
//         <Route component={MyFavPageEmpty} exact path="/my-fav-page-empty" />
//         <Route component={WHITElABELAPI} exact path="/white-label-page" />
//         <Route component={NotFound} path="**" />
//         <Redirect to="**" />
//       </Routes>
//     </Router>
//   )
// }

// export default App

import App from './Routes'

const MainApp = () =>{
 return(
  <App />
 )
}

export default MainApp;
