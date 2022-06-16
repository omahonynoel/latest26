import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"
import { useFirestore } from "./useFirestore"



export const useTest = (dbpath) => {
  const { addDocument, response } = useFirestore(dbpath)

  console.log("dbpath is - "   + dbpath)

  return { addDocument,  response }

}
