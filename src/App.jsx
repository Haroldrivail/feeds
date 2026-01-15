import React from 'react'
import { Route, Routes } from 'react-router'
import Layout from './layouts/Layout.jsx'
import Home from './pages/Home.jsx'
import Topics from './pages/Topics.jsx'
import TopicArticles from './pages/TopicArticles.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topicId" element={<TopicArticles />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}

export default App