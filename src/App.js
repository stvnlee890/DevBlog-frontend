import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContext from "./authContext/authContext";
import { useContext } from "react";

import Home from "./pages/home/Home";
import Login from "./components/userAuth/login/Login";
import Developers from "./components/dev/Developers";
import Topbar from "./components/topbar/Topbar";
import Signup from "./components/userAuth/signup/Singup";
import Logout from "./components/userAuth/logout/Logout";
import BlogPostPage from "./pages/blogPostPage/BlogPostPage";
import PostForm from "./components/posts/writePost/PostForm";
import SinglePost from "./components/posts/singlePost/SinglePost";

const App = () => {
  const context = useContext(AuthContext)
  return (
    <Router>
      <Topbar isLoggedIn={context.isLoggedIn} setIsLoggedIn={context.setIsLoggedIn} admin={context.admin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<BlogPostPage />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
        <Route path="/posts/create" element={<PostForm />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/login" element={<Login setIsLoggedIn={context.setIsLoggedIn} setAdmin={context.setAdmin} />} />
        <Route path="/logout" element={<Logout setIsLoggedIn={context.setIsLoggedIn} setAdmin={context.setAdmin}/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
