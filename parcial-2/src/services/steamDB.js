export default class steamDataBase {
    async importarJuego(appId) {
        if (!appId) {
            console.error("Error: Se requiere un AppID.");
            return null;
        }
        const urlProxy1 = 'https://vercel-proxy-by-iron.vercel.app/api/proxy?url='

        try {
                return this.importarJuegoP(appId, urlProxy1);
        } catch (error) {
            console.error('Error en proxy', error)
            return null;
        }
    }

    async importarJuegoP(appId, urlProxy) {
        const urlSteam = `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=es`;
        let url = urlProxy + urlSteam;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            console.error(`Error de solicitud HTTP: ${respuesta.status} ${respuesta.statusText}`);
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        const datosJSON = await respuesta.json();
        const resultado = datosJSON[appId];

        if (resultado && resultado.success) {
            return resultado.data;
        } else {
            console.error(`La API de Steam no devolvió datos exitosos para el AppID ${appId}.`);
            return null;
        }
    }
}
