import Link  from 'next/link'
import {Button, Card} from 'react-bootstrap';
import useSWR from 'swr';
export default function ArtworkCard(props) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json()); 
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`, fetcher);
  
    if(error){ return(<Error statusCode={404} />)}
    if(data){
      return (
          <Card>
            <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} /> 
            <Card.Body>
            {data.title ? <Card.Title> {data.title} </Card.Title> : "N/A"}
               <Card.Text>
               <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"}<br/>
               <strong>Classification: </strong>{data.classification ? data.classification : "N/A"}<br/>
               <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}<br/>
              </Card.Text>
              <Link href={`/artwork/${data.objectID}`} passHref><Button variant="outline-primary"><strong>ID: </strong>{data.objectID}</Button></Link>
            </Card.Body>
          </Card>
        )}
    else{ return null}
}
