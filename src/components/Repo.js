import React from "react";
import "../styles/row.css";

class Repo extends React.Component {
  calculateTimeInterval(creationTime) {
    const timeDifference = new Date(Date.now() - Date.parse(creationTime));
    return Math.floor(timeDifference / (1000 * 3600 * 24));
  }
  render() {
    const { repo } = this.props;
    return (
      <React.Fragment>
        <img
          className="repo-img"
          src={repo.owner.avatar_url}
          alt={repo.owner.avatar_url}
        />
        <div className="repo-box">
          <h1> {repo.name} </h1>
          <p>{repo.description}</p>
          <div>
            <span className="star-box">
              Stars:{(repo.stargazers_count / 1000).toFixed(1)}K
            </span>
            <span className="issue-box">
              Issues:{(repo.open_issues_count / 1000).toFixed(1)}K
            </span>
            Submitted {this.calculateTimeInterval(repo.created_at)} days ago by{" "}
            {repo.owner.login}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Repo;
