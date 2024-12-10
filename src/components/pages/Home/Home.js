import { Container, Spinner } from "react-bootstrap";
import ItemListTable from "../../common/ItemListTable/ItemListTable";
import { useSelector } from "react-redux";
import { getAllTables } from '../../../redux/tablesRedux';


const Home = () => {
    const tables = useSelector(getAllTables);
    if(tables.length !== 0){
    return (
        <Container>
            <h1>All Tables</h1>
            {tables.map(table =>
                <ItemListTable number={table.id} status={table.status} tableId={table.id} />
            )}
        </Container>
    )
    } else  return (<Spinner/>)
};

export default Home;