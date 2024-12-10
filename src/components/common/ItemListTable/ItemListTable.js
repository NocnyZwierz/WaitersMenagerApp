import React from 'react';
import { Button, Container } from 'react-bootstrap';
import style from './ItemListTable.module.scss'
import { useNavigate } from 'react-router-dom';

const ItemListTable = (props) => {
  
  const goTo = useNavigate();
  const NavigateTo = (tableId) => {
    goTo(`/table/${tableId}`);
  }
  
  return (
    <>
        <Container className={style.container}>
            <div className={style.title}>
                <h1>{'Table '+ props.number }</h1>
                <h2>{'Status: '+ props.status}</h2>
            </div>
            <Button onClick={() => NavigateTo(props.tableId)}>Show more</Button>
        </Container>
        
    </>
  )
}

export default ItemListTable
