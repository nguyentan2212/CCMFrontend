import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./scss/style.scss";
import { getToken } from "./js/localStorageToken";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: getToken() };
  }

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            {!this.state.user ? (
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => (
                  <Login
                    {...props}
                    setUser={(user) => this.setState({ user: user })}
                  />
                )}
              />
            ) : (
              <Redirect from="/login" to="/" />
            )}
            {!this.state.user ? (
              <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => (
                  <Register
                    {...props}
                    setUser={(user) => this.setState({ user: user })}
                  />
                )}
              />
            ) : (
              <Redirect from="/register" to="/" />
            )}
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            {!this.state.user ? (
              <Redirect to="/login" />
            ) : (
              <Route
                path="/"
                name="Home"
                render={(props) => <TheLayout {...props} />}
              />
            )}
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
