"use client"

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [preferencias, setPreferencias] = useState('');
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [cargando, setCargando] = useState(false);

  const obtenerRecomendaciones = async () => {
    setCargando(true);
    try {
      const respuesta = await axios.post('api/recomendaciones', {
        preferencias,
      });
      
      setRecomendaciones(respuesta.data.recomendaciones);
    } catch (error) {
      console.error('Error al obtener recomendaciones:', error);
      setRecomendaciones(['Error al obtener recomendaciones.']);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-4">Soy tu Asitente Virtual, preguntame lo que quieras,</h1>
          <textarea
            className="w-full p-2 border rounded mb-4"
            placeholder="Introduce tus preferencias (ej: 'ropa deportiva, zapatillas para correr')."
            value={preferencias}
            onChange={(e) => setPreferencias(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={obtenerRecomendaciones}
            disabled={cargando}
          >
            {cargando ? 'Cargando...' : 'Obtener Recomendaciones'}
          </button>
          {recomendaciones.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Recomendaciones:</h2>
              <ul>
                {recomendaciones.map((recomendacion, index) => (
                  <li key={index}>{recomendacion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}