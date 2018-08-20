import React, { Component } from 'react';

import { connect } from 'react-redux';
import { showSnackBar } from '../../containers/Layout/Layout';

import ConfirmModal from '../../components/UI/Modal/ConfirmModal/ConfirmModal';
import ErrorModal from '../../components/UI/Modal/ErrorModal/ErrorModal';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Settings.css';

import * as util from '../../utils';
import logo from '../../assets/img/profile.png';

import * as actionCreators from '../../store/actions/index';
import * as axios from '../../axios-orders';
import * as cookie from '../../cookie-handler';

class Settings extends Component {

    state = {
      user: null,
      confirmModal: {
        title: '',
        question: '',
        active: false,
        userToDelete: null
      },
      errorModal: {
        title: 'Error',
        message: 'Não foi possível se conectar ao servidor.',
        active: false
      },
      loading: false,
      imageFileName: null,
      pictureFileName: '',
      name: '',
      gender: 'MALE',
      login: '',
      email: ''
    }

    componentDidMount(){
      // getting token from cookies
      const token = cookie.getToken();

      if(token !== null && token !== ''){
        this.props.onToken(token);
        axios.getAuthUser(cookie.getToken()).then(res =>{
            const userAuth = res.data;
            console.log('userAuth', userAuth);
            this.props.onLogin(userAuth);

            this.setState({
              name: userAuth.name,
              gender: userAuth.gender,
              login: userAuth.login,
              email: userAuth.email,
            });

        }).catch(err =>{
            // console.log('Sessão expirou.', err);
        });
      }
    }

    updateUserData = () =>{

      if(this.state.name.trim() === "" || this.state.login === "" || this.state.email === ""){
        showSnackBar("Preencha todos os campos");
      }else if(!util.validateEmail(this.state.email)){
        showSnackBar("O formato de e-mail está incorreto.");
      }else{
        this.setState({loading: true});

        const updateUser = {
          name: this.state.name,
          gender: this.state.gender,
          login: this.state.login,
          email: this.state.email
        }

        axios.userSetting(updateUser, cookie.getToken()).then(res => {
          const user = res.data;
          this.props.onLogin(user);
          this.setState({loading: false});
          showSnackBar("Alterações realizadas com sucesso!");
        }).catch(err => {
          console.log("err", err);
          this.setState({loading: false});
        });
      }

    }

    fileSelectedHandler = event =>{
      this.setState({
        imageFileName: event.target.value
      });
    }

    errorModal = (msg) =>{
      this.setState({
        errorModal: {
          title: 'Error',
          message: msg,
          active: true
        }
      });
    }

    closeErrorModal = () => {
      this.setState({
        errorModal:{
          active: false
        }
      })
    }

    modalConfirmRemove = (user) => {
      const art = user.gender === 'MALE' ? 'o' : 'a';

      this.setState({
        confirmModal:{
          title: 'Remover usuário',
          question: 'Tem certeza que deseja remover '+art+' '+user.name+'?',
          active: true,
          userToDelete: user
        }
      });
    }

    closeConfirmModal = () =>{
      this.setState({
        confirmModal:{
          active: false,
          userToDelete: null
        }
      });
    }

    updateUserPassword = () =>{

    }

    onChangeName = event => {
      this.setState({
        name: event.target.value
      });
    }

    onChangeLogin = event => {
      this.setState({
        login: event.target.value
      });
    }

    onChangeEmail = event => {
      this.setState({
        email: event.target.value
      });
    }

    onChangeGender = event => {
      this.setState({
        gender: event.target.value
      });
    }

    render() {    
      
      return (
        <div className="settings-screen">

          <Spinner
            marginLeft='calc(50% - 404px)'
            marginTop='8%'
            active={this.state.loading} />

          <ConfirmModal 
            title={this.state.confirmModal.title}
            question={this.state.confirmModal.question}
            active={this.state.confirmModal.active}
            marginLeft='calc(50% - 404px)'
            marginTop='10%'
            confirm={this.removeUser} 
            cancel={this.closeConfirmModal} />

          <ErrorModal
            title={this.state.errorModal.title}
            message={this.state.errorModal.message}
            marginLeft='calc(50% - 404px)'
            marginTop='10%'
            active={this.state.errorModal.active}
            cancel={this.closeErrorModal} />

          <div className='text-editor-markdown'>
            <h1 className='simple-template-title'><i className="fa fa-cog"></i> Configurações</h1>
          </div>

          <div className="settings-screen">
            <div className="settings-screen-content">
                <h3>Imagem de avatar</h3>
                
                <div style={{width: '95px'}}>
                    <img height="90" width="90" alt="Profile" src={logo}/>
                </div>

                <div className="settings-screen-content-image">
                    <div className="picture-manager-upload-div">                   
                        <button className='article-btn article-btn-topic' 
                            style={{width: '300px'}}
                            onClick={this.imageUpload} >Alterar imagem</button>
                        
                        <input style={{marginTop: '10px'}} type="file" onChange={this.fileSelectedHandler} />
                    </div>
                </div>
            </div>

            <hr />

            <div className="settings-screen-content">
                <h3>Dados do usuário</h3>
                <p className="edit-user-modal-label">Nome</p>
                <input type="text" placeholder="Nome do usuário" value={this.state.name}
                  onChange={this.onChangeName}></input>

                <p className="edit-user-modal-label">Gênero</p>
                <select id="setting-user-select-gender" onChange={this.onChangeGender}>
                    <option value="MALE">Masculino</option>
                    <option value="FEMALE">Feminino</option>
                </select>

                <p className="edit-user-modal-label">Login</p>
                <input type="text" placeholder="Login do usuário" value={this.state.login}
                  onChange={this.onChangeLogin}></input>

                <p className="edit-user-modal-label">E-mail</p>
                <input type="text" placeholder="Email do usuário" value={this.state.email}
                  onChange={this.onChangeEmail}></input>

                <button className='article-btn article-btn-topic' 
                    onClick={this.updateUserData.bind(this)} 
                    style={{marginTop: '10px'}}>Salvar alteração de dados</button>
            </div>

            <hr />

            <div className="settings-screen-content">
                <h3>Alteração de senha</h3>
                <p className="edit-user-modal-label">Senha atual</p>
                <input type="password" placeholder="Senha atual"></input>
                <p className="edit-user-modal-label">Nova senha</p>
                <input type="password" placeholder="Nova senha"></input>
                <p className="edit-user-modal-label">Confirmação da nova senha</p>
                <input type="password" placeholder="Confirmação da nova senha"></input>

                <button className='article-btn article-btn-topic' 
                    onClick={this.updateUserPassword.bind(this)} 
                    style={{marginTop: '10px'}}>Salvar alteração de senha</button>
            </div>
          </div>

        </div>
      );
    }
}

const mapStateToProps = state => {
  return{
      usr: state.usr.user,
      appName: state.app.appName,
      tkn: state.usr.token
  };
}

const mapDispathToProps = dispatch => {
  return{
      onLogin: (usr) => dispatch(actionCreators.userLogin(usr)),
      onToken: (tkn) => dispatch(actionCreators.token(tkn)),
      getAppName: () => dispatch(actionCreators.appName()),
      onAuth: (login, password) => dispatch(actionCreators.auth(login, password))
  };
}

export default connect(mapStateToProps, mapDispathToProps, null, {pure:false})(Settings);