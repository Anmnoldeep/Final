import {Form, Button, Navbar, Nav, Container,NavDropdown} from 'react-bootstrap';
import { useRouter } from 'next/router'
import Link  from 'next/link'
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { useState} from "react";

import { addToHistory } from '../lib/userData';
import { removeToken, readToken } from '../lib/authenticate';


export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState()
  const [isExpanded, setIsExpanded] = useState(false)

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  
    async function submitForm(e) {
      e.preventDefault()
      setIsExpanded(false)
      router.push(`/artwork?title=true&q=${searchField}`);
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
    }

  let token = readToken();

  function logout() {   
    setIsExpanded(false)
    removeToken()
    router.push('/login')
  }
  
  return (
    <>
    <Navbar className="fixed-top navbar-dark bg-primary"  expanded={isExpanded} expand="lg" >
      <Container>
        <Navbar.Brand>Anmoldeep</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={(e) => {setIsExpanded(!isExpanded)}}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link href="/" passHref legacyBehavior><Nav.Link  onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/"}>Home</Nav.Link></Link>
          {token  && 
          <Link href="/search" passHref legacyBehavior><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>}
          </Nav>

          &nbsp;
                    {token && 
          <Form onSubmit={submitForm} className="d-flex" setIsExpanded={false} >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              
              onChange={(e) => searchItems(e.target.value)}
              
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>}
          &nbsp;

          {token ? <Nav>
          <NavDropdown title={token.userName} id="basic-nav-dropdown">
          <Link href="/favourites" passHref legacyBehavior>
          <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
            </Link>
          <Link href="/history" passHref legacyBehavior>
          <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/history"}>Search History</NavDropdown.Item>
          </Link>
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
          </Nav>
          :
          <Nav >
            <Link href="/register" passHref legacyBehavior>
            <Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/register"}>Register</Nav.Link>
              </Link>
            <Link href="/login" passHref legacyBehavior>
            <Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/login"}>Login</Nav.Link>
              </Link>
          </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br /><br />
    </>)}


