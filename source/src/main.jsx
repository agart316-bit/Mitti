import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import StatePage from './components/StatePage.jsx'
import Stub from './components/Stub.jsx'
import Home from './components/Home.jsx'
import Mix from './components/Mix.jsx'
import Reserve from './components/Reserve.jsx'
import Passport from './components/Passport.jsx'
import { bySlug } from './data/states.js'
import { detailed } from './data/pages.js'

// Every page shell is <div id="root" data-page="home|<slug>" data-base="./|../">.
const el = document.getElementById('root')
const { page, base } = el.dataset
let view
if (page === 'home') view = <Home base={base} />
else if (page === 'mix') view = <Mix base={base} />
else if (page === 'passport') view = <Passport base={base} />
else if (detailed[page]) view = <StatePage state={detailed[page]} base={base} />
else view = <Stub state={bySlug[page]} base={base} />
createRoot(el).render(<>{view}<Reserve /></>)
