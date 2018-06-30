import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = (props) => (
    <section>
      <h2>Dashboard</h2>

      {/*
        TODO: Make the links grid items
        with nice banners related to each tool/grid item
      */}
      <div>
        <Link to="/tool/daily" title="Daily">Daily</Link>
      </div>
      <div>
        <Link to="/tool/poker" title="poker">Poker</Link>
      </div>
      <div>
        <Link to="/tool/retrospective" title="Retrospective">Retrospective</Link>
      </div>
    </section>
);

export default Dashboard;
