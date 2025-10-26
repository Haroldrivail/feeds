import React from 'react'
import { Route, Routes } from 'react-router'
import Layout from './layouts/Layout.jsx'
import Home from './pages/Home.jsx'
import Topics from './pages/Topics.jsx'
import TopicArticles from './pages/TopicArticles.jsx'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topicId" element={<TopicArticles />} />
      </Routes>
    </Layout>
  )
}

export default App