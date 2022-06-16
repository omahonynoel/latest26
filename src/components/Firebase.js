/* export function firebaseAddDocument(dbPath)
{
    console.log('in firebaseAddDocument')
} */


import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
  addedDocId:null
}
function FirestoreReducer(state, action){
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null, addedDocId: action.payload.id}
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}

export function FirebaseAddDocument(collection)  {
 


  // collection ref
  const ref = projectFirestore.collection(collection)



  // add a document
  const addDocument = async (doc) => {


    console.log("in useFS    " + collection)

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
    
    
    }
    catch (err) {
      
    }
  }





 
  return { addDocument }

}