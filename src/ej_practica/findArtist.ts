import request from "request";
import { ArtistInfo, findArtistResponse } from "./interfaces";


/**
 * Funcion para buscar el nombre de un artista y su id 
 * @param artistName - Nombre del artista
 * @param url - URL de la API
 * @returns Una promesa con un objeto findArtistResponse con un mensaje de error o 
 * con el nombre del artista y un id
 */
export function findArtist(artistName: string, url: string): Promise<findArtistResponse> {
    return new Promise<findArtistResponse> ((resolve, reject) => {
        const artistURL = url + `&term=${artistName}`
        request({url: artistURL, json: true}, (error: Error, response) => {
            if (error) {
                reject({error: error.message} as findArtistResponse)
            } else if (response.body.resultCount === 0) {
                reject({error: 'API Error: artista no encontrado'});
            } else {
                const artist: ArtistInfo = {
                    id: response.body.results[0].artistId,
                    name: response.body.results[0].artistName
                }
                resolve({info: artist})
            }
        })
    })
}