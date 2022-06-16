import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
  addedDocId:null,
  addedDoc:null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null, addedDocId: action.payload.id, addedDoc: action.payload.collection}
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
 // const ref = projectFirestore.collection(collection)

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (dbpath,doc) => {
    const ref = projectFirestore.collection(dbpath)
    dispatch({ type: 'IS_PENDING' })

    console.log("in useFS    " + collection)
    console.log("in useFS dispath returns    " + dispatch)
    try {
      const createdAt = timestamp.fromDate(new Date())
      //const addedDocument = await ref.add({ ...doc, createdAt })
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }





  // delete a document
  /* const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, []) */

 // return { addDocument, addRound, deleteDocument, response }
 return { addDocument,  response }

}
