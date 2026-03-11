import { useEffect, useState } from "react"

const Ejemplo3UseState = () => {

    const [perfil, setPerfil] = useState({
        nombre: "Andrea",
        edad: 20
    })

    let numero = 0

    let arr = []

    useEffect(() => {
        console.log("El numero ha cambiado:", numero)
        console.log("El arr ha cambiado:", arr)
    }, [perfil])

    return (
        <>
            <div className="flex flex-col items-start justify-center h-screen gap-4 p-5">
                <div className="text-3xl">Perfil Usuario</div>
                <p>Nombre: {perfil.nombre}</p>
                <p>Edad: {perfil.edad}</p>
                <p>Numero: {numero}</p>

                <input
                    type="text"
                    placeholder="Nuevo nombre"
                    className="border-2 border-gray-500 rounded-lg p-2"

                />

                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
                    onClick={() => {
                        setPerfil(prev => ({
                            ...prev,
                            edad: prev.edad + 1
                        }))
                        numero = numero + 100
                        arr.push("Nuevo elemento")

                        console.log("El numero ha cambiado 2.0:", numero)
                        console.log("El array ha cambiado 2.0:", arr)
                    }}
                >
                    Cumplir años
                </button>

            </div>
        </>
    )
}

export default Ejemplo3UseState