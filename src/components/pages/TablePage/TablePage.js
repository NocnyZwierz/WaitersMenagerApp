import { Button, Container, Form, Spinner } from "react-bootstrap";
import style from './TablePage.module.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getAllTables, getTableById } from "../../../redux/tablesRedux";


const TablePage = () => {
    const statusOption = ['Free', 'Reserved', 'Busy', 'Cleaning'];
    const [people1, setPeople1] = useState(0);
    const [people2, setPeople2] = useState(0);

    const { id } = useParams();
    let table = useSelector(state => getTableById(state, id))

    const handlePeople1Change = (e) => {
        const value = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 10);
        const corretedValue = Math.min(value, people2)
        setPeople1(corretedValue);

    };

    const handlePeople2Change = (e) => {
        const value = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 10);
        setPeople2(value);
    };
    if(table) {
    return ( 
        <Container className={style.root}>
            <h1>{'Table '+ id}</h1>
            <div>
                <Form onSubmit={(event)=> console.log('chuj', event)}>
                    
                    <Form.Group controlId="status" className={style.status}>
                    <span>Status: </span>
                        <Form.Select className={style.statusForm} defaultValue={table.status} >
                        {statusOption.map((status) => (
                            <option value={status} defaultValue={'Free'}>
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

                    <Form.Group controlId="bill" className={style.bill}>
                        <span>Bill: </span>
                        <Form.Label>$</Form.Label>
                        <Form.Control
                            defaultValue={10}
                            type="number"
                            min={0}
                            max={999}/>
                    </Form.Group>
                    <Button type="submit">Update</Button>
                </Form>
            </div>

            <div>

            </div>
        </Container>
    ) } else  return (<Spinner/>)
};

export default TablePage;