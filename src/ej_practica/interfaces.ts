/**
 * Interfaz para representar la información de un artista
 */
export interface ArtistInfo {
    id: number,
    name: string
}

/**
 * Interfaz que representa la respuesta de findArtist
 */
export interface findArtistResponse {
    info?: ArtistInfo,
    error?: string
}

/**
 * Interfaz para representar la información de un album
 */
export interface AlbumInfo {
    title: string,
    launch_year: string
}

/**
 * Interfaz para representar la respuesta de getArtistAlbums
 */
export interface AlbumsResponse {
    albums?: AlbumInfo[]
    error?: string
}