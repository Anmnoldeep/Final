import Card from 'react-bootstrap/Card';
import useSWR from 'swr';
import { Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { addToFavourites, removeFromFavourites } from '../lib/userData';
import { useState, useEffect } from "react";

export default function ArtworkCardDetail(props) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);
    if(error){ return(<Error statusCode={404} />)}

    useEffect(()=>{
      setShowAdded(favouritesList?.includes(props.objectID))
     }, [favouritesList])
     

  async function favouritesClicked(){
    if(showAdded){
      setFavouritesList(await removeFromFavourites(props.objectID))
      setShowAdded(false)
    }
    else{
      setFavouritesList(await addToFavourites(props.objectID))
      setShowAdded(true)
    }
  }

      if(data){
        return (
            <Card>
              <Card.Img variant="top" src={data.primaryImage ? data.primaryImage : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} /> 
              <Card.Body>
              {data.title ? <Card.Title> {data.title} </Card.Title> : "N/A"}
                 <Card.Text>
                 <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"}<br/>
                 <strong>Classification: </strong>{data.classification ? data.classification : "N/A"}<br/>
                 <strong>Medium: </strong>{data.medium ? data.medium : "N/A"} <br/><br/>
                 <strong>Artist: </strong>{data.artistDisplayName ? data.artistDisplayName : "N/A"} ({data.artistWikidata_URL ? <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer"> Wiki </a> : ""})<br/>
                 <strong>Credit Line: </strong>{data.creditLine ? data.creditLine : "N/A"}<br/>
                 <strong>Dimensions: </strong>{data.dimensions ? data.dimensions : "N/A"}<br/>
                 <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>{showAdded ? '+ Favourite (added)' : '+ Favourite'}</Button>
                </Card.Text>
              </Card.Body>
            </Card>
          )
      }
      else{return null}
  }