import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';

import CadastrarAcc from './pages/modules/discente/CadastrarAcc/';
import Dashboard from './pages/modules/discente/Dashboard';
import DetalhesDaAcc from './pages/modules/discente/DetalhesDaAcc';
import DetalhesDaPontuacao from './pages/modules/discente/DetalhesDaPontuacao';
import TiposDeAcc from './pages/modules/discente/TiposDeAcc';

import Login from './pages/Login';
import { isAuthenticated } from './services/auth';
import { notifyError } from './utils/Notifications';

interface PrivateRouteProps {
  path: string,
  component: React.ComponentClass | any,
  exact?: boolean,
}

function PrivateRoute(props: PrivateRouteProps) {
  const { component: Component, exact, path } = props;
  console.log(isAuthenticated())
  return (
    <Route
      path={path}
      exact={exact}
      render={routeProps => 
        isAuthenticated() ? (
        <>
          <Header />
          <Component {...routeProps} />
        </>
        ) : (
          <>
          {notifyError('Ops! Você precisa fazer login no sistema!')}
          <Redirect to={{ pathname: "/" }} />
          </>
        )
      }
    />
  );
}

const Routes = () => {
  return (
    <BrowserRouter>    
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/home" component={Dashboard} />
        <PrivateRoute path="/discente/tipos-de-acc" component={TiposDeAcc} />
        <PrivateRoute path="/discente/cadastrar-acc" component={CadastrarAcc} />
        <PrivateRoute path="/discente/detalhes-da-pontuacao" exact component={DetalhesDaPontuacao} />
        <PrivateRoute path="/discente/detalhes-da-pontuacao/acc/:id" component={DetalhesDaAcc} />

        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  )
};

export default Routes;