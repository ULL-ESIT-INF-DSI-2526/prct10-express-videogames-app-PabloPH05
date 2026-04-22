import request from "request";
import { AlbumInfo, AlbumsResponse } from "./interfaces";

/**
 * Funcion asincrona que usa promesas. debe recibir el ID de un artista y 
 * devolverá una promesa que se resolverá con el 
 * listado de sus álbumes (título y año de lanzamiento).
 * @param artistID - Id del artista a buscar
 * @param url - url del la API
 * @returns Promesa con un objeto AlbumsResponse con un error o un array de albumes
 */
export function getArtistAlbums (artistID: number, url: string): Promise<AlbumsResponse> {
    return new Promise<AlbumsResponse> ((resolve, reject) => {
        const artistURL = url + `&id=${artistID}`;

        request({url: artistURL, json: true}, (error: Error, response: request.Response) => {
            if (error) {
                reject({error: error.message});
            } else if (response.body.resultCount === 0) {
                reject({error: 'API ERROR: el artista no tiene albumes'})
            } else if (artistID < 0) {
                reject({error: 'API ERROR: es un id invalido'})
            } else {
                const albums: AlbumInfo[] = []

                for (let index = 1; index < response.body.results.length; index++) {
                    const album = response.body.results[index];
                    const title = album.collectionName;
                    const launch_year = album.releaseDate.slice(0,4)
                    albums.push({title: title, launch_year: launch_year})
                }
                

                resolve({albums: albums})
            }
        })
    }) 
}