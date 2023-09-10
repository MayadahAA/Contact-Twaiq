import axios from "axios";
import { useEffect, useState } from "react";

interface IUser {
  id: string;
  name: string;
  field: string;
  description: string;
  status: string;
}

export default function Settings() {
  const url = "https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/users";
  const [instructor, setInstructor] = useState<IUser[]>([]);

  try {
    useEffect(() => {
      axios.get(url).then((response) => {
        setInstructor(response.data);
      });
    }, [instructor]);
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      {instructor.find((item) => (
        <div key={item.id}>
          {item.name}
        </div>
      ))}
    </>
  );
}
