import React, { Component } from 'react';
import './index.css';

class ProfilePage extends Component {

  // to redirect if not logged in:
  // componentWillMount() {
  //   if (!this.props.isAuthenticated() || !!this.props.profile) {
  //     this.props.history.replace('/');
  //   }
  // }

  render() {
    let profileInfo = <div>not logged in</div>;
    if (this.props.profile) {
      profileInfo = (
        <div>

          <div className="box">
            <article className="media">
              <div className="media-left">
                <figure className="image is-32x6">
                  <img src={this.props.profile.picture} alt="profile" />
                </figure>
              </div>
              <div className="media-content">
                <div className="content2">
                  <p>
                    <li>Log-in email: {this.props.profile.name}</li>
                    <li>Nickname: {this.props.profile.nickname}</li>
                    <li>Last update time: {this.props.profile.updated_at.replace(/[a-zA-Z]/g," ")}</li>
                  </p>
                </div>
              </div>
            </article>
          </div>

        </div>
      );
    }

    return (
      <div className="profile-page">
        {profileInfo}
      </div>
    );
  }
}

export default ProfilePage;
