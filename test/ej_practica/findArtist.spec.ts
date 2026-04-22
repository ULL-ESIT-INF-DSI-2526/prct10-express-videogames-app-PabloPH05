import { describe, test, expect } from "vitest";
import { findArtist } from '../../src/ej_practica/findArtist';


describe ('Purebas para la función findArtist', () => {
    test('findArtist debe devolver el id y el nombre del artista para Jack Johnson', () => {
        return findArtist('Jack Johnson', 'https://itunes.apple.com/search?entity=musicArtist').then((data) => {
            expect(data.info?.id).toEqual(909253);
            expect(data.info?.name).toEqual('Jack Johnson');
        })
    })

    test('findArtist debe devolver el id y el nombre del artista para Bad Bunny', () => {
        return findArtist('Bad Bunny', 'https://itunes.apple.com/search?entity=musicArtist').then((data) => {
            expect(data.info?.id).toEqual(1126808565);
            expect(data.info?.name).toEqual('Bad Bunny');
        })
    })

    test('findArtist debe devolver el id y el nombre del artista para j quedandose con el primero que encuentra', () => {
        return findArtist('m', 'https://itunes.apple.com/search?entity=musicArtist').then((data) => {
            expect(data.info?.id).toEqual(1499111059);
            expect(data.info?.name).toEqual('M');
        })
    })

    test('findArtist debería responder que un artista no fue encontrado si no existe' , () => {
        return findArtist('', 'https://itunes.apple.com/search?entity=musicArtist').catch((err) => {
            expect(err.error).toEqual('API Error: artista no encontrado');
        })
    })

    test('findArtist debería responder un error en la API', () => {
        return findArtist('Jack Johnson', 'https://ies.apple.com/search?entity=musicArtist').catch((err) => {
            expect(err.error).toEqual('getaddrinfo ENOTFOUND ies.apple.com')
        })
    })
})