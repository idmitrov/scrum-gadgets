import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Dashboard = (props) => (
    <div>
      {/* TODO: Extract public part into Home and do logic in routes */}
      {
        props.authenticated ? (
        // TODO: Make the links grid items
        // with nice banners related to each tool/grid item
        <div>
          <div>
            <Link to="/tool/daily" title="Daily">Daily</Link>
          </div>

          <div>
            <Link to="/tool/poker" title="poker">Poker</Link>
          </div>

          <div>
            <Link to="/tool/retrospective" title="Retrospective">Retrospective</Link>
          </div>
        </div>
        ) : (
          <p>Welcome to Scrum Gadgets</p>
        )
      }
    </div>
);

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Dashboard);
