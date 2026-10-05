import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { AdminRoute } from "./adminComponents/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./adminComponents/Dashboard"));
const AddProjects = lazy(() => import("./adminPages/manageProjects/AddProjects"));
const ProjectActions = lazy(() => import("./adminPages/manageProjects/ProjectActions"));
const ProfileActions = lazy(() => import("./adminPages/manageProfile/ProfileActions"));
const Message = lazy(() => import("./adminPages/Message"));
const UpdateProject = lazy(() => import("./adminPages/manageProjects/UpdateProject"));
const UpdateProfile = lazy(() => import("./adminPages/manageProfile/UpdateProfile"));
const CreateProfile = lazy(() => import("./adminPages/manageProfile/CreateProfile"));

const lazyPage = (Page) => (
  <Suspense fallback={null}>
    <Page />
  </Suspense>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={lazyPage(Login)} />
        <Route
          path="/create-profile"
          element={<AdminRoute>{lazyPage(CreateProfile)}</AdminRoute>}
        />
        <Route
          path="/edit-profile"
          element={<AdminRoute>{lazyPage(UpdateProfile)}</AdminRoute>}
        />
        <Route
          path="/update-project/:id"
          element={<AdminRoute>{lazyPage(UpdateProject)}</AdminRoute>}
        />
        <Route
          path="/messages"
          element={<AdminRoute>{lazyPage(Message)}</AdminRoute>}
        />
        <Route
          path="/profile-actions"
          element={<AdminRoute>{lazyPage(ProfileActions)}</AdminRoute>}
        />
        <Route
          path="/project-actions"
          element={<AdminRoute>{lazyPage(ProjectActions)}</AdminRoute>}
        />
        <Route
          path="/add-project"
          element={<AdminRoute>{lazyPage(AddProjects)}</AdminRoute>}
        />
        <Route
          path="/admin"
          element={<AdminRoute>{lazyPage(Dashboard)}</AdminRoute>}
        />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
