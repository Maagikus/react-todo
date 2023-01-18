import { useCallback } from 'react'
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
export const useGetData = () => {
	const db = getFirestore()
	const auth = getAuth()
	const [user, loading, error] = useAuthState(auth)
	const request = useCallback(async (name) => {
		const querySnapshot = await getDocs(collection(db, `/users/${user.uid}/${name}`));
		const data = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}))
		return data
	}, [])
	return { request }
}
