import { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import KeyService from "../services/key.service";
import IUser from "../types/user.type";

type Props = {};

type State = {
  redirect: string | null;
  keys: Array<any>;
  logs: any;
  userReady: boolean;
  currentUser: IUser & { accessToken: string };
};
export default class Key extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      keys: [],
      logs: {},
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });

    KeyService.getKeys().then(
      (response) => {
        console.log("keys", response.data);
        this.setState({ keys: response.data.keys });
        this.setState({ logs: response.data.logs });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // /logs/:key
  addAPIKey = () => {
    KeyService.addKey().then(
      (response) => {
        alert("API Key Created");
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  updateAPIKey(d: any) {
    KeyService.updateKey(d).then(
      (response) => {
        alert("API Key Updated");
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {this.state.userReady ? (
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> API keys
              </h3>
            </header>
            <div>
              <button
                className="btn btn-primary btn-block"
                onClick={this.addAPIKey}
              >
                Create API Key
              </button>
            </div>
            <div>
              <table className="table table-bordered">
                <tbody>
                  <tr className="alert alert-success">
                    <td>
                      <h4>S No.</h4>
                    </td>
                    <td>
                      <h4>API key</h4>
                    </td>
                    <td>
                      <b>Enable</b>
                    </td>
                  </tr>

                  {this.state.keys.map((data, idx) => (
                    <tr>
                      <td>{idx + 1}</td>
                      <td className="alert alert-info">
                        <b>{data.token}</b>

                        <table className="table table-bordered">
                          <tbody className="alert alert-warning">
                            <tr className="alert alert-active">
                              <td>URL</td>
                              <td>Timestamp</td>
                            </tr>
                            {this.state.logs[data.token]?.map((logs: any) => (
                              <tr>
                                <td>{logs.url}</td>
                                <td>{logs.createdAt}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                      <td>
                        {JSON.stringify(data.isActive)}
                        <button
                          className="btn btn-primary btn-block"
                          value={data.token}
                          onClick={this.updateAPIKey.bind(this, data.token)}
                          // onClick={this.updateAPIKey}
                        >
                          {JSON.stringify(data.isActive) == "true"
                            ? "Disable"
                            : "Enable"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
