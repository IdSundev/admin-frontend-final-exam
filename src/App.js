import AdminHome from "./pages/AdminHome";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./pages/products/Products";
import Footer from "./components/themplate/Footer";
import Navigation from "./components/themplate/Navigation";
import SidebarMenu from "./components/themplate/SidebarMenu";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import Preload from "./pages/Preload";
import Stocks from "./pages/Stocks";
import Request from "./pages/request/Request";
import Stockin from "./pages/stockin/Stockin";
import Stockout from "./pages/stockout/Stockout";
import Admin from "./pages/admin/Admin";
import Warehouse from "./pages/warehouse/Warehouse";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <SidebarMenu />
        <div className="content-wrapper">
          <a
            id="back-to-top"
            href="#"
            className="btn btn-primary back-to-top"
            role="button"
            aria-label="Scroll to top"
          >
            <i className="fas fa-chevron-up" />
          </a>
          <Switch>
            <Route path="/admin/warehouse">
              <Warehouse />
            </Route>
            <Route path="/admin/admin/:id">
              <Admin />
            </Route>
            <Route path="/admin/admin">
              <Admin />
            </Route>
            <Route path="/admin/stockout/:id">
              <Stockout />
            </Route>
            <Route path="/admin/stockout">
              <Stockout />
            </Route>
            <Route path="/admin/stockin/:id">
              <Stockin />
            </Route>
            <Route path="/admin/stockin">
              <Stockin />
            </Route>
            <Route path="/admin/requests/:id">
              <Request />
            </Route>
            <Route path="/admin/requests">
              <Request />
            </Route>
            <Route path="/admin/stocks/:id">
              <Stocks />
            </Route>
            <Route path="/admin/stocks">
              <Stocks />
            </Route>
            <Route path="/admin/products/:id/edit">
              <EditProduct />
            </Route>
            <Route path="/admin/products/Add">
              <AddProduct />
            </Route>
            <Route path="/admin/products/:id">
              <Products />
            </Route>
            <Route path="/admin/products">
              <Products />
            </Route>
            <Route path="/admin/preload">
              <Preload />
            </Route>
            <Route path="/admin/home" exact>
              <AdminHome />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
