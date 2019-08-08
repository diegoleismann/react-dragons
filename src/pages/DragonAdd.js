import React, { Component } from 'react';
import { Card, Form, FormControl, Button, InputGroup, Container, Row, Col, Modal } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import Dragon from '../Services'

class DragonAdd extends Component {
    state = {
      dragons:[],
      form:{
        name:'',
        type:'',
        histories:[],
        show: false
      }
      ,
      text_success:false
    }

    componentDidMount(){

      Dragon.list(this, {}, (app, data) => {
        data.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        app.setState({dragons:data})
      });
    }
    handleShow(dragon) {
      dragon.show = true
      this.setState({form:dragon});
    }
    handleClose(){
      this.setState({form:{
        name:'',
        createdAt:'',
        type:'',
        histories:[],
        show: false
      }})
    }

    saveChanges(){
      Dragon.edit(this, this.state.form, (app, data) => {
        app.handleClose();
      });
    }
    addDragon(){
      let histories = this.state.form.histories.replace((new RegExp('([^a-zA-Z, ])*','g')),'');
      let form = {
        name:this.state.form.name,
        type:this.state.form.type,
        histories: ((histories.split(',')).length > 0 ? (histories.split(',')) : [histories])
      }
      Dragon.insert(this, form, (app, data) => {
        this.setState({text_success:true})
      })
    }

    render(){
      if (!localStorage.getItem('user')) return <Redirect to='/login' />;
      let Alert = ''
      if(this.state.text_success){
        Alert = <div class="alert alert-danger">Adicionado dragão</div>
      }
      return <div className="ViewDragonList view">
          <Header />
          <Container className="dragon-list">
          <Card className="dragon">
                <Card.Body>
                <Row>
                  <Col sm={12} lg={4}></Col>
                  <Col sm={12} lg={4}>
                  <Form>
                    {Alert}
                    <h4>Adicionar Dragão</h4>
                    <Form.Group controlId="nome">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control type="text" placeholder="Nome"  onChange={(event)=>{this.state.form.name = event.target.value}} />
                    </Form.Group>
                    <Form.Group controlId="tipo">
                      <Form.Label>Tipo</Form.Label>
                      <Form.Control type="text" placeholder="Tipo"  onChange={(event)=>{this.state.form.type = event.target.value}}  />
                    </Form.Group>
                    <Form.Group controlId="historias">
                      <Form.Label>Histórias</Form.Label>
                      <Form.Control type="text" placeholder="Histórias"  onChange={(event)=>{this.state.form.histories = event.target.value}} />
                      <Form.Text className="text-muted">
                        Use virgula para dividir historias
                      </Form.Text>
                    </Form.Group>
                    <Button variant="dark" >Cancelar</Button> &nbsp;
                    <Button variant="danger" onClick={()=>{this.addDragon()}} >Adicionar</Button>

                  </Form>
                  </Col>
                  <Col sm={12} lg={4}>


                  </Col>
                </Row>

                </Card.Body>
              </Card>

          </Container>
        </div>
    }

}

export default DragonAdd;
