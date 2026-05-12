import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./adminComponents/Dashboard";
import AddProjects from "./adminPages/manageProjects/AddProjects";
import ProjectActions from "./adminPages/manageProjects/ProjectActions";
import ProfileActions from "./adminPages/manageProfile/ProfileActions";
import Message from "./adminPages/Message";
import UpdateProject from "./adminPages/manageProjects/UpdateProject";
import UpdateProfile from "./adminPages/manageProfile/UpdateProfile";
import {ProtectedRoute,AdminRoute} from "./adminComponents/ProtectedRoute";
import CreateProfile from "./adminPages/manageProfile/CreateProfile";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-profile" element={
          <AdminRoute>
            <CreateProfile />
          </AdminRoute>
        } />  
        <Route path="/edit-profile" element={
          <AdminRoute>
            <UpdateProfile />
          </AdminRoute>
        } />
        <Route path="/update-project/:id" element={
          <AdminRoute>
          <UpdateProject />
          </AdminRoute>
          } />
         <Route path="/messages" element={
          <AdminRoute>
            <Message/>
          </AdminRoute>
          }/>
         <Route path="/profile-actions" element={
          <AdminRoute>
            <ProfileActions/>
          </AdminRoute>
          }/>
         <Route path="/project-actions" element={
          <AdminRoute>
            <ProjectActions/>
          </AdminRoute>
          }/>
        <Route path="/add-project" element={
          <AdminRoute>
          <AddProjects/>
          </AdminRoute>
          }/>
       <Route
  path="/admin"
  element={
    <AdminRoute>
      <Dashboard />
    </AdminRoute>
  }
/>
         <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          } />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
