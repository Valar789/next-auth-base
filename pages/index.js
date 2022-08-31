import { useSession, getSession, signOut, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setuser] = useState(null); //guarda los datos de la sesion
  const { data: session, status } = useSession(); // traa el estado de la auth

  useEffect(() => {
    //para obtener los datos de la sesion
    (async () => {
      const session = await getSession();
      setuser(session.user);
    })();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "authenticated") {
    return (
      <>
        <h1>Has Iniciado sesion</h1>{" "}
        <button onClick={() => signOut()}>Cerrar sesion</button>
        <h2>{user.name}</h2>
        <img src={user.image} alt="" />
      </>
    );
  } else {
    return (
      <>
        <h1>Has cerrado sesion</h1>{" "}
        <button onClick={() => signIn()}>Iniciar sesion con GitHub</button>
      </>
    );
  }
}
