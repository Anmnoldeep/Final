import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import useSWR from "swr";
import Card from "react-bootstrap/Card";
import ArtworkCard from "../../components/ArtworkCard";

const PER_PAGE = 12;

export default function ArtHome() {
  const [page, setPage] = useState(1)
  const [artworkList, setArtworkList] = useState()
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(  `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` );

  if (error) { return ( <Error statusCode={404} /> )}

  useEffect(()=>{
    if(data){
        var results = [];
        for(let i = 0; i < data?.objectIDs?.length; i += PER_PAGE){
            const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
            results.push(chunk);
        }
        setArtworkList(results);
    }
},[data])

function previousPage(e){ if(page > 1){setPage(page - 1) }}
function nextPage(e){ if(page < artworkList.length){setPage(page + 1) }}

  if (artworkList) {
    return(
      <>
  <Row className="gy-4">
                  {artworkList.length > 0 ? artworkList[page - 1].map((artworkList)=>(
                      <Col key={artworkList} lg={3}><ArtworkCard objectID={artworkList}/></Col> )) : 
                    <Card>
                      <Card.Body>
                          <Card.Text>
                              <h4>Nothing Here </h4> Try searching for something else
                          </Card.Text>
                      </Card.Body>
                    </Card>
                  }
              </Row>
              <Row>
                  <Col>
                  <Pagination>
                            <Pagination.Prev onClick={e =>{
                              previousPage(e)
                              }}/>
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={e => {
                              nextPage(e)
                              }}/>
                   </Pagination>
                  </Col>     
              </Row> </>)
}
}
