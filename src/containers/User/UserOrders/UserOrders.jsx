import React, { useState, useEffect } from 'react';
import "./UserOrders.scss"

import { bringUserOrders } from '../../../services/apicalls';
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import { Col, Row, Container } from 'react-bootstrap';

const UserOrders = () => {

    const [userOrders, setUserOrders] = useState([]);
    const [error, setError] = useState('');
    const user = useSelector(userData);
    const userMail = JSON.parse(localStorage.getItem("SAVEUSERMAIL"))

    useEffect(() => {
        //This function is triggered when the component is mounted for the first time.

        if (userOrders.length === 0) {

            bringUserOrders(userMail)
                .then(
                    (res) => {
                        
                        setUserOrders(res.data)
                        
                    }
                    
                )
                .catch((error) => {
                   
                    setError(error.response?.data || 'ups intentalo de nuevo')
                })

        };


    }, [userOrders]);

    

    if (error) {
        return <pre>{ error.repeat(1) } </pre>

    }
    if (userOrders.length !== 0) {
       
        return (
            // <pre>{JSON.stringify(userOrders, null, 2)}</pre>
            <div className='contentStyle'> 
                
              
                {userOrders.map(userOrder => {
                  <div><h1> Todos los alquileres realizados por el usuario </h1> </div>
                return (
                    
                        <Card style={{ width: '12em' }} className="cards" key={userOrder.id_order}>
                    <Card.Img className='imgCards' variant="top" src={userOrder.film.poster || "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b0MxU37dNmMwKtoPVYPKOZSIrIn.jpg"} />
                    <Card.Body>
                        <Card.Title>{userOrder.name}</Card.Title>
                        <Card.Text>
                            {userOrder.userMail}
                        </Card.Text>
                        <Card.Text>
                                Desde  {userOrder.startedAt} <br></br>
                               Hasta {userOrder.endedAt}
                        </Card.Text>
                        <Card.Text>
                            {userOrder.film.title}
                        </Card.Text>
                    </Card.Body>
                            </Card>
                    
                )

                
            })}
            </div>
        )
    } else {
        return <pre>Todavía no tienes pedidos</pre>
    }
        
};

export default UserOrders;