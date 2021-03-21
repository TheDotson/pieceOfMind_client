import React, { useState } from "react"

export const CollectionContext = React.createContext()

export const CollectionProvider = (props) => {
    const [collections, setCollections] = useState({})
    const [collection, setCollection] = useState({})

    const getCollectionById = (id) => {
        return fetch(`http://localhost:8000/collections/${id}`, {
          headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
          }
        })
        .then(res => res.json())
        .then((res) => {
            setCollection(res)
            return res
        })
    }

    const getCollections = () => {
        return fetch("http://localhost:8000/collections", {
          headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
          }
        })
        .then(res => res.json())
        .then(setCollections)
        }

    const createCollection = collection => {
        return fetch("http://localhost:8000/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(collection)
        })
    }

    const updateCollection = collection => {
        return fetch(`http://localhost:8000/collections/${collection.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(collection)
        })
    }

    const deleteCollection = collectionId => {
        return fetch(`http://localhost:8000/collections/${collectionId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
        .then(getCollections)
    }

    
    return (
        <CollectionContext.Provider value ={{
            collection,
            collections,
            getCollections,
            getCollectionById,
            createCollection,
            updateCollection,
            deleteCollection
        }}>
            {props.children}
        </CollectionContext.Provider>
    )
}
