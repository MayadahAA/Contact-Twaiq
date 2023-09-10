import axios from "axios";
import { useEffect, useState } from "react";
interface Data {
    id: number,
    title: string,
    price: string,
    description: string,
    category: string,
    image: string,
}

export default function Community() {

    const [getItems, setItems] = useState<Data[]>([])
    useEffect(() => {
        try {
            axios.get('')
                .then((res) => {
                    setItems(res.data)
                })
        } catch (error) {
            console.log(error);

        }
    }, [])

  return (
    <div>Community</div>
  )
}
