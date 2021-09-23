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
import AddAdmin from "./pages/admin/AddAdmin";
import AddWarehouse from "./pages/warehouse/AddWarehouse";
import DetailRequest from "./pages/request/DetailRequest";
import DetailRequestin from "./pages/requestin/DetailRequestin";
import Requestin from "./pages/requestin/Requestin";
import DetailStockin from "./pages/stockin/DetailStockin";
import DetailStockout from "./pages/stockout/DetailStockout";
import AddStockin from "./pages/stockin/AddStockin";
import AddStockout from "./pages/stockout/AddStockout";
import AddRequest from "./pages/request/AddRequest";
import Sales from "./pages/sales_report/Sales";

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
            <Route path="/admin/warehouse/add">
              <AddWarehouse />
            </Route>
            <Route path="/admin/warehouse">
              <Warehouse />
            </Route>
            <Route path="/admin/admin/add">
              <AddAdmin />
            </Route>
            <Route path="/admin/admin/:id">
              <Admin />
            </Route>
            <Route path="/admin/admin">
              <Admin />
            </Route>

            <Route path="/admin/stockout/add">
              <AddStockout />
            </Route>
            <Route path="/admin/stockout/detail/:id">
              <DetailStockout />
            </Route>
            <Route path="/admin/stockout/:id">
              <Stockout />
            </Route>
            <Route path="/admin/stockout">
              <Stockout />
            </Route>

            <Route path="/admin/stockin/add">
              <AddStockin />
            </Route>
            <Route path="/admin/stockin/detail/:id">
              <DetailStockin />
            </Route>
            <Route path="/admin/stockin/:id">
              <Stockin />
            </Route>
            <Route path="/admin/stockin">
              <Stockin />
            </Route>

            <Route path="/admin/requestsin/detail/:id">
              <DetailRequestin />
            </Route>
            <Route path="/admin/requestsin/:id">
              <Requestin />
            </Route>
            <Route path="/admin/requestsin">
              <Requestin />
            </Route>

            <Route path="/admin/sales-report/:id">
              <Sales />
            </Route>
            <Route path="/admin/sales-report">
              <Sales />
            </Route>

            <Route path="/admin/requests/detail/:id">
              <DetailRequest />
            </Route>
            <Route path="/admin/requests/add">
              <AddRequest />
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
