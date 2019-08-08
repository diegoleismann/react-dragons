import React, { Component } from 'react';
import { Card, Form, FormControl, Button, InputGroup, Container, Row, Col, Modal } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import Dragon from '../Services'

class DragonList extends Component {
    state = {
      dragons:[],
      form:{
        id:'',
        name:'',
        createdAt:'',
        type:'',
        histories:[],
        show: false
      }
    }

    componentDidMount(){
      Dragon.list(this, {}, (app, data) => {
        this.listDragons();
      });
    }
    handleShow(dragon) {
      let form = {
        id: dragon.id,
        name:dragon.name,
        createdAt:dragon.createdAt,
        type:dragon.type,
        histories:this.stringHistories(dragon.histories)
      }
      form.show = true;
      this.setState({form:form});
    }
    handleClose(){
      this.setState({form:{
        id:'',
        name:'',
        createdAt:'',
        type:'',
        histories:[],
        show: false
      }})
    }

    editDragon(){
      let histories = this.state.form.histories.replace((new RegExp('([^a-zA-Z, ])*','g')),'');
      let form = {
        id:this.state.form.id,
        name:this.state.form.name,
        type:this.state.form.type,
        histories: ((histories.split(',')).length > 0 ? (histories.split(',')) : [histories])
      }

      Dragon.edit(this, form, (app, data) => {
        app.handleClose();
        app.listDragons()
      });
    }

    inputChange(event, field){
      let form = this.state.form
      form[field] = event.target.value;
      this.setState(form);
    }

    stringHistories(histories){
      return histories.join(', ')
    }
    listDragons(){
      Dragon.list(this, {}, (app, data) => {
        data.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        app.setState({dragons:data})
      });
    }
    deleteDragon(id){
      Dragon.delete(this, {id:id}, (app, data) => {
        app.listDragons()
      });
    }

    render(){
      if (!localStorage.getItem('user')) return <Redirect to='/login' />;
      return <div className="ViewDragonList view">
          <Header />
          <Container className="dragon-list">
            { this.state.dragons.map( (dragon, idx) => {
            return <Card key={idx} className="dragon">
                <Card.Body>
                <Row>
                  <Col sm={8}>{dragon.name}</Col>
                  <Col sm={4} className="text-right">
                    <Link to={{pathname:'/dragon/'+dragon.id}} >
                      <Button variant="danger" size="sm">Ver</Button>
                    </Link>&nbsp;
                    <Button variant="danger" onClick={()=>{this.handleShow(dragon)}} size="sm">Editar</Button>&nbsp;
                    <Button variant="dark" onClick={()=>{this.deleteDragon(dragon.id)}} size="sm">X</Button>
                  </Col>
                </Row>
                <Modal show={this.state.form.show} onHide={()=>{this.handleClose()}} >
                  <Modal.Header closeButton>
                    <Modal.Title>Editar Dragão</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome" onChange={(event)=>{this.inputChange(event, 'name')}} value={this.state.form.name} />
                      </Form.Group>
                      <Form.Group controlId="tipo">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control type="text" placeholder="Tipo" onChange={(event)=>{this.inputChange(event, 'type')}} value={this.state.form.type}  />
                      </Form.Group>
                      <Form.Group controlId="historias">
                        <Form.Label>Histórias</Form.Label>
                        <Form.Control type="text" placeholder="Histórias" onChange={(event)=>{this.inputChange(event, 'histories')}} value={this.state.form.histories} />
                        <Form.Text className="text-muted">
                            Use virgula para dividir historias
                        </Form.Text>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{this.handleClose()}}>
                      Cancelar
                    </Button>
                    <Button variant="danger" onClick={()=>{this.editDragon()}}>
                      Salvar
                    </Button>
                  </Modal.Footer>
                </Modal>
                </Card.Body>
              </Card> }
            )}
          </Container>
        </div>
    }

}

export default DragonList;
