import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ArtworkCard from '../components/ArtworkCard';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';

export default function Favourites(props) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;

    if(favouritesList){
    return (
        <>
      <Row className="gy-4">
                      {favouritesList.length > 0 ?
                       favouritesList.map((list)=>(
                          <Col lg={3} key={list} ><ArtworkCard objectID={list}/></Col>
                       ))
                        : 
                       <Card>
                          <Card.Body>
                              <Card.Text>
                                  <h4>Nothing Here</h4> Try adding some new artwork to the list.
                              </Card.Text>
                          </Card.Body>
                       </Card>
                      }
                  </Row>
                 {!favouritesList && null }
        </>)}}
  