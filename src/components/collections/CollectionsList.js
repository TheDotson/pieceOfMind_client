import React, { useContext, useEffect } from "react"
import { Card } from "react-bootstrap"
import { CollectionContext } from "./CollectionProvider"

export const CollectionsList = (props) => {
    const { collections, getCollections } = useContext(CollectionContext)

    useEffect(() => {
        getCollections()
    })

    return (
        <div className="collection-container">
          <div className="collection-body">
          {collections && collections.count > 0 ? (
                collections.results.map((collection) => (
                <div>
  
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>{collection.name}</Card.Title>
                    <Card.Link href={`/collections/${collection.id}`}>View Collection</Card.Link>
                  </Card.Body>
                </Card>
                </div>
                ))
              ) : (
                <h1>You have no collections.</h1>
              )}
          </div>
        </div>
    ) 
    
  };
