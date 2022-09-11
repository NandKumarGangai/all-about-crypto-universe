import { Routes, Route, Link } from 'react-router-dom';
import { Typography, Layout, Space } from 'antd'
import './App.css';

import {
  Navbar,
  Homepage,
  // Cryptocurrencies,
  CryptoDetails,
  News
} from './components'
import { lazy, Suspense } from 'react';

const Cryptocurrencies = lazy(() => import("./components/Cryptocurrencies")); 

function App() {

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Suspense fallback={<>Loading...</>}>
            <Routes>
              <Route exact path="/" index element={<Homepage />}>
              </Route>
              {/* <Route exact path="/exchanges" element={<Exchanges />}> */}
              {/* </Route> */}
              <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />}>
              </Route>
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />}>
              </Route>
              <Route exact path="/news" element={<News />}>
              </Route>
            </Routes>
            </Suspense>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title level={5} style={{ color: "white", textAlign: "center" }}>
            Crypto Universe <br />
            All rights reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            {/* <Link to="/exchanges">Exchanges</Link> */}
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
