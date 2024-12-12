import { Button, Container, Form, Spinner } from "react-bootstrap";
import style from './TablePage.module.scss';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getTableById, fetchTable } from "../../../redux/tablesRedux";

const AppTable = (props) => {

    const statusOption = ['Free', 'Reserved', 'Busy', 'Cleaning'];
    const [people1, setPeople1] = useState(props.peopleAmount);
    const [people2, setPeople2] = useState(props.maxPeopleAmount);
    const [status, setStatus] = useState(props.status);
    const [bill, setBill] = useState(props.bill);
    const dispatch = useDispatch();
    const goTo = useNavigate();


    const handlePeople1Change = (e) => {
        const value = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 10);
        const corretedValue = Math.min(value, people2)
        setPeople1(corretedValue);

    };

    const handlePeople2Change = (e) => {
        const value = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 10);
        if(people1 > value) {
            setPeople1(value)
        }
        setPeople2(value);

    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleBillChange = (e) => {
        setBill(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTable = {
          id: props.id,
          status: status,
          peopleAmount: people1,
          maxPeopleAmount: people2,
          bill: status === 'Busy' ? bill : 0,
        };
        dispatch(fetchTable(updatedTable));
        goTo('/');
      };

   return <Container className={style.root}>
    <h1>{'Table '+ props.id}</h1>
    <div>
        <Form onSubmit={handleSubmit}>
            
            <Form.Group controlId="status" className={style.status}>
            <span>Status: </span>
                <Form.Select className={style.statusForm} onChange={handleStatusChange} value={status} >
                {statusOption.map((status) => (
                    <option value={status}>
                        {status}
                    </option>
                ))}
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="people" className={style.people}>
                <span>People: </span>
                <Form.Control type="number"
                    value={people1}
                    onChange={handlePeople1Change}
                    min={0}
                    max={10}
                />
                <span>/</span>
                <Form.Control
                    type="number"
                    value={people2}
                    onChange={handlePeople2Change}
                    min={0}
                    max={10}
                />
            </Form.Group>

            { status === 'Busy' && 
                <Form.Group controlId="bill" className={style.bill}>
                    <span>Bill: </span>
                    <Form.Label>$</Form.Label>
                    <Form.Control
                        value={bill}
                        type="number"
                        min={0}
                        onChange={handleBillChange}
                        max={999}/>
                </Form.Group>
            }
            { status !== 'Busy' &&
                <div></div>
            }
            <Button type="submit" >Update</Button>
        </Form>
    </div>

    <div>

    </div>
</Container>
}
const TablePage = () => {
    const { id } = useParams();
    let table = useSelector(state => getTableById(state, id))


    return table?   <AppTable status={table.status} peopleAmount={table.peopleAmount} maxPeopleAmount={table.maxPeopleAmount} id={id} bill={table.bill}/> : <Spinner/>
    };

export default TablePage;