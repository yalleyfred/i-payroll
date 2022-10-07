"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const react_router_dom_1 = require("react-router-dom");
require("./assets/css/common_styles.css");
require("./assets/css/index.css");
const dashboard_1 = __importDefault(require("./assets/pages/dashboard"));
const employees_1 = __importDefault(require("./assets/pages/employees"));
const payroll_1 = __importDefault(require("./assets/pages/payroll"));
const loans_1 = __importDefault(require("./assets/pages/loans"));
const allowances_1 = __importDefault(require("./assets/pages/allowances"));
const contentarea_1 = __importDefault(require("./assets/components/contentarea"));
const tax_1 = __importDefault(require("./assets/pages/tax"));
function Index() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<contentarea_1.default />}>
          <react_router_dom_1.Route path="/account" element={<dashboard_1.default />}/>
          <react_router_dom_1.Route path="/employees" element={<employees_1.default />}/>
          <react_router_dom_1.Route path="/payroll" element={<payroll_1.default />}/>
          <react_router_dom_1.Route path="/loan" element={<loans_1.default />}/>
          <react_router_dom_1.Route path="/allowances" element={<allowances_1.default />}/>
          <react_router_dom_1.Route path="/tax" element={<tax_1.default />}/>
        </react_router_dom_1.Route>
      </react_router_dom_1.Routes>
      {/* </Contentarea> */}
    </react_router_dom_1.BrowserRouter>);
}
const root = (0, client_1.createRoot)(document.getElementById("root"));
root.render(<Index />);
//# sourceMappingURL=index.js.map