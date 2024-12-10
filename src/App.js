import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import TablePage from "./components/pages/TablePage/TablePage";
import NotFound from "./components/pages/NotFound/NotFound";
import { Container } from "react-bootstrap";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import { useDispatch } from "react-redux";
import { fetchTables } from "./redux/tablesRedux";
import { useEffect } from "react";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <Container>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/table/:id" element={<TablePage/>}/>
          <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </Container>
  );
};

export default App;

