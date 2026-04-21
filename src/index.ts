import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { Videogame, ResponseType } from './types';

const app = express();
const port = 3000;

app.use(express.json());

const BASE_DIR = path.join(__dirname, 'database');

app.get('/videogames', (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id as string;

  if (!user) {
    const response: ResponseType = {
      success: false,
      error: 'Se requiere un nombre de usuario',
    };
    return res.status(400).json(response);
  }

  const userDir = path.join(BASE_DIR, user);

  fs.access(userDir)
    .catch(() => {
      return fs.mkdir(userDir, { recursive: true });
    })
    .then(() => {
      if (id) {
        const filePath = path.join(userDir, `${id}.json`);

        return fs
          .readFile(filePath, 'utf-8')
          .then((data) => {
            const game: Videogame = JSON.parse(data);
            return res.json({
              success: true,
              videogames: [game],
            } as ResponseType);
          })
          .catch(() => {
            return res.status(404).json({
              success: false,
              error: 'Videojuego no encontrado',
            } as ResponseType);
          });
      }

      return fs.readdir(userDir).then((files) => {
        const jsonFiles = files.filter((file) => file.endsWith('.json'));

        const readPromises = jsonFiles.map((file) => {
          return fs
            .readFile(path.join(userDir, file), 'utf-8')
            .then((data) => JSON.parse(data) as Videogame);
        });

        return Promise.all(readPromises).then((games) => {
          return res.json({ success: true, videogames: games } as ResponseType);
        });
      });
    })
    .catch(() => {
      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          error: 'Error interno del servidor',
        } as ResponseType);
      }
    });
});

app.post('/videogames', (req, res) => {
  const user = req.query.user as string;
  const newGameInfo: Videogame = req.body;

  if (!user || !newGameInfo.id) {
    return res
      .status(400)
      .json({ sucess: false, error: 'Usuario o Id no proporcionado' });
  }

  const userDir = path.join(BASE_DIR, user);

  fs.access(userDir)
    .catch(() => {
      return fs.mkdir(userDir, { recursive: true });
    })
    .then(() => {
      const filePath = path.join(userDir, `${newGameInfo.id}.json`);
      return fs
        .access(filePath)
        .then(() => {
          res.status(409).json({
            success: false,
            error: 'El juego ya existe',
          } as ResponseType);
        })
        .catch(() => {
          fs.writeFile(filePath, JSON.stringify(newGameInfo, null, 2)).then(
            () => {
              return res.status(201).json({ success: true } as ResponseType);
            },
          );
        });
    })
    .catch(() => {
      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          error: 'Error interno del servidor',
        } as ResponseType);
      }
    });
});

app.patch('/videogames', (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id as string;

  const update: Partial<Videogame> = req.body;

  if (!user || !id) {
    return res
      .status(400)
      .json({ sucess: false, error: 'Usuario o Id no proporcionado' });
  }

  const userDir = path.join(BASE_DIR, user);

  fs.access(userDir)
    .catch(() => {
      return fs.mkdir(userDir, { recursive: true });
    })
    .then(() => {
      const filePath = path.join(userDir, `${id}.json`);

      fs.readFile(filePath, 'utf-8')
        .then((data) => {
          const existGame: Videogame = JSON.parse(data);
          const updatedGame = { ...existGame, ...update };

          fs.writeFile(filePath, JSON.stringify(updatedGame, null, 2))
            .then(() => {
              return res.json({
                success: true,
                videogames: [updatedGame],
              } as ResponseType);
            })
            .catch((error) => {
              res.status(500).json({
                success: false,
                error: `Internal error: ${error}`,
              } as ResponseType);
            });
        })
        .catch((error) => {
          return res
            .status(404)
            .json({ success: false, error: error } as ResponseType);
        });
    })
    .catch(() => {
      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          error: 'Error interno del servidor',
        } as ResponseType);
      }
    });
});

app.delete('/videogames', (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id as string;

  if (!user || !id) {
    return res
      .status(400)
      .json({
        success: false,
        error: 'Usuario o Id no proporcionado',
      } as ResponseType);
  }

  const userDir = path.join(BASE_DIR, user);

  fs.access(userDir)
    .catch(() => {
      return fs.mkdir(userDir, { recursive: true });
    })
    .then(() => {
      const filePath = path.join(userDir, `${id}.json`);

      return fs
        .access(filePath)
        .then(() => {
          return fs
            .unlink(filePath)
            .then(() => {
              return res.json({ success: true } as ResponseType);
            })
            .catch((error) => {
              return res
                .status(500)
                .json({ success: false, error: String(error) } as ResponseType);
            });
        })
        .catch(() => {
          return res.status(404).json({
            success: false,
            error: 'Videogame not found',
          } as ResponseType);
        });
    })
    .catch(() => {
      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          error: 'Error interno del servidor',
        } as ResponseType);
      }
    });
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
