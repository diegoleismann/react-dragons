import React, { Component } from 'react';
import { Card, Form, FormControl, Button, InputGroup, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
    state = {
      form:{
        user:'',
        password:''
      }
    }
    login(){
      if(this.state.form.user =='admin' && this.state.form.password == 'admin'){
        localStorage.setItem('user','admin');
        this.props.history.push({pathname:'/list'});
      }
    }
    render(){
    localStorage.removeItem('user');
    return <div className="ViewLogin">
    <Container >
      <Card className="form-login">

        <Card.Body>
          <h3  class="mb-4">Dragões</h3>
          <Form>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="input-usuario">Usuário:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={(event)=>{this.state.form.user = event.target.value }}
              placeholder="Usuário"
              aria-label="Usuário"
              aria-describedby="input-usuario"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text  id="input-senha">Senha: &nbsp; </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="password"
              onChange={(event)=>{this.state.form.password = event.target.value }}
              placeholder="Senha"
              aria-label="Senha"
              aria-describedby="input-senha"
            />
          </InputGroup>
          <Button variant="danger" onClick={()=>{this.login()}} >Entrar</Button>
          </Form>
        </Card.Body>
      </Card>
      </Container>
      </div>
    }
}

export default Login;
