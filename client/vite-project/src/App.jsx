import "./App.css";
import EmployeeList from "./pages/EmployeeList";
import AddEmployeeForm from "./pages/addEmployeeForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployeeForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
