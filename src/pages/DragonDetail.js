import React, { Component } from 'react';
import { Card, Form, FormControl, Button, InputGroup, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import Dragon from '../Services'

class DragonDetail extends Component {
    state = {
      dragon:{
        name:'',
        createdAt:'',
        type:'',
        histories:[],
      }
    }

    componentDidMount(){
      Dragon.get(this, {id:this.props.match.params.id}, (app, data) => {
        app.setState({dragon:data})
      });
    }

    render(){
      if (!localStorage.getItem('user')) return <Redirect to='/login' />;
      let dragon = this.state.dragon
      let dt = new Date(this.state.dragon.createdAt);
      let criadoEm = ''
      if(dt){
      criadoEm = ( dt.getDay() < 10 ? '0' + dt.getDay() : dt.getDay() ) + '/' +
                 ( dt.getMonth()+1 < 10 ? '0' + (dt.getMonth()+1) : (dt.getMonth()+1) ) + '/' +
                 ( dt.getFullYear() );
      }
      if(dragon.name != ''){
      return <div className="ViewDragonList view">
          <Header />
          <Container className="dragon-list">
             <Card className="dragon">
                <Card.Body>
                    <h2>{dragon.name}</h2>
                    <p class="text-muted mb-0"> Criado em {criadoEm}</p>
                    <p> Tipo <strong>{dragon.type}</strong> </p>

                </Card.Body>
              </Card>
          </Container>
        </div>
    }else{
      return ''
    }
  }
}

export default DragonDetail;
