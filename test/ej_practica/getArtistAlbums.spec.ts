import { describe, test, expect } from "vitest";
import {getArtistAlbums} from '../../src/ej_practica/getArtistAlbums';
import { findArtist } from '../../src/ej_practica/findArtist';

describe('Pruebas para la función getArtistAlbums', () => {
    test('La función debería devolver un array con todas los albumes', () => {
        return getArtistAlbums(909253, 'https://itunes.apple.com/lookup?entity=album').then((data) => {
            expect(data.albums?.length).toEqual(50)
            expect(data.albums?.at(0)).toEqual({launch_year: '2001', title: 'Brushfire Fairytales (Remastered) [Bonus Version]'})
        })
    })

    test('La función debe devolver error si el artista no tiene albumes', () => {
        return getArtistAlbums(1, 'https://itunes.apple.com/lookup?entity=album').catch((err) => {
            expect(err.error).toEqual('API ERROR: el artista no tiene albumes');
        })
    })

    test('La función debe devolver error si el id no es valido', () => {
        return getArtistAlbums(-1, 'https://itunes.apple.com/lookup?entity=album').catch((err) => {
            expect(err.error).toEqual('API ERROR: es un id invalido');
        })
    })

    test('La función debe devolver error si la API falla', () => {
        return getArtistAlbums(3000, 'https://is.apple.com/lookup?entity=album').catch((err) => {
            expect(err.error).toEqual('getaddrinfo ENOTFOUND is.apple.com');
        })
    })

    test('Ambas funciones se acoplan', () => {
        findArtist('Jack Johnson', 'https://itunes.apple.com/search?entity=musicArtist').then((data) => {
            expect(data.info?.id).toEqual(909253);
            return getArtistAlbums(data.info?.id as number, 'https://itunes.apple.com/lookup?entity=album').then((data) => {
                expect(data.albums?.length).toEqual(50)
            expect(data.albums?.at(0)).toEqual({launch_year: '2001', title: 'Brushfire Fairytales (Remastered) [Bonus Version]'})
            })
        })
    })

    test('Ambas funciones se acoplan con otro ejemplo', () => {
        findArtist('Bad Bunny', 'https://itunes.apple.com/search?entity=musicArtist').then((data) => {
            expect(data.info?.id).toEqual(1126808565);
            return getArtistAlbums(data.info?.id as number, 'https://itunes.apple.com/lookup?entity=album').then((data) => {
                expect(data.albums?.length).toEqual(50);
                expect(data.albums?.at(0)).toEqual({launch_year: '2001', title: 'Brushfire Fairytales (Remastered) [Bonus Version]'})
            })
        })
    })
})